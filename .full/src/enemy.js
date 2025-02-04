export default class Enemy {
	constructor(row, col, player, map) {
		this.row = row;
		this.col = col;
		this.x = col * 8;
		this.y = row * 8;
		this.map = map;
		this.tile = this.map.get(this.col, this.row);
		this.boundarySprites = [144, 145, 147, 148, 150, 153, 39, 40];
		this.player = player;
		this.spriteNumber = 20;
	}
	/**
	 * Method to move and draw the enemy object.
	 */
	update() {
		this.move();
		//this.draw()
	}
	/**
	 * Decides if the enemy will move or attack, based on relative position between enemy and player.
	 * Updates the appropriate enemy fields.
	 */
	move() {
		let distance = this.computeDistance(this.tile, this.player.tile);
		if (distance > 5) {
			return;
		}
		//if the distance to the player is now 1, do that attack.
		if (distance <= 1) {
			this.attack();
			return;
		}
		let chosen = this.getTile();

		if (chosen != null) {
			this.row = chosen.y;
			this.col = chosen.x;
			this.x = this.col * 8;
			this.y = this.row * 8;
			this.tile = this.map.get(this.col, this.row);
		}
	}
	/**
	 * Performs attack.
	 */
	attack() {
		console.log('Enemy attacked player');
	}
	//utility functions
	/**
	 * Examines all tiles around the enemy and determines which is cloest to the player.
	 * @returns {Tile} Tile that the enemy will attempt to move to.
	 */
	getTile() {
		let dirs = [];
		dirs[0] = this.map.get(this.col, this.row - 1); //up
		dirs[1] = this.map.get(this.col + 1, this.row); //right
		dirs[2] = this.map.get(this.col, this.row + 1); //down
		dirs[3] = this.map.get(this.col - 1, this.row); //left

		dirs.forEach((dir, i) => {
			if (dir == null || this.boundarySprites.includes(dir.sprite)) {
				dirs[i] = null;
			}
		});

		return this.shortestDistanceToPlayer(
			dirs[0],
			this.shortestDistanceToPlayer(dirs[1], this.shortestDistanceToPlayer(dirs[2], dirs[3]))
		);
	}
	/**
	 * Draws the enemy sprite at its current location.
	 */
	draw() {
		sprite(this.spriteNumber, this.x, this.y);
	}
	/**
	 * Computes euclidean distance between two tiles.
	 * @param {Tile} tile1 First tile.
	 * @param {Tile} tile2 Second tile.
	 * @returns {Tile} Euclidean distance between the two parameters.
	 */
	computeDistance(tile1, tile2) {
		return Math.sqrt((tile1.x - tile2.x) * (tile1.x - tile2.x) + (tile1.y - tile2.y) * (tile1.y - tile2.y));
	}

	/**
	 * Compares two tiles to determine if they have the same x and y coordinate.
	 * @param {Tile} tile1 First tile to compare.
	 * @param {Tile} tile2 Second tile to compare.
	 * @returns {Boolean} True if the tiles have the same coordinates, false otherwise.
	 */
	equals(tile1, tile2) {
		if (tile1 == null || tile2 == null) {
			return false;
		}
		if (tile1.x == tile2.x && tile1.y == tile2.y) {
			return true;
		}
		return false;
	}
	/**
	 * Detmines which of the two input tiles are closest to the player.
	 * @param {Tile} tile1 First tile to consider.
	 * @param {Tile} tile2 Second tile to consider.
	 * @returns {Tile} Reference to the tile that is closer to the player, null if both inputs are null.
	 */
	shortestDistanceToPlayer(tile1, tile2) {
		if (tile1 == null && tile2 == null) {
			return null;
		} else if (tile1 == null) {
			return tile2;
		} else if (tile2 == null) {
			return tile1;
		}
		if (this.computeDistance(tile1, this.player.tile) < this.computeDistance(tile2, this.player.tile)) {
			return tile1;
		} else {
			return tile2;
		}
	}
}
