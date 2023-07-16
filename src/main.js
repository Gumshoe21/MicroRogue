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
import Character from './character.js';
import Camera from './camera.js';
import Fog from './fog.js';
import Enemy from './enemy.js';

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

let background = getMap('map'); // get map by name
paper(0); // gives solid background, 0 rep's one of our colors in the color palette
let enemies = [];
const c = new Character(background, enemies); // character takes "map" and "enemies" args
const camera = new Camera(c); // takes a character as arg
var moved = false;
const enemy1 = new Enemy(6, 18, c, background);
enemies[0] = enemy1;
// Update is called once per frame
exports.update = function () {
	// btnp = pressed
	// btnr = released
	// and they both check if it was pressed or released in current frame
	if (btnp.up) {
		moved = c.move('up'); // remember that move() returns true or false, that's what we saved into moved variable
	} else if (btnp.right) {
		moved = c.move('right');
	} else if (btnp.down) {
		moved = c.move('down');
	} else if (btnp.left) {
		moved = c.move('left');
	}

	cls(); // clears the screen so we can draw everything again - every frame we draw all the tiles every fast - pixelbox.js is fast at doing this thankfull
	draw(background, 0, 0); // draw the object at a specific pixel coordinate - we're gonna use same style of draw function for sprites so that's why we need to know pixel positions. also, this is the thing that's sorta gonna be the lowest - anything else we draw after this is gonna be on top - think of it as layer system where u draw background first then sprites then fog map
	c.update();
	if (moved) {
		enemies.forEach(e => e.update());
		moved = false; // make "moved" ready for the next time the player moves
	}
	enemies.forEach(e => e.draw());
	camera.update();
};
