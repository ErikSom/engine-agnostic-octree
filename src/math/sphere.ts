import { ISphere, IVec3 } from "../interfaces";
import Vec3 from "./vec3";

export default class Sphere implements ISphere {
	public center: IVec3;
	public radius: number;
	public radius2: number;

	constructor(center: IVec3 = new Vec3(), radius: number = 0) {
		this.center = center;
		this.radius = radius;
		this.radius2 = radius * radius;
	}

	public copy(sphere: ISphere): Sphere {
		this.center.copy(sphere.center);
		this.radius = sphere.radius;
		this.radius2 = sphere.radius2;

		return this;
	}

	public set(center: IVec3, radius: number): Sphere {
		this.center.copy(center);
		this.radius = radius;
		this.radius2 = radius * radius;

		return this;
	}

	public clone(): Sphere {
		return new Sphere(this.center.clone(), this.radius);
	}
}
