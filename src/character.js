/*
Copyright (c) 2020, Micah Schuster
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * Character Class. Contains the data and methods related to the player character.
 */
export default class Character {


    constructor(map, enemies) {
			// The sprite number number in our sprite sheet that represents the character.
			this.spriteNumber = 4;
			// (x,y) pixel position and tile position
			// the sprites are 8x8 px
			// the initial position for the character is at 16x16, which is at row 2, col 2 - we divide by 8 to get the row/col
			this.x = 16;
			this.y = 16;
			this.row = this.y / 8;
			this.col = this.x / 8;
			// when the character moves, they move by 8 pixels
			this.moveAmount = 8;
			//
			this.map = map;
			// the sprites that are things you cannot move through
			this.boundarySprites = [144, 145, 147, 148, 150, 153, 39, 40];
			// the list of the enemies
			this.enemies = enemies;
		}

    /**
     * Updates the sprite to the correct location and locks the movement for "maxCounter" frames.
     */
    update() {
			// draw the character
			this.draw();
		}


    /**
     * Determines if the the player moves or attacks. Updates player data.
     * @param {string} direction Direction that the player the attempting to move.
     * @returns {Boolean} True if the player has moved or attacked, false otherwise.
     */
    move(direction) {
			// getTile() looks in the partciular direction you want to move and gives back a tile object if you can move there or null if there is no tile there.
			let chosen = this.getTile(direction);
			// move() determined if we moved or not, that's why we have true or false here... if null, no move, if tile, moved
			if (chosen == null) {
				return false;
			}
			// check if tile you're trying to move to is actually a boundary
			if (this.boundaryCheck(chosen) == true) {
				return false;
			}
			// Update the (row,col) and (x,y) pixel and tile information (i.e. update the position);
			this.row = chosen.y; // the chosen position's y is the row
			this.col = chosen.x;
			this.x = this.col * 8; // these convert back between pixel and row
			this.y = this.row * 8;
			// get the tile from the map using column and row
			this.tile = this.map.get(this.col, this.row);
			// if we moved then we return true so we know we moved and any enemies can move if they need to also
			return true;
		}

    /**
     * Performs attack action against enemy.
     * @param {Enemy} enemy 
     */
    attack(enemy) {

    }



    //utility functions

    /**
     * Determines if the input tile is a boundary sprite.
     * @param {Tile} tile 
     * @returns {boolean} True if the tile is a boundary sprite, false otherwise.
     */
    boundaryCheck(tile) {
        return this.spriteCheck(tile.x, tile.y);

    }
    /**
     * Determins if the input row and column are boundary sprites.
     * @param {number} xLoc Column in the tile map.
     * @param {number} yLoc Row in the tile map.
     */
    spriteCheck(xLoc, yLoc) {
        let t = this.map.get(xLoc, yLoc);
        if (t == null || this.boundarySprites.includes(t.sprite)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Gets the tile in the input direction.
     * @param {string} direction Direction to examine for the tile.
     * @returns {Tile} Tile in the input direction. Null if there is no tile.
     */
    getTile(direction) {
        let yLoc = this.y;
        let xLoc = this.x;
        let row = this.row;
        let col = this.col;
        switch (direction) {
            case "up": //up
                yLoc -= this.moveAmount;
                row = yLoc / 8;
                break;
            case "right": //right
                xLoc += this.moveAmount;
                col = xLoc / 8;
                break;
            case "down": //down
                yLoc += this.moveAmount;
                row = yLoc / 8;
                break;
            case "left": //left
                xLoc -= this.moveAmount;
                col = xLoc / 8;
                break;
            default:
                return null;
        }
        return this.map.get(col, row);
    }

    /**
     * Checks if the input tile contains and enemy object.
     * @param {Tile} tile Tile to examine.
     * @returns {Enemy} Enemy object if there is an enemy in the tile, null otherwise.
     */
    enemyCheck(tile) {
        let enemy = null;
        this.enemies.forEach(e => {
            if (tile.x == e.col && tile.y == e.row) {
                enemy = e;
            }
        });
        return enemy;
    }
    /**
     * Draws the sprite in the correct x and y location.
     */
    draw() {
			// draw sprite on screen using sprite number and x/y pos
			sprite(this.spriteNumber, this.x, this.y);
		}

}