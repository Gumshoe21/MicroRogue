export default class Camera {
	constructor(target) {
		// target = a character, our character
		this.x = 0;
		this.y = 0;
		this.target = target;
		this.SCREENWIDTH = $screen.width;
		this.SCREENHEIGHT = $screen.height;
	}
	/**
	 * Checks the location of the target and adjusts the position of the camera view.
	 */
	update() {
		let relativeX = Math.abs(this.x - this.target.x);
		let relativeY = Math.abs(this.y - this.target.y);

		if (relativeX >= this.SCREENWIDTH - this.SCREENWIDTH / 3 || relativeX <= this.SCREENWIDTH / 3) {
			this.x = this.target.x - this.SCREENWIDTH / 2;
		}
		if (relativeY >= this.SCREENHEIGHT - this.SCREENHEIGHT / 3 || relativeY <= this.SCREENHEIGHT / 3) {
			this.y = this.target.y - this.SCREENHEIGHT / 2;
		}
		camera(this.x, this.y);
	}
}
