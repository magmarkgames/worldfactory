import { BackupMap, BackupMarker } from "./fallback-map.js?v=021";
import {
  VERSION, MATERIALS, TYPES, REGEN_MS, REACH_METERS, RESOURCE_RADIUS,
  generateResources, rollHarvest, isReady, timeRemaining, formatRemaining,
  distanceMeters, freshProfile, cleanProfile, DEMO_START, SAVE_KEY
} from './game-logic.js?v=021';

const $ = id => document.getElementById(id);
const START = { ...DEMO_START };
const state = {
  mode:null, demo: freshProfile(), gps:freshProfile(),
  demoPosition:{...START}, position:null, accuracy:null, timestamp:0, speed:0,
  map:null, mapKind:null, markers:new Map(), playerMarker:null, accuracySource:false, followPlayer:true, mapLoadingError:false, mapErrors:0, mapTimer:null,
  resources:[], activeTab:'map', selectedNode:null, sheetMode:null, lastGps:null,
  watchId:null, mapReady:false,
};

function activeProfile() {return state.mode==='gps'?state.gps:state.demo;}
function save() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({format:'weltwerk-save-1',version:VERSION,mode:state.mode,
      profiles:{demo:state.demo,gps:state.gps},demoPosition:state.demoPosition}));
  } catch(e) { toast('Speichern fehlgeschlagen: Gerätespeicher prüfen.',true); console.error(e); }
}
function restore() {
  try {
    const saved=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');
    if(!saved || saved.format!=='weltwerk-save-1') return;
    state.demo=cleanProfile(saved.profiles?.demo);
    state.gps=cleanProfile(saved.profiles?.gps);
    // Always start in demo after reload; GPS must be explicitly enabled to request location.
    state.mode='demo';
    if(Number.isFinite(saved.demoPosition?.lat) && Number.isFinite(saved.demoPosition?.lng)
       && Math.abs(saved.demoPosition.lat)<=85 && Math.abs(saved.demoPosition.lng)<=180)
      state.demoPosition={lat:saved.demoPosition.lat,lng:saved.demoPosition.lng};
  } catch(e) { console.warn('Ungültiger lokaler Spielstand, starte neu.',e); }
}
function showWelcome() { $('welcome').classList.remove('hidden'); }
function hideWelcome() { $('welcome').classList.add('hidden'); }
let lastToastText='',lastToastAt=0;
function toast(message,error=false) {
  if(message===lastToastText && Date.now()-lastToastAt<2500)return;
  lastToastText=message;lastToastAt=Date.now();
  const node=document.createElement('div'); node.className=`toast${error?' error':''}`; node.textContent=message;
  $('toast-area').appendChild(node); setTimeout(()=>node.remove(),3300);
}
function getPosition() {return state.mode==='gps'?state.position:state.demoPosition;}
function getAccuracy() {return state.mode==='gps'?state.accuracy:0;}
function getRange(node) {
  if(state.mode==='gps' && (!state.position || Date.now()-state.timestamp>60000)) return {ok:false,reason:'Warte auf ein aktuelles GPS-Signal.'};
  const pos=getPosition(); if(!pos) return {ok:false,reason:'Kein Standort vorhanden.'};
  if(state.mode==='gps' && getAccuracy()>140) return {ok:false,reason:'GPS ist zu ungenau. Gehe möglichst ins Freie.'};
  if(state.mode==='gps' && state.speed>8.3) return {ok:false,reason:'Sammeln bei schneller Fortbewegung gesperrt.'};
  const distance=distanceMeters(pos.lat,pos.lng,node.lat,node.lng);
  const reach=REACH_METERS+(state.mode==='gps'?Math.min(15,Math.max(0,(getAccuracy()||0)/3)):0);
  return {ok:distance<=reach,distance,reach,reason:`Noch ${Math.max(1,Math.ceil(distance-reach))} m bis zur Reichweite.`};
}
// MapLibre vector tiles + extruded OSM buildings. The virtual resource positions
// are unchanged from v0.1; only their presentation becomes a 2.5D game world.
const MAP_STYLE='https://tiles.openfreemap.org/styles/bright';
const MAP_TILES='https://tiles.openfreemap.org/planet';
const ICONS=Object.freeze({tree:'tree.svg?v=021',rock:'rock.svg?v=021',scrap:'scrap.svg?v=021'});
function initMap() {
  // A non-WebGL backup uses ordinary OSM raster tiles (or a visible game grid
  // if tiles are also unavailable). This prevents a completely empty game screen.
  if(!window.maplibregl || !maplibregl.supported()) {
    startBackupMap('Die 3D-Kartenbibliothek konnte nicht gestartet werden.');return;
  }
  try {
    const map=new maplibregl.Map({
      container:'map',style:MAP_STYLE,center:[state.demoPosition.lng,state.demoPosition.lat],
      zoom:16.6,pitch:55,bearing:-22,minZoom:12,maxZoom:19.2,maxPitch:60,
      attributionControl:true,antialias:true,dragRotate:true,pitchWithRotate:true,
      canvasContextAttributes:{antialias:true},renderWorldCopies:false
    });
    state.map=map;state.mapKind='maplibre';
    map.touchZoomRotate.enableRotation();
    attachMapEvents(map);
    map.on('load',()=>{
      if(state.map!==map)return;
      clearTimeout(state.mapTimer);state.mapTimer=null;
      finalizeMap(map,'maplibre');
    });
    map.on('error',e=>{
      if(state.map!==map)return;
      console.warn('Kartenfehler',e.error||e);
      if(++state.mapErrors>=4)startBackupMap('Die 3D-Kartenkacheln konnten nicht geladen werden.');
    });
    state.mapTimer=setTimeout(()=>{
      if(state.map===map && !state.mapReady)startBackupMap('Die 3D-Karte hat nicht rechtzeitig geladen.');
    },11000);
  }catch(e){console.warn('3D-Karte nicht verfügbar',e);startBackupMap('3D-Karte auf diesem Gerät nicht verfügbar.');}
}
function attachMapEvents(map){
  map.on('dragstart',()=>{state.followPlayer=false;});
  map.on('pitchend',()=>{
    if(state.map!==map)return;
    const is3d=map.getPitch()>=25;
    $('btn-tilt').textContent=is3d?'3D':'2D';
    $('btn-tilt').setAttribute('aria-pressed',String(is3d));
  });
  map.on('click',event=>{
    if(state.map!==map || state.mode!=='demo')return;
    state.demoPosition={lat:event.lngLat.lat,lng:event.lngLat.lng};
    save();updatePositionOnMap();renderWorld();toast('Testposition verschoben');
  });
}
function finalizeMap(map,kind){
  if(state.map!==map)return;
  state.mapReady=true;state.mapKind=kind;
  $('no-map').classList.add('hidden');
  if(kind==='maplibre'){addWorldBuildings();addAccuracyLayer();}
  updatePositionOnMap(true);renderWorld();updateModeUI();
  setTimeout(()=>state.map?.resize(),80);
}
function startBackupMap(reason){
  if(state.mapKind==='backup')return;
  clearTimeout(state.mapTimer);state.mapTimer=null;
  console.warn('Starte Ersatzkarte:',reason);
  const old=state.map;
  for(const marker of state.markers.values())marker.remove();
  state.markers.clear();state.playerMarker?.remove();state.playerMarker=null;
  state.map=null;state.mapReady=false;
  try{old?.remove();}catch(e){console.warn(e);}
  $('map').innerHTML='';
  try{
    const map=new BackupMap({container:'map',center:[state.demoPosition.lng,state.demoPosition.lat],zoom:16.6,pitch:55});
    state.map=map;state.mapKind='backup';
    attachMapEvents(map);
    map.on('load',()=>finalizeMap(map,'backup'));
    toast('Ersatzkarte aktiviert – Sammeln und Demo funktionieren weiterhin.');
  }catch(e){console.error('Auch Ersatzkarte fehlgeschlagen',e);$('no-map').classList.remove('hidden');}
}
function makeMarker(args){
  return state.mapKind==='backup' ? new BackupMarker(args) : new maplibregl.Marker(args);
}
function addWorldBuildings(){
  if(!state.map || state.map.getLayer('weltwerk-buildings'))return;
  try{
    const style=state.map.getStyle();
    const labelLayer=style.layers?.find(l=>l.type==='symbol' && l.layout?.['text-field']);
    if(!state.map.getSource('weltwerk-vector'))state.map.addSource('weltwerk-vector',{type:'vector',url:MAP_TILES});
    state.map.addLayer({
      id:'weltwerk-buildings',type:'fill-extrusion',source:'weltwerk-vector',
      'source-layer':'building',minzoom:15,filter:['!=',['get','hide_3d'],true],
      paint:{
        'fill-extrusion-color':['interpolate',['linear'],['coalesce',['to-number',['get','render_height']],8],0,'#dfdfd3',18,'#d3d7cc',60,'#b8cecc'],
        'fill-extrusion-height':['interpolate',['linear'],['zoom'],15,0,16,['coalesce',['to-number',['get','render_height']],8]],
        'fill-extrusion-base':['coalesce',['to-number',['get','render_min_height']],0],
        'fill-extrusion-opacity':0.83
      }
    },labelLayer?.id);
  } catch(e){console.warn('3D buildings unavailable for this map region/style',e);}
}
function accuracyPolygon(pos,meters){
  if(!pos || !Number.isFinite(meters) || meters<=0)return {type:'FeatureCollection',features:[]};
  const r=Math.min(200,Math.max(3,meters)),coords=[];
  for(let i=0;i<=48;i++){
    const angle=2*Math.PI*i/48;
    const lat=pos.lat+Math.cos(angle)*r/111320;
    const lng=pos.lng+Math.sin(angle)*r/(111320*Math.max(0.15,Math.cos(pos.lat*Math.PI/180)));
    coords.push([lng,lat]);
  }
  return {type:'FeatureCollection',features:[{type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[coords]}}]};
}
function addAccuracyLayer(){
  if(!state.map || state.map.getSource('gps-accuracy'))return;
  state.map.addSource('gps-accuracy',{type:'geojson',data:accuracyPolygon(null,0)});
  state.map.addLayer({id:'gps-accuracy-fill',type:'fill',source:'gps-accuracy',paint:{'fill-color':'#49bfae','fill-opacity':.13}});
  state.map.addLayer({id:'gps-accuracy-line',type:'line',source:'gps-accuracy',paint:{'line-color':'#2ea998','line-width':1.5,'line-opacity':.55}});
}
function makePlayerElement(){
  const elem=document.createElement('div');elem.className='world-player';
  elem.innerHTML='<span class="player-aura"></span><img src="avatar.svg?v=021" alt="" draggable="false"><span class="player-you">DU</span>';
  return elem;
}
function makeResourceElement(node){
  const element=document.createElement('button');element.type='button';
  element.setAttribute('aria-label',`${TYPES[node.type].name} auf der Karte öffnen`);
  element.innerHTML=`<span class="world-resource-shadow"></span><img class="world-resource-art" src="${ICONS[node.type]}" alt="" draggable="false"><span class="world-resource-star" aria-hidden="true">✦</span><span class="world-resource-dot" aria-hidden="true"></span>`;
  element.addEventListener('click',e=>{e.stopPropagation();openResource(node);});
  element.addEventListener('touchstart',e=>e.stopPropagation(),{passive:true});
  return element;
}
function updateNodeElement(element,node){
  const ready=isReady(activeProfile().harvested[node.id]);
  const range=getRange(node);
  element.className=['world-resource',`type-${node.type}`,node.rich?'rich':'',range.ok?'in-range':'',ready?'':'depleted'].filter(Boolean).join(' ');
}
function updatePositionOnMap(follow=false){
  if(!state.mapReady)return;
  const pos=getPosition();
  if(!pos){state.playerMarker?.remove();state.playerMarker=null;state.map.getSource('gps-accuracy')?.setData(accuracyPolygon(null,0));return;}
  if(!state.playerMarker){
    state.playerMarker=makeMarker({element:makePlayerElement(),anchor:'bottom',pitchAlignment:'viewport',rotationAlignment:'viewport'})
      .setLngLat([pos.lng,pos.lat]).addTo(state.map);
  }else state.playerMarker.setLngLat([pos.lng,pos.lat]);
  const gpsAccuracy=state.mode==='gps'?state.accuracy:null;
  state.map.getSource('gps-accuracy')?.setData(accuracyPolygon(pos,gpsAccuracy));
  if(follow || (state.mode==='gps' && state.followPlayer)){
    state.map.easeTo({center:[pos.lng,pos.lat],zoom:Math.max(16.6,state.map.getZoom()),duration:follow?500:700,essential:true});
  }
}
function renderWorld(){
  if(!state.mapReady)return;
  const pos=getPosition();
  if(!pos){for(const marker of state.markers.values())marker.remove();state.markers.clear();state.resources=[];updateNearby();return;}
  state.resources=generateResources(pos.lat,pos.lng,RESOURCE_RADIUS);
  const visible=new Set(state.resources.map(n=>n.id));
  for(const [id,marker] of state.markers){
    if(!visible.has(id)){marker.remove();state.markers.delete(id);}
  }
  for(const node of state.resources){
    let marker=state.markers.get(node.id);
    if(!marker){
      marker=makeMarker({element:makeResourceElement(node),anchor:'bottom',pitchAlignment:'viewport',rotationAlignment:'viewport'})
        .setLngLat([node.lng,node.lat]).addTo(state.map);
      state.markers.set(node.id,marker);
    }
    updateNodeElement(marker.getElement(),node);
  }
  updateNearby();
}
function updateNearby() {
  const pos=getPosition();
  const nodes=pos?state.resources.filter(node=>distanceMeters(pos.lat,pos.lng,node.lat,node.lng)<310):[];
  const available=nodes.filter(node=>isReady(activeProfile().harvested[node.id])).length;
  $('nearby-counter').textContent=state.mode==='gps'&&!pos?'—':String(available);
  $('nearby-title').textContent=state.mode==='gps'&&!pos?'GPS wird gesucht …':`${available} Fundstellen in der Nähe`;
  $('nearby-subtitle').textContent=state.mode==='gps'&&!pos?'Standortzugriff prüfen':'Im Umkreis von 310 m · verfügbare Vorkommen';
}
function updateModeUI() {
  const gps=state.mode==='gps';
  $('mode-label').textContent=gps?'GPS':'DEMO';
  $('status-badge').classList.toggle('is-gps',gps);
  $('demo-controller').classList.toggle('hidden',gps);
  $('gps-message').textContent=gps
    ? (state.position?`GPS aktiv · Genauigkeit ungefähr ${Math.round(state.accuracy||0)} m`:'GPS-Standort wird gesucht. Bitte Standortfreigabe prüfen.')
    : 'Demo aktiv · Karte antippen oder Pfeiltasten verwenden. Eigener Testspielstand.';
}
function stopGPS() {
  if(state.watchId!==null && navigator.geolocation){navigator.geolocation.clearWatch(state.watchId);state.watchId=null;}
}
function setMode(mode,announce=true) {
  if(!['demo','gps'].includes(mode)) return;
  stopGPS(); state.mode=mode;state.position=null;state.accuracy=null;state.timestamp=0;state.speed=0;
  closeSheet();hideWelcome();updateModeUI();save();updatePositionOnMap();renderWorld();renderPanels();
  if(mode==='gps') {
    if(!navigator.geolocation){toast('GPS wird von diesem Browser nicht unterstützt.',true);return;}
    if(!window.isSecureContext){toast('Echtes GPS benötigt HTTPS (GitHub Pages).',true);return;}
    try {
      state.watchId=navigator.geolocation.watchPosition(onGeoSuccess,onGeoFailure,{enableHighAccuracy:true,maximumAge:5000,timeout:18000});
      if(announce) toast('GPS wird aktiviert …');
    } catch(e){toast('GPS konnte nicht aktiviert werden.',true);console.warn(e);}
  } else {
    if(announce) toast('Demo-Modus aktiviert');
    if(state.mapReady){state.followPlayer=true;state.map.easeTo({center:[state.demoPosition.lng,state.demoPosition.lat],zoom:16.6,duration:500});}
  }
}
function onGeoSuccess(pos) {
  const {latitude:lat,longitude:lng,accuracy,speed}=pos.coords;
  if(!Number.isFinite(lat)||!Number.isFinite(lng)) return;
  const first=!state.position;
  state.position={lat,lng};state.accuracy=Number.isFinite(accuracy)?accuracy:999;
  state.timestamp=Date.now();state.speed=Number.isFinite(speed)?speed:0;
  if(first)state.followPlayer=true;
  updatePositionOnMap(first);
  renderWorld();updateModeUI();
  if(first) toast('GPS-Position gefunden');
}
function onGeoFailure(error) {
  const messages={1:'Standortfreigabe verweigert. Erlaube GPS im Browser oder nutze Demo.',2:'Standort nicht verfügbar. Bitte GPS aktivieren.',3:'Standortsuche dauert zu lange. Bitte erneut versuchen.'};
  const message=messages[error.code]||'GPS konnte nicht geladen werden.';
  $('gps-message').textContent=message;
  toast(message,true);
}
function moveDemo(direction) {
  if(state.mode!=='demo') return;
  const rad=Math.PI/180, step=45;
  const lat=state.demoPosition.lat,lng=state.demoPosition.lng;
  const latDelta=step/111320, lngDelta=step/(111320*Math.max(.25,Math.cos(lat*rad)));
  if(direction==='north')state.demoPosition.lat+=latDelta;
  if(direction==='south')state.demoPosition.lat-=latDelta;
  if(direction==='east')state.demoPosition.lng+=lngDelta;
  if(direction==='west')state.demoPosition.lng-=lngDelta;
  save();updatePositionOnMap(true);renderWorld();
}
function openResource(node) {
  state.selectedNode=node;state.sheetMode='resource';renderResourceSheet();
  $('modal-backdrop').classList.remove('hidden');$('modal-backdrop').setAttribute('aria-hidden','false');
}
function closeSheet() {
  $('modal-backdrop').classList.add('hidden');$('modal-backdrop').setAttribute('aria-hidden','true');
  state.selectedNode=null;state.sheetMode=null;
}
function renderResourceSheet() {
  const node=state.selectedNode; if(!node)return;
  const type=TYPES[node.type]; const profile=activeProfile();const last=profile.harvested[node.id];
  const ready=isReady(last);const range=getRange(node);
  const dist=Number.isFinite(range.distance)?`${Math.round(range.distance)} m entfernt`:'Standort nicht verfügbar';
  $('sheet-content').innerHTML=`
    <div class="sheet-header"><div class="sheet-icon">${type.icon}</div><div><div class="sheet-badge">${node.rich?'✦ REICHHALTIGE FUNDSTELLE':'ROHSTOFFVORKOMMEN'}</div><h2 id="sheet-title">${type.name}</h2></div></div>
    <p class="sheet-desc">${type.desc}${node.rich?' Dieses Vorkommen enthält doppelt so viel Grundmaterial.':''}</p>
    <span class="distance-pill ${range.ok?'':'outside'}">◎ ${dist}</span>
    <div class="sheet-block"><div class="sheet-block-heading">MÖGLICHE FUNDE</div>
      <div class="possible-drop"><span>${MATERIALS[type.material].icon}</span><span class="drop-name">${MATERIALS[type.material].name} (${node.rich?'4–8':'2–4'}×)</span><strong>100 %</strong></div>
      <div class="possible-drop"><span>${MATERIALS[type.bonus].icon}</span><span class="drop-name">${MATERIALS[type.bonus].name} (+1×)</span><strong>${Math.round(type.bonusProbability*100)} %</strong></div>
    </div>
    <button id="btn-harvest" class="sheet-action" ${ready&&range.ok?'':'disabled'}>${!ready?'Regeneration · '+formatRemaining(timeRemaining(last)):range.ok?'Ressourcen sammeln':'Nicht in Reichweite'}</button>
    <div class="sheet-secondary">${!ready?'Diese Fundstelle regeneriert sich nach einer Stunde.':range.ok?'Tippe, um garantiert Grundmaterial und eventuell einen Bonusfund zu erhalten.':range.reason}<br>Fundort ist virtuell: Bitte nicht an unsichere Orte gehen.</div>`;
  $('btn-harvest').addEventListener('click',()=>harvest(node));
}
function harvest(node) {
  if(!state.selectedNode || state.selectedNode.id!==node.id)return;
  const profile=activeProfile();
  if(!isReady(profile.harvested[node.id])){renderResourceSheet();return;}
  const reach=getRange(node);if(!reach.ok){toast(reach.reason,true);renderResourceSheet();return;}
  const rewards=rollHarvest(node);
  for (const item of rewards) {
    profile.inventory[item.id]=(profile.inventory[item.id]||0)+item.count;
    profile.stats.collected+=item.count;
    if(item.id===TYPES[node.type].bonus) profile.stats.rare+=item.count;
    if(!profile.discovered.includes(item.id))profile.discovered.push(item.id);
  }
  profile.stats.harvests++;
  profile.harvested[node.id]=Date.now();save();renderPanels();renderWorld();
  state.sheetMode='reward';
  $('sheet-content').innerHTML=`<div class="sheet-header"><div class="sheet-icon">🎉</div><div><div class="sheet-badge">ERFOLGREICH GESAMMELT</div><h2 id="sheet-title">Dein Fund!</h2></div></div>
    <p class="sheet-desc">Die Materialien wurden deinem ${state.mode==='demo'?'Demo-':'GPS-'}Rucksack hinzugefügt.</p>
    <div class="reward-list">${rewards.map(item=>`<div class="reward-chip ${item.id===TYPES[node.type].bonus?'bonus':''}"><span class="reward-icon">${MATERIALS[item.id].icon}</span><span>+${item.count} ${MATERIALS[item.id].name}</span></div>`).join('')}</div>
    <button class="sheet-action" id="btn-continue">Weiter erkunden</button>
    <div class="sheet-secondary">Das Vorkommen ist jetzt für 60 Minuten erschöpft.</div>`;
  $('btn-continue').addEventListener('click',closeSheet);
  try{navigator.vibrate?.(40);}catch{}
  toast(rewards.length>1?'Seltener Bonusfund entdeckt! ✦':'Ressourcen eingesammelt!');
}
function renderPanels() {
  const profile=activeProfile();const total=Object.values(profile.inventory).reduce((x,y)=>x+y,0);
  $('top-items').textContent=total.toLocaleString('de-DE');
  $('top-discoveries').textContent=profile.discovered.length;
  $('inventory-total').textContent=total.toLocaleString('de-DE');
  $('inventory-grid').innerHTML=Object.entries(MATERIALS).map(([id,item])=>`
    <article class="resource-card ${item.rarity!=='common'?'rare':''}"><div class="res-icon">${item.icon}</div><strong>${item.name}</strong><div class="res-bottom"><b>${(profile.inventory[id]||0).toLocaleString('de-DE')}</b><small>${item.rarity==='common'?'Basis':'Bonus'}</small></div></article>`).join('');
  $('stat-discovered').innerHTML=`${profile.discovered.length} <small>/ 6</small>`;
  $('stat-harvests').textContent=profile.stats.harvests.toLocaleString('de-DE');
  $('stat-collected').textContent=profile.stats.collected.toLocaleString('de-DE');
  $('stat-rare').textContent=profile.stats.rare.toLocaleString('de-DE');
  $('lexicon-progress').textContent=`${profile.discovered.length} / 6`;
  $('lexicon-grid').innerHTML=Object.entries(MATERIALS).map(([id,item])=>{
    const known=profile.discovered.includes(id);
    return `<article class="lexicon-entry ${known?'':'locked'}"><div class="lexicon-icon">${known?item.icon:'❔'}</div><div><strong>${known?item.name:'Unbekanntes Material'}</strong><p>${known?item.note:'Noch nicht entdeckt. Sammle weitere Rohstoffe!'}</p></div><div class="lexicon-tag">${known?'✓':'🔒'}</div></article>`;
  }).join('');
}
function setTab(tab) {
  state.activeTab=tab;
  for (const name of ['map','inventory','collection','settings']) $('screen-'+name).classList.toggle('active',name===tab);
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.toggle('selected',el.dataset.tab===tab));
  if(tab==='map' && state.mapReady)setTimeout(()=>state.map.resize(),60);
  renderPanels();
}
function exportSave() {
  const data=localStorage.getItem(SAVE_KEY);if(!data){toast('Noch kein Spielstand vorhanden.',true);return;}
  const url=URL.createObjectURL(new Blob([JSON.stringify(JSON.parse(data),null,2)],{type:'application/json'}));
  const link=document.createElement('a');link.href=url;link.download='weltwerk-v0.2-spielstand.json';
  document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  toast('Spielstand exportiert');
}
async function importSave(file) {
  if(!file)return;
  if(file.size>1000000){toast('Die Datei ist zu groß.',true);return;}
  try {
    const parsed=JSON.parse(await file.text());
    if(parsed.format!=='weltwerk-save-1' || !parsed.profiles) throw new Error('wrong format');
    if(!confirm('Spielstände von GPS und Demo durch den Import ersetzen?'))return;
    state.demo=cleanProfile(parsed.profiles.demo);state.gps=cleanProfile(parsed.profiles.gps);
    if(Number.isFinite(parsed.demoPosition?.lat)&&Number.isFinite(parsed.demoPosition?.lng)&&Math.abs(parsed.demoPosition.lat)<=85&&Math.abs(parsed.demoPosition.lng)<=180)
      state.demoPosition={lat:parsed.demoPosition.lat,lng:parsed.demoPosition.lng};
    save();renderPanels();renderWorld();updatePositionOnMap(true);toast('Spielstand importiert');
  }catch(e){toast('Ungültige Weltwerk-Spielstanddatei.',true);console.warn(e);}
}
function resetProfile() {
  if(!confirm(`Wirklich den ${state.mode==='gps'?'GPS-':'Demo-'}Spielstand unwiderruflich zurücksetzen?`))return;
  if(state.mode==='gps')state.gps=freshProfile();else state.demo=freshProfile();
  save();renderWorld();renderPanels();closeSheet();toast('Spielstand zurückgesetzt');
}
function recenter() {
  const pos=getPosition();
  if(!pos){toast('GPS-Position noch nicht verfügbar. Wechsle für einen Test zu DEMO unter Mehr.',true);return;}
  state.followPlayer=true;
  state.map?.easeTo({center:[pos.lng,pos.lat],zoom:Math.max(state.map.getZoom(),16.6),duration:650,essential:true});
}
function bind() {
  document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>setTab(btn.dataset.tab)));
  $('status-badge').addEventListener('click',()=>setTab('settings'));
  $('btn-recenter').addEventListener('click',recenter);
  $('btn-rotate').addEventListener('click',()=>{
    if(!state.mapReady)return;
    state.map.easeTo({bearing:state.map.getBearing()+45,duration:450});
  });
  $('btn-tilt').addEventListener('click',()=>{
    if(!state.mapReady)return;
    const is3d=state.map.getPitch()<25;
    state.map.easeTo({pitch:is3d?55:0,duration:520});
    $('btn-tilt').textContent=is3d?'3D':'2D';
    $('btn-tilt').setAttribute('aria-pressed',String(is3d));
  });
  $('btn-zoom-in').addEventListener('click',()=>state.map?.zoomIn());
  $('btn-zoom-out').addEventListener('click',()=>state.map?.zoomOut());
  $('btn-sheet-close').addEventListener('click',closeSheet);
  $('modal-backdrop').addEventListener('click',e=>{if(e.target===$('modal-backdrop'))closeSheet();});
  $('welcome-demo').addEventListener('click',()=>setMode('demo'));
  $('welcome-gps').addEventListener('click',()=>setMode('gps'));
  $('btn-set-gps').addEventListener('click',()=>{setMode('gps');setTab('map');});
  $('btn-set-demo').addEventListener('click',()=>{setMode('demo');setTab('map');});
  $('btn-export').addEventListener('click',exportSave);
  $('btn-import').addEventListener('click',()=>$('file-import').click());
  $('file-import').addEventListener('change',async e=>{await importSave(e.target.files?.[0]);e.target.value='';});
  $('btn-reset').addEventListener('click',resetProfile);
  document.querySelectorAll('[data-move]').forEach(b=>b.addEventListener('click',()=>moveDemo(b.dataset.move)));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape')closeSheet();
    if(state.mode==='demo' && state.activeTab==='map' && $('modal-backdrop').classList.contains('hidden')) {
      const directions={ArrowUp:'north',ArrowDown:'south',ArrowLeft:'west',ArrowRight:'east'};
      if(directions[e.key]){e.preventDefault();moveDemo(directions[e.key]);}
    }
  });
}
function boot(){
  restore();bind();renderPanels();initMap();
  if(!state.mode)showWelcome();
  else setMode(state.mode,false);
  setInterval(()=>{
    if(state.activeTab==='map'&&state.mode && state.mapReady) {
      renderWorld();
      if(state.sheetMode==='resource')renderResourceSheet();
    }
  },30000);
  console.info(`Weltwerk v${VERSION} · 3D with resilient backup map ready`);
}
boot();
