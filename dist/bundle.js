class t{constructor(t=0,s=0,i=0){this.x=t,this.y=s,this.z=i}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}set(t,s,i){return this.x=t,this.y=s,this.z=i,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}clone(){return new t(this.x,this.y,this.z)}}class s{constructor(s=new t,i=new t){this.min=s,this.max=i}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}set(t,s){return this.min.copy(t),this.max.copy(s),this}clone(){return new s(this.min.clone(),this.max.clone())}intersectsSphere(t){const s=t.center,i=t.radius2,e=Math.max(this.min.x,Math.min(s.x,this.max.x)),n=Math.max(this.min.y,Math.min(s.y,this.max.y)),h=Math.max(this.min.z,Math.min(s.z,this.max.z));return Math.pow(e-s.x,2)+Math.pow(n-s.y,2)+Math.pow(h-s.z,2)<i}intersectsBox(t){return this.max.x>=t.min.x&&this.min.x<=t.max.x&&this.max.y>=t.min.y&&this.min.y<=t.max.y&&this.max.z>=t.min.z&&this.min.z<=t.max.z}}class i{constructor(s=new t,i=0){this.center=s,this.radius=i,this.radius2=i*i}copy(t){return this.center.copy(t.center),this.radius=t.radius,this.radius2=t.radius2,this}set(t,s){return this.center.copy(t),this.radius=s,this.radius2=s*s,this}clone(){return new i(this.center.clone(),this.radius)}}class e{constructor(){this.array=[],this.map=new Map}add(t){return!this.map.has(t.uuid)&&(this.array.push(t),this.map.set(t.uuid,this.array.length-1),!0)}remove(t){const s=this.map.get(t.uuid);if(void 0===s)return!1;const i=this.array[this.array.length-1];return this.array[s]=i,this.array.pop(),this.map.set(i.uuid,s),this.map.delete(t.uuid),!0}contains(t){return this.map.has(t.uuid)}reset(){this.array.length=0,this.map.clear()}get length(){return this.array.length}concat(t){for(let s=0;s<t.length;s++)this.add(t[s])}}const n=new s;class h{constructor(t,n,h,o,r){this.entries=new e,this.blocks=null,this._sphere=new i,this._box=new s,this._boundingVectors=new Array,this._descendantCount=0,this._capacity=h,this._depth=o,this._maxDepth=r,this._minPoint=t.clone(),this._maxPoint=n.clone(),this._box.min=t.clone(),this._box.max=n.clone(),this._boundingVectors.push(t.clone()),this._boundingVectors.push(n.clone()),this._boundingVectors.push(t.clone()),this._boundingVectors[2].x=n.x,this._boundingVectors.push(t.clone()),this._boundingVectors[3].y=n.y,this._boundingVectors.push(t.clone()),this._boundingVectors[4].z=n.z,this._boundingVectors.push(n.clone()),this._boundingVectors[5].z=t.z,this._boundingVectors.push(n.clone()),this._boundingVectors[6].x=t.x,this._boundingVectors.push(n.clone()),this._boundingVectors[7].y=t.y}get capacity(){return this._capacity}get box(){return this._box}get depth(){return this._depth}get descendantCount(){return this._descendantCount}addEntry(t){var s,i;if(this.blocks){let s=!1;for(let i=0;i<this.blocks.length;i++){this.blocks[i].addEntry(t)&&(s=!0)}return s&&this._descendantCount++,s}this.computeMaxBoundingBox(t);const e=n;t.isStatic?(t._maxWorldBoundingBox||(t._maxWorldBoundingBox=t.computeWorldBoundingBox(t._maxBoundingBox)),e.copy(t._maxWorldBoundingBox)):(e.copy(t._maxBoundingBox),t.computeWorldBoundingBox(e));let h=!1;return(null==e?void 0:e.intersectsBox(this.box))&&(h=this.entries.add(t)),this.entries.length>this.capacity&&this._depth<this._maxDepth&&(null===(i=(s=this._root).setDirty)||void 0===i||i.call(s)),h}computeMaxBoundingBox(t){if(t._maxBoundingBox)return;const i=t.computeBoundingBox(),e=i.max.x-i.min.x,n=i.max.y-i.min.y,h=i.max.z-i.min.z,o=Math.max(e,n,h),r=new s,c=o/2;r.min.set(-c,-c,-c),r.max.set(c,c,c),t._maxBoundingBox=r}removeEntry(t){var s,i;if(this.blocks){let e=!1;for(let s=0;s<this.blocks.length;s++){this.blocks[s].removeEntry(t)&&(e=!0)}return e&&this._descendantCount--,this._descendantCount<=this._capacity&&(null===(i=(s=this._root).setDirty)||void 0===i||i.call(s)),e}return this.entries.remove(t)}addEntries(t){for(let s=0;s<t.length;s++){const i=t[s];this.addEntry(i)}}inFrustum(t,s){if(t.intersectsBox(this.box))if(this.blocks)for(let i=0;i<this.blocks.length;i++){this.blocks[i].inFrustum(t,s)}else s.concat(this.entries.array)}intersects(t,s,i){if(this._sphere.set(t,s),this.box.intersectsSphere(this._sphere)){if(this.blocks){for(let e=0;e<this.blocks.length;e++){this.blocks[e].intersects(t,s,i)}return}i.concat(this.entries.array)}}intersectsRay(t,s){if(t.intersectsBox(this.box)){if(this.blocks){for(let i=0;i<this.blocks.length;i++){this.blocks[i].intersectsRay(t,s)}return}s.concat(this.entries.array)}}split(){h.CreateBlocks(this._minPoint,this._maxPoint,this.entries.array,this._capacity,this._depth,this._maxDepth,this,this._root),this.entries.reset()}collapse(){this.entries=new e;for(let t=0;t<this.blocks.length;t++)this.entries.concat(this.blocks[t].entries.array),this.blocks[t].destroy();this._descendantCount=this.entries.length,this.blocks=null}debugDraw(t){if(t(this.box),this.blocks)for(let s=0;s<this.blocks.length;s++){this.blocks[s].debugDraw(t)}}destroy(){if(this.blocks)for(let t=0;t<this.blocks.length;t++){this.blocks[t].destroy()}}static CreateBlocks(s,i,e,n,o,r,c,a){c.blocks=new Array;const l=new t((i.x-s.x)/2,(i.y-s.y)/2,(i.z-s.z)/2);for(let i=0;i<2;i++)for(let u=0;u<2;u++)for(let d=0;d<2;d++){const x=s.clone().add(new t(i,u,d).multiply(l)),m=s.clone().add(new t(i+1,u+1,d+1).multiply(l)),y=new h(x,m,n,o+1,r);y._root=a,y.addEntries(e),c.blocks.push(y)}}}class o{constructor(t,s=2){this.maxDepth=s,this._descendantCount=0,this._nodesDirty=!1,this._maxBlockCapacity=t||64,this._selectionContent=new e}initialize(t,s,i){h.CreateBlocks(t,s,i,this._maxBlockCapacity,0,this.maxDepth,this,this)}splitAndCollapse(t){for(let s=0;s<t.length;s++){const i=t[s];i.blocks?i.descendantCount<=i.capacity&&i.depth>0?i.collapse():this.splitAndCollapse(i.blocks):i.entries.length>i.capacity&&i.depth<this.maxDepth&&i.split()}}setDirty(){this._nodesDirty||setTimeout((()=>{this.splitAndCollapse(this.blocks),this._nodesDirty=!1}),0),this._nodesDirty=!0}addMesh(t){let s=!1;for(let i=0;i<this.blocks.length;i++){this.blocks[i].addEntry(t)&&(s=!0)}s&&this._descendantCount++}removeMesh(t){let s=!1;for(let i=0;i<this.blocks.length;i++){this.blocks[i].removeEntry(t)&&(s=!0)}s&&this._descendantCount--}updateMesh(t){this.removeMesh(t),this.addMesh(t)}inFrustum(t){this._selectionContent.reset();for(let s=0;s<this.blocks.length;s++){this.blocks[s].inFrustum(t,this._selectionContent)}return this._selectionContent}intersects(t,s){this._selectionContent.reset();for(let i=0;i<this.blocks.length;i++){this.blocks[i].intersects(t,s,this._selectionContent)}return this._selectionContent}intersectsRay(t){this._selectionContent.reset();for(let s=0;s<this.blocks.length;s++){this.blocks[s].intersectsRay(t,this._selectionContent)}return this._selectionContent}debugDraw(t){for(let s=0;s<this.blocks.length;s++){this.blocks[s].debugDraw(t)}}}export{o as default};