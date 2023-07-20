import Box3 from "./math/box3";

export interface IVec3{
    x:number;
    y:number;
    z:number;

	copy(vec:IVec3):IVec3;
	set(x:number, y:number, z:number):IVec3;
	clone():IVec3;

	add(vec:IVec3):IVec3;
	multiply(vec:IVec3):IVec3;
}

export interface IBox3{
	min:IVec3;
	max:IVec3;

	copy(box:IBox3):IBox3;
	set(min:IVec3, max:IVec3):IBox3;
	clone():IBox3;

	intersectsSphere(sphere:ISphere):boolean;
	intersectsBox(box:IBox3):boolean;
}

export interface IMesh{
    position:IVec3;
    scale:IVec3;

	computeBoundingBox():IBox3;
	computeWorldBoundingBox(localBounds: IBox3):IBox3;

	_maxBoundingBox?: IBox3;
    _maxWorldBoundingBox?: IBox3;
    isStatic?: boolean;
}

export interface IRay{
    origin:IVec3;
    direction:IVec3;

	intersectsBox(box:IBox3):boolean;
}

export interface IFrustum{
	intersectsBox(box:IBox3):boolean;
}

export interface ISphere{
	center:IVec3;
	radius:number;
	radius2:number;

	copy(sphere:ISphere):ISphere;
	set(center:IVec3, radius:number):ISphere;
	clone():ISphere;
}

export interface IDebugDrawCallback {
    (box: IBox3): void;
}
