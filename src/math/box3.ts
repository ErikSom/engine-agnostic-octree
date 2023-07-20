import { IBox3, ISphere, IVec3 } from "../interfaces";
import Vec3 from "./vec3";

export default class Box3 implements IBox3 {
	public min: Vec3;
	public max: Vec3;

	constructor(min: IVec3 = new Vec3(), max: IVec3 = new Vec3()) {
		this.min = min;
		this.max = max;
	}

	public copy(box: IBox3): Box3 {
		this.min.copy(box.min);
		this.max.copy(box.max);

		return this;
	}

	public set(min: IVec3, max: IVec3): Box3 {
		this.min.copy(min);
		this.max.copy(max);

		return this;
	}

	public clone(): Box3 {
		return new Box3(this.min.clone(), this.max.clone());
	}

	public intersectsSphere(sphere: ISphere): boolean {
		const center = sphere.center;
		const radius2 = sphere.radius2;

		const x = Math.max(this.min.x, Math.min(center.x, this.max.x));
		const y = Math.max(this.min.y, Math.min(center.y, this.max.y));
		const z = Math.max(this.min.z, Math.min(center.z, this.max.z));

		const distanceSquared = (x - center.x) ** 2 + (y - center.y) ** 2 + (z - center.z) ** 2;

		return distanceSquared < radius2;
	}

	public intersectsBox(box: IBox3): boolean {
		return (
			this.max.x >= box.min.x &&
			this.min.x <= box.max.x &&
			this.max.y >= box.min.y &&
			this.min.y <= box.max.y &&
			this.max.z >= box.min.z &&
			this.min.z <= box.max.z
		);
	}
}
