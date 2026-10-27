// Weltwerk — deterministic prototype world and loot logic.
// This file deliberately has no browser dependencies so it can be tested with Node.
export const VERSION = '0.2.1';
export const REGEN_MS = 60 * 60 * 1000;
export const REACH_METERS = 60;
export const GRID_METERS = 195;
export const RESOURCE_RADIUS = 720;
export const MATERIALS = Object.freeze({
  wood:   { name: 'Holz', icon: '🪵', rarity: 'common', note: 'Das Grundmaterial für Bretter und einfache Bauteile.' },
  stone:  { name: 'Stein', icon: '🪨', rarity: 'common', note: 'Robustes Material für spätere Bauprojekte.' },
  scrap:  { name: 'Altmetall', icon: '🔩', rarity: 'common', note: 'Alte Metallteile, die später verarbeitet werden können.' },
  resin:  { name: 'Harz', icon: '🍯', rarity: 'uncommon', note: 'Seltener Fund von Bäumen – später für spezielle Teile.' },
  iron:   { name: 'Eisenerz', icon: '⛏️', rarity: 'uncommon', note: 'Wichtig für die künftige Metallverarbeitung.' },
  copper: { name: 'Kupferdraht', icon: '🔌', rarity: 'uncommon', note: 'Später für Elektronik und Erkundungstechnik.' },
});
export const TYPES = Object.freeze({
  tree: { name: 'Baum', icon: '🌳', material: 'wood', bonus: 'resin', bonusProbability: 0.20, color: '#63c58f', desc: 'Ein gewöhnlicher Baum. Liefert Holz und manchmal etwas Harz.' },
  rock: { name: 'Steinvorkommen', icon: '🪨', material: 'stone', bonus: 'iron', bonusProbability: 0.15, color: '#94adca', desc: 'Ein Steinvorkommen mit einer kleinen Chance auf Eisenerz.' },
  scrap: { name: 'Schrottfundstelle', icon: '🔩', material: 'scrap', bonus: 'copper', bonusProbability: 0.15, color: '#e7b375', desc: 'Zurückgelassene Metallteile. Manchmal findet sich Kupferdraht.' },
});
function hash32(x, y, salt = 0) {
  let n = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(salt, 1442695041)) | 0;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return (n ^ (n >>> 16)) >>> 0;
}
function randomCell(x, y, salt = 0) { return hash32(x, y, salt) / 4294967296; }
const R = 6378137;
export function latLngToMeters(lat, lng) {
  const safeLat = Math.max(-85, Math.min(85, lat));
  return { x: R * lng * Math.PI / 180, y: R * Math.log(Math.tan(Math.PI / 4 + safeLat * Math.PI / 360)) };
}
export function metersToLatLng(x, y) {
  return { lat: (2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) * 180 / Math.PI, lng: x / R * 180 / Math.PI };
}
export function distanceMeters(lat1, lon1, lat2, lon2) {
  const rad = Math.PI / 180;
  const a = Math.sin((lat2-lat1)*rad/2)**2 + Math.cos(lat1*rad)*Math.cos(lat2*rad)*Math.sin((lon2-lon1)*rad/2)**2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0,1-a)));
}
// Coordinates depend only on the cell's world coordinates — same resource after refresh.
// These are prototype GAME locations, not verified public/access-safe real-world sites.
export function generateResources(lat, lng, radius = RESOURCE_RADIUS) {
  const center = latLngToMeters(lat, lng);
  const pad = 1;
  const minX = Math.floor((center.x - radius) / GRID_METERS) - pad;
  const maxX = Math.floor((center.x + radius) / GRID_METERS) + pad;
  const minY = Math.floor((center.y - radius) / GRID_METERS) - pad;
  const maxY = Math.floor((center.y + radius) / GRID_METERS) + pad;
  const result = [];
  for (let ix=minX; ix<=maxX; ix++) for (let iy=minY; iy<=maxY; iy++) {
    if (randomCell(ix, iy, 1) > 0.80) continue;
    const offsetX = 0.20 + randomCell(ix,iy,2)*0.60;
    const offsetY = 0.20 + randomCell(ix,iy,3)*0.60;
    const coord = metersToLatLng((ix+offsetX)*GRID_METERS, (iy+offsetY)*GRID_METERS);
    if (distanceMeters(lat,lng,coord.lat,coord.lng) > radius) continue;
    const roll = randomCell(ix, iy, 4);
    const type = roll < 0.43 ? 'tree' : roll < 0.77 ? 'rock' : 'scrap';
    result.push({id: `${ix}:${iy}`, ...coord, type, rich: randomCell(ix,iy,5) < 0.10});
  }
  return result;
}
// Independent bonus chance. One harvest always gives guaranteed material.
export function rollHarvest(node, rand = Math.random) {
  const type = TYPES[node.type];
  if (!type) throw new Error('Unknown resource type');
  const qty = (2 + Math.floor(Math.min(.999999, Math.max(0, rand())) * 3)) * (node.rich ? 2 : 1);
  const result = [{id:type.material, count:qty}];
  if (rand() < type.bonusProbability) result.push({id:type.bonus, count:1});
  return result;
}
export function isReady(lastHarvest, now = Date.now()) { return !lastHarvest || now-lastHarvest >= REGEN_MS; }
export function timeRemaining(lastHarvest, now = Date.now()) { return Math.max(0, REGEN_MS - (now-lastHarvest)); }
export function formatRemaining(ms) {
  const minutes = Math.ceil(ms / 60000);
  return minutes >= 60 ? `${Math.floor(minutes/60)}h ${String(minutes%60).padStart(2,'0')}m` : `${minutes} Min.`;
}
export const DEMO_START = Object.freeze({lat:51.9625, lng:7.6270});
export const SAVE_KEY = 'weltwerk-exploration-save-v1';
export function freshProfile() {
  return {inventory:Object.fromEntries(Object.keys(MATERIALS).map(k=>[k,0])), discovered:[], harvested:{}, stats:{harvests:0, collected:0, rare:0}};
}
export function cleanProfile(candidate) {
  const p=freshProfile();
  if (!candidate || typeof candidate !== 'object') return p;
  for (const key of Object.keys(MATERIALS)) {
    const val=Number(candidate.inventory?.[key]);
    p.inventory[key] = Number.isSafeInteger(val) && val>=0 && val<=1e9 ? val : 0;
  }
  p.discovered = Array.isArray(candidate.discovered) ? [...new Set(candidate.discovered.filter(v=>typeof v==='string' && v in MATERIALS))] : [];
  if(candidate.harvested && typeof candidate.harvested==='object') {
    for (const [key,value] of Object.entries(candidate.harvested)) {
      const t=Number(value);
      if (/^-?\d+:-?\d+$/.test(key) && Number.isFinite(t) && t>0 && t<=Date.now()+60000 && Date.now()-t<REGEN_MS) p.harvested[key]=t;
    }
  }
  for (const key of Object.keys(p.stats)) {
    const val=Number(candidate.stats?.[key]);
    if (Number.isSafeInteger(val) && val>=0 && val<=1e9) p.stats[key]=val;
  }
  return p;
}
