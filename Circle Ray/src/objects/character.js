character = function(game, x, y, key, frame) {
	base.call(this, wario.game, x, y, key);

	this.controllable = false;
	this.jumped = false;
	this.canClimb = false;
	animations = ['idle', 'run', 'jump', 'fall'];
	this.animations.add('idle', range(0, 4), 5);
	this.animations.add('start', range(16, 24), 60);
	this.animations.add('run', range(32, 54), 70);
	this.animations.add('jump', range(81, 95), 30, false);
};

character.prototype = Object.create(base.prototype);
character.prototype.constructor = base;

character.prototype.update = function() {
	this.updateBase();
	this.updateMovement();
};

character.prototype.updateMovement = function() {
	k = keys;
	acc = this.body.acceleration;
	vel = this.body.velocity;

	if (this.controllable) {
		up = k.up.isDown;
		down = k.down.isDown;
		left = k.left.isDown;
		right = k.right.isDown;
		a = k.a.isDown;
		b = k.b.isDown;
	} else {
		up = false;
		down = false;
		left = false;
		right = false;
		a = false;
		b = false;
	}

	//this.game.debug.text(this.state, this.x, this.y);

	if (this.state == 'grounded') {
		this.body.maxVelocity.x = 130;
		this.jumped = false;
		if (right && !left) {
			acc.x = this.acceleration;
			flip(this, 1);
			this.animations.play('run');
		} else if (left && !right) {
			acc.x = -this.acceleration;
			flip(this, -1);
			this.animations.play('run');
		} else {
			acc.x = 0;
			this.animations.play('idle');
		}

		if (this.controllable) {
			if (keys.a.downDuration(100)) {
				this.state = 'inAir';
				vel.y = -this.jumpHeight;
				this.animations.play('jump');
				this.jumped = true;
			}
		} else {
			if (a) {
				vel.y = -this.jumpHeight;
				this.jumped = true;
			}
		}
		if (this.targetItem && b) {
			this.heldItem = this.targetItem;
		}
		if (this.heldItem && up) {
			this.heldItem = null;
		}
	}
	if (this.state == 'inAir') {

		if (this.jumped) {
			//vel.x *= 1;
		} else {
			this.body.maxVelocity.x = 75;
		}

		if (this.canClimb && vel.y > 0) {
			if (right && !left) {
				tile = map.level.getTileWorldXY(this.x + 30, this.y);
				if (tile !== null) {
					this.state = 'hanging';
				}
			} else if (left && !right) {
				tile = map.level.getTileWorldXY(this.x - 30, this.y);
				if (tile !== null) {
					this.state = 'hanging';
				}
			} else {
				//acc.x = 0;
			}
		}
	}
	if (this.state == 'hanging') {
		snapToXY(this, 30, 15);
		this.body.velocity.setTo(0, 0);
		this.body.acceleration.setTo(0, 0);

		if (up || a) {
			this.x += 30 * this.facing();
			this.y -= 60;
			snapToXY(this, 30, 15);
			this.state = 'grounded';
		}
		if (down) {
			this.state = 'inAir';
		}
	}
};

player = function(game, x, y, key, frame) {
	character.call(this, wario.game, x, y, 'player');

	this.controllable = true;
	this.canClimb = true;

};

player.prototype = Object.create(character.prototype);
player.prototype.constructor = player;

guy = function(game, x, y, key, frame) {
	character.call(this, wario.game, x, y, 'player');
};

guy.prototype = Object.create(character.prototype);
guy.prototype.constructor = guy;