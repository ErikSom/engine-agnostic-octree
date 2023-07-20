import { IVec3 } from "../interfaces";

export default class Vec3 implements IVec3{
    public x:number;
    public y:number;
    public z:number;
    constructor(x:number = 0, y:number = 0, z:number = 0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    copy(vec:IVec3){
        this.x = vec.x;
        this.y = vec.y;
        this.z = vec.z;

        return this;
    }

    set(x:number, y:number, z:number){
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    add(vec:IVec3){
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;

        return this;
    }

    multiply(vec:IVec3){
        this.x *= vec.x;
        this.y *= vec.y;
        this.z *= vec.z;

        return this;
    }

    clone(){
        return new Vec3(this.x, this.y, this.z);
    }
}
