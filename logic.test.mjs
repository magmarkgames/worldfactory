import assert from 'node:assert/strict';
import {generateResources, rollHarvest, distanceMeters, cleanProfile, REGEN_MS, isReady, freshProfile, MATERIALS} from './game-logic.js';
const center={lat:51.9625,lng:7.627};
const a=generateResources(center.lat,center.lng); const b=generateResources(center.lat,center.lng);
assert.deepEqual(a,b,'World generation must be reproducible');
assert.ok(a.length>5 && a.length<100,'World should contain discoverable nodes');
assert.equal(new Set(a.map(x=>x.id)).size,a.length);
assert.ok(a.every(x=>distanceMeters(center.lat,center.lng,x.lat,x.lng)<=720));
assert.ok(new Set(a.map(x=>x.type)).size===3,'All types present in test area');
for(const type of ['tree','rock','scrap']){
 const node={type,rich:false};
 const noBonus=rollHarvest(node,()=>.99);
 assert.equal(noBonus.length,1);
 assert.equal(noBonus[0].count,4);
 const rich=rollHarvest({...node,rich:true},()=>0);
 assert.equal(rich.length,2);
 assert.equal(rich[0].count,4);
}
assert.equal(isReady(Date.now()),false);
assert.equal(isReady(Date.now()-REGEN_MS-1),true);
const p=freshProfile(); assert.equal(Object.keys(p.inventory).length,Object.keys(MATERIALS).length);
assert.equal(cleanProfile({inventory:{wood:-2,scrap:7,resin:20000000000},discovered:['wood','invalid','wood'],harvested:{'1:2':Date.now(),bad:5},stats:{harvests:8}}).inventory.scrap,7);
assert.deepEqual(cleanProfile({discovered:['wood','invalid','wood']}).discovered,['wood']);
console.log(`OK — deterministic positions (${a.length}), drop tables, cooldown, save validation, all materials.`);
