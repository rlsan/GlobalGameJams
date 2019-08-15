base = function(game, x, y, key, frame) {
	Phaser.Sprite.call(this, wario.game, x, y, key);
	wario.game.add.existing(this);

	center(this);

	this.game.physics.arcade.enable(this);
	this.body.setSize(16, 48, 24, 16);
	this.game.slopes.enable(this);
	this.body.slopes.preferY = true;

	this.body.gravity.y = 1000;
	this.body.maxVelocity.setTo(1200, 500);

	this.acceleration = 8000;
	this.jumpHeight = 280;
	this.body.maxVelocity.x = 130;

	this.facing = function() {
		return Phaser.Math.sign(this.scale.x);
	};

	this.holder = null;
	this.heldItem = null;
	this.targetItem = null;

	this.state = '';
};

base.prototype = Object.create(Phaser.Sprite.prototype);
base.prototype.constructor = base;

base.prototype.updateBase = function() {
	this.game.physics.arcade.collide(this, map.layer);

	if (this.state == 'hanging') {} else {
		if (this.body.onFloor() || this.body.touching.down) {
			this.state = 'grounded';
			this.body.drag.x = 5000;
			this.body.gravity.y = 3000;
		} else {
			this.state = 'inAir';
			this.body.drag.x = 0;
			this.body.gravity.y = 1000;
		}
	}
	if (this.heldItem) {
		this.heldItem.holder = this;
	}
	if (this.holder) {
		if (this.holder.heldItem) {
			this.holder.heldItem = this;
			this.body.x = this.holder.body.x;
			this.body.y = this.holder.body.y - 30;
		}
	}

	if (this.targetItem)
		this.targetItem.tint = 0xff4444;

	if (this.y > this.game.height + 120) {
		this.x = 30;
		this.y = 30;
		this.body.velocity.setTo(0, 0);
		this.body.acceleration.setTo(0, 0);
	}
};

bomb = function(game, x, y, key, frame) {
	base.call(this, wario.game, x, y, 'player');

	timer = 100;
};

bomb.prototype = Object.create(base.prototype);
bomb.prototype.constructor = bomb;

bomb.prototype.update = function() {
	this.updateBase();

	timer -= 1;

	if (timer < 0) {
		//this.kill();
	}
};