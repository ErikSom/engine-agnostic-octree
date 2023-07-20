import { OctreeBlock } from "./block";
import { IDebugDrawCallback, IFrustum, IMesh, IRay, IVec3 } from "./interfaces";
import UniqueArray from "./uniqueArray";

export default class Octree<T> {
    public blocks: Array<OctreeBlock<T>>;

    private _maxBlockCapacity: number;
    private _selectionContent: UniqueArray;
    private _descendantCount: number = 0;

    private _nodesDirty: boolean = false;

    constructor(
        maxBlockCapacity?: number,
        public maxDepth = 2
    ) {
        this._maxBlockCapacity = maxBlockCapacity || 64;
        this._selectionContent = new UniqueArray();
    }

    public initialize(worldMin: IVec3, worldMax: IVec3, entries: IMesh[]): void {
        OctreeBlock.CreateBlocks(worldMin, worldMax, entries, this._maxBlockCapacity, 0, this.maxDepth, this, this);
    }

    private splitAndCollapse(blocks: Array<OctreeBlock<T>>): void {
        for (let index = 0; index < blocks.length; index++) {
            const block = blocks[index];

            if(!block.blocks){
                if (block.entries.length > block.capacity && block.depth < this.maxDepth) {
                    block.split();
                }
            } else {
                if(block.descendantCount <= block.capacity && block.depth > 0){
                   block.collapse();
                }else {
                    this.splitAndCollapse(block.blocks);
                }
            }
        }
    }

    public setDirty(): void {
        if(!this._nodesDirty){
            setTimeout(() => {
                this.splitAndCollapse(this.blocks)
                this._nodesDirty = false;
            }, 0);
        }
        this._nodesDirty = true;
    }

    public addMesh(entry: IMesh): void {
        let added = false;
        for (let index = 0; index < this.blocks.length; index++) {
            const block = this.blocks[index];
            if(block.addEntry(entry)){
                added = true;
            };
        }

        if(added){
            this._descendantCount++;
        }
    }

    public removeMesh(entry: IMesh): void {
        let removed = false;
        for (let index = 0; index < this.blocks.length; index++) {
            const block = this.blocks[index];
            if(block.removeEntry(entry)){
                removed = true;
            }
        }
        if(removed){
            this._descendantCount--;
        }
    }

    public updateMesh(entry: IMesh): void {
        this.removeMesh(entry);
        this.addMesh(entry);
    }

    public inFrustum(frustum:IFrustum): UniqueArray {
        this._selectionContent.reset();

        for (let index = 0; index < this.blocks.length; index++) {
            const block = this.blocks[index];
            block.inFrustum(frustum, this._selectionContent);
        }

        return this._selectionContent;
    }

    public intersects(sphereCenter: IVec3, sphereRadius: number): UniqueArray {
        this._selectionContent.reset();

        for (let index = 0; index < this.blocks.length; index++) {
            const block = this.blocks[index];
            block.intersects(sphereCenter, sphereRadius, this._selectionContent);
        }

        return this._selectionContent;
    }

    public intersectsRay(ray: IRay): UniqueArray {
        this._selectionContent.reset();

        for (let index = 0; index < this.blocks.length; index++) {
            const block = this.blocks[index];
            block.intersectsRay(ray, this._selectionContent);
        }

        return this._selectionContent;
    }

    public debugDraw(debugDrawCallback: IDebugDrawCallback): void {
        for (let index = 0; index < this.blocks.length; index++) {
            const block = this.blocks[index];
            block.debugDraw(debugDrawCallback);
        }
    }
}
