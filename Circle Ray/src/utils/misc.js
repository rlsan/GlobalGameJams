function snapToXY(obj, gap, start) {
	obj.x = Phaser.Math.snapTo(obj.x, gap, start);
	obj.y = Phaser.Math.snapTo(obj.y, gap, start);
}

function addKey(game, key) {
	code = 'Phaser.Keyboard.' + key;
	return game.input.keyboard.addKey(eval(code));
}

Phaser.Sprite.prototype.centerAnchor = function() {
	this.anchor.setTo(0.5, 0.5);
}

Phaser.Sprite.prototype.snapToGrid = function() {
	this.x = Phaser.Math.snapTo(this.x, 32, 16);
	this.y = Phaser.Math.snapTo(this.y, 32, 16);
}

function flip(obj, dir) {
	obj.scale.x = Math.min(Math.max(Math.ceil(dir), -1), 1);
}