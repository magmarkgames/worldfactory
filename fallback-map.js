// WELTWERK lightweight backup map: no MapLibre / WebGL / third-party JS required.
// Map data is fetched only as standard OSM raster tiles when online.
const TILE = 256;
const bound = (v,min,max)=>Math.min(max,Math.max(min,v));
function world(lat,lng,z){
  const sin= Math.sin(bound(lat,-85,85)*Math.PI/180);
  const n=2**z*TILE;
  return { x: (lng+180)/360*n, y:(0.5-Math.log((1+sin)/(1-sin))/(4*Math.PI))*n};
}
function geo(x,y,z){
  const n=2**z*TILE;
  return {lng:x/n*360-180,lat:Math.atan(Math.sinh(Math.PI*(1-2*y/n)))*180/Math.PI};
}
function mapPoint(lngLat){
  if(Array.isArray(lngLat)) return {lng:lngLat[0],lat:lngLat[1]};
  if(lngLat&&Number.isFinite(lngLat.lng)&&Number.isFinite(lngLat.lat))return lngLat;
  return {lng:7.627,lat:51.9625};
}
export class BackupMap {
  constructor({container,center,zoom=16.6,pitch=55,bearing=0}){
    this.el=typeof container==='string'?document.getElementById(container):container;
    this.zoom=zoom;this.pitch=pitch;this.bearing=bearing;
    this.center=mapPoint(center);this.handlers={};this.markers=new Set();this.tiles=new Map();
    this.el.innerHTML='';this.el.classList.add('backup-map');
    this.base=document.createElement('div');this.base.className='backup-map-ground';
    this.tileLayer=document.createElement('div');this.tileLayer.className='backup-map-tiles';
    this.markerLayer=document.createElement('div');this.markerLayer.className='backup-map-markers';
    this.help=document.createElement('div');this.help.className='backup-map-caption';
    this.help.textContent='ERSATZKARTE · 2.5D';
    this.attribution=document.createElement('div');this.attribution.className='backup-map-attribution';
    this.attribution.innerHTML='Karte © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap-Mitwirkende</a>';
    this.base.appendChild(this.tileLayer);this.el.append(this.base,this.markerLayer,this.help,this.attribution);
    this._pointer=null;
    this.el.addEventListener('pointerdown',e=>{if(e.target.closest('button,a'))return;this._pointer={x:e.clientX,y:e.clientY,center:{...this.center},moved:false};});
    this.el.addEventListener('pointermove',e=>{
      if(!this._pointer || !(e.buttons&1))return;
      const dx=e.clientX-this._pointer.x,dy=e.clientY-this._pointer.y;
      if(Math.hypot(dx,dy)<6 && !this._pointer.moved)return;
      this._pointer.moved=true;
      const z=Math.floor(this.zoom),scale=2**(this.zoom-z);
      const orig=world(this._pointer.center.lat,this._pointer.center.lng,z);
      this.center=geo(orig.x-dx/scale,orig.y-dy/scale,z);
      this._emit('dragstart');this.redraw();
    });
    this.el.addEventListener('pointerup',e=>{
      if(!this._pointer)return;
      const p=this._pointer;this._pointer=null;
      if(p.moved||e.target.closest('button,a'))return;
      const rect=this.el.getBoundingClientRect();
      const z=Math.floor(this.zoom),scale=2**(this.zoom-z);
      const c=world(this.center.lat,this.center.lng,z);
      const dest=geo(c.x+(e.clientX-rect.left-rect.width/2)/scale,c.y+(e.clientY-rect.top-rect.height/2)/scale,z);
      this._emit('click',{lngLat:dest});
    });
    this.el.addEventListener('wheel',e=>{e.preventDefault();this.zoom=bound(this.zoom+(e.deltaY<0?.5:-.5),12,19.2);this.redraw();},{passive:false});
    this.updatePitch();this.redraw();setTimeout(()=>this._emit('load'),10);
  }
  on(name,fn){(this.handlers[name]??=[]).push(fn);return this;}
  _emit(name,value){for(const fn of this.handlers[name]||[])fn(value);}
  getZoom(){return this.zoom;}
  getPitch(){return this.pitch;}
  getBearing(){return this.bearing;}
  getStyle(){return {layers:[]};}
  getSource(){return null;}
  getLayer(){return null;}
  addSource(){}
  addLayer(){}
  resize(){this.redraw();}
  zoomIn(){this.easeTo({zoom:this.zoom+.65});}
  zoomOut(){this.easeTo({zoom:this.zoom-.65});}
  easeTo(options){
    if(options.center)this.center=mapPoint(options.center);
    if(Number.isFinite(options.zoom))this.zoom=bound(options.zoom,12,19.2);
    if(Number.isFinite(options.bearing))this.bearing=options.bearing;
    if(Number.isFinite(options.pitch)){this.pitch=options.pitch;this.updatePitch();this._emit('pitchend');}
    this.redraw();
  }
  updatePitch(){this.el.classList.toggle('backup-pitched',this.pitch>=25);}
  redraw(){
    if(!this.el.isConnected)return;
    const rect=this.el.getBoundingClientRect(),w=rect.width,h=rect.height;
    if(!w||!h)return;
    const z=Math.floor(this.zoom),s=2**(this.zoom-z),c=world(this.center.lat,this.center.lng,z);
    const tx=Math.floor(c.x/TILE),ty=Math.floor(c.y/TILE);
    const aroundX=Math.ceil(w/(TILE*s)/2)+1,aroundY=Math.ceil(h/(TILE*s)/2)+1;
    const needed=new Set();
    for(let x=tx-aroundX;x<=tx+aroundX;x++)for(let y=ty-aroundY;y<=ty+aroundY;y++){
      const n=2**z;if(y<0||y>=n)continue;
      const safeX=((x%n)+n)%n,key=`${z}/${safeX}/${y}`;needed.add(key);
      let img=this.tiles.get(key);
      if(!img){
        img=document.createElement('img');img.alt='';img.draggable=false;img.decoding='async';
        img.className='backup-tile';img.src=`https://tile.openstreetmap.org/${key}.png`;
        img.onerror=()=>{img.style.opacity='0';};
        this.tileLayer.appendChild(img);this.tiles.set(key,img);
      }
      const px=w/2+((x*TILE)-c.x)*s, py=h/2+((y*TILE)-c.y)*s;
      img.style.left=`${px}px`;img.style.top=`${py}px`;
      img.style.width=`${TILE*s+1}px`;img.style.height=`${TILE*s+1}px`;
    }
    for(const [key,img]of this.tiles){if(!needed.has(key)){img.remove();this.tiles.delete(key);}}
    for(const marker of this.markers){
      const p=world(marker.pos.lat,marker.pos.lng,z);
      marker.element.style.left=`${w/2+(p.x-c.x)*s}px`;
      marker.element.style.top=`${h/2+(p.y-c.y)*s}px`;
    }
  }
  remove(){this.el.innerHTML='';this.handlers={};this.markers.clear();this.tiles.clear();}
}
export class BackupMarker {
  constructor({element}){this.element=element;this.pos={lat:0,lng:0};this.map=null;}
  setLngLat(value){this.pos=mapPoint(value);if(this.map)this.map.redraw();return this;}
  addTo(map){this.map=map;this.element.classList.add('backup-marker');map.markerLayer.appendChild(this.element);map.markers.add(this);map.redraw();return this;}
  getElement(){return this.element;}
  remove(){this.element.remove();this.map?.markers.delete(this);this.map=null;}
}
