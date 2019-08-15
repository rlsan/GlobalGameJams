/*
Continue

New Game
Load Game
Options
	Controls
	Audio
*/

var shooter = shooter || {};
shooter.play = function(shooter) {
	version = 0.4;
	debug = true;
	var groups;
	var keys;
	var map;
	var gfx;
	var bmd;
	var pathfinder;
	var sfx;
	var transitioning
};

shooter.play.prototype = {
	create: function() {
		transitioning = false;
		this.background = this.game.add.image(this.game.width / 2, this.game.height / 2, 'background');
		this.background.anchor.setTo(.5, .5);
		this.levelNumber = 1;

		black = this.game.add.bitmapData(this.game.width, this.game.height);
		black.fill(0, 0, 0);
		this.overlay = this.game.add.image(0, 0, black);
		this.overlay.visible = false;

		gfx = this.game.add.graphics(0, 0);

		bmd = this.game.add.bitmapData(this.game.width, this.game.height);
		this.bmdContainer = bmd.addToWorld(this.game.width / 2, 0);
		this.bmdContainer.anchor.setTo(.5, 0);

		this.createKeys();
		this.createGroups();
		this.createAudio();

		this.playerShadow = this.game.add.sprite(this.game.width / 2 + 200, this.game.height / 2, 'playerShadow');
		this.playerShadow.centerAnchor();

		this.playerLegs = this.game.add.sprite(this.game.width / 2 + 200, this.game.height / 2, 'player');
		this.playerLegs.centerAnchor();
		this.playerLegs.animations.add('idle', [0], 30);
		this.playerLegs.animations.add('run', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7], 30, true);

		this.player = this.game.add.sprite(this.game.width / 2 + 200, this.game.height / 2, 'playerBody');
		this.player.centerAnchor();
		this.game.physics.arcade.enable(this.player);
		this.player.body.drag.setTo(500, 500);
		this.player.body.maxVelocity.setTo(200, 200);

		this.arena = new Phaser.Circle(this.game.width / 2, this.game.height / 2, this.game.height - 80);
		this.spawnArea = new Phaser.Circle(this.game.width / 2, this.game.height / 2, this.game.height - 300);

		this.laser = new Phaser.Line(0, 0, 0, 0);
		this.refLaser = new Phaser.Line(0, 0, 0, 0);

		this.game.input.onDown.add(this.click, this);
		this.game.input.onUp.add(this.release, this);
		this.game.input.addMoveCallback(this.move, this);

		for (var i = 0; i < 0; i++) {
			groups.enemies.create(this.spawnArea.random().x, this.spawnArea.random().y, 'key');
		}
		for (var i = 0; i < groups.enemies.children.length; i++) {
			enemy = groups.enemies.children[i];

			enemy.centerAnchor();
			enemy.kill();
		}
		for (var i = 0; i < 1; i++) {
			groups.spawners.create(this.spawnArea.random().x, this.spawnArea.random().y, 'key');
		}
		for (var i = 0; i < groups.spawners.children.length; i++) {
			spawner = groups.spawners.children[i];

			spawner.centerAnchor();
			spawner.health = 10;
			spawner.tint = 0xff8800;
		}

		var style = {
			font: "65px Times",
			fill: "#000000",
			align: "center"
		};

		this.levelText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Slide", style);
		this.levelText.setText('Slide No.' + this.levelNumber);

		this.levelText.anchor.set(0.5);

		backgroundOverlay = this.game.add.image(0, 0, 'backgroundOverlay');

	},
	createKeys: function() {
		keys = {
			up: 'W',
			down: 'S',
			left: 'A',
			right: 'D',
		};

		keyList = Object.keys(keys);
		values = Object.keys(keys).map(function(key) {
			return keys[key];
		});
		for (var i = 0; i < keyList.length; i++) {
			keys[keyList[i]] = addKey(this, values[i]);
		}

		this.mouseDown = false;
	},
	createGroups: function() {
		groups = {};
		groupsToAdd = [
			'enemies',
			'spawners',
		];
		for (var i = 0; i < groupsToAdd.length; i++) {
			groups[groupsToAdd[i]] = this.game.add.group();
		}
	},

	createAudio: function() {
		sfx = {
			step: this.game.add.audio('step'),
			laser: this.game.add.audio('laser'),
			kill: this.game.add.audio('kill'),
			newSlide: this.game.add.audio('newSlide'),
		};
		music = {
			main: this.game.add.audio('song'),
		};
		sfx.laser.volume = .5;
		sfx.laser.loop = true;
		sfx.laser.play();

		music.main.volume = .5;
		music.main.loop = true;
		music.main.play();
	},
	nextLevel: function() {
		sfx.newSlide.play();
		for (var i = 0; i < groups.spawners.children.length; i++) {
			spawner = groups.spawners.children[i];
			spawner.revive();
			spawner.scale.setTo(1, 1);
			spawner.position = this.spawnArea.random();
		}
		groups.spawners.create(this.spawnArea.random().x, this.spawnArea.random().y, 'key');

		bmd.clear();
		gfx.clear();
		//this.game.stage.updateTransform();
		bmd.drawFull(this.game.world);
		this.levelNumber++;
		this.levelText.setText('Slide No.' + this.levelNumber);

		var transition = this.game.add.tween(this.bmdContainer);

		overlay = this.overlay;
		levelText = this.levelText;

		transitioning = true;

		transition.to({
			rotation: Math.PI * ((this.levelNumber - 1) * 2)
		}, 1500, Phaser.Easing.Linear.Out);
		transition.start();
		transition.onComplete.add(function() {
			bmd.clear();
			overlay.visible = false;
			levelText.alpha = 1;
			transitioning = false;
		});

		this.overlay.visible = true;
	},

	click: function(inp) {
		this.mouseDown = true;
		//this.nextLevel();
	},

	release: function(inp) {
		this.mouseDown = false;
	},

	move: function(inp, x, y, isDown) {},

	spawnEnemies(x, y) {
		enemyToSpawn = groups.enemies.getFirstDead();
		if (enemyToSpawn !== null) {
			enemyToSpawn.revive();
			enemyToSpawn.health = 10;
			enemyToSpawn.position.setTo(x, y);
		}
	},

	update: function() {
		this.levelText.alpha -= .005;
		this.background.rotation += .0001;

		this.player.visible = !transitioning;
		this.playerLegs.visible = !transitioning;
		this.playerShadow.visible = !transitioning;
		groups.enemies.visible = !transitioning;
		groups.spawners.visible = !transitioning;

		if (!this.player.alive) {
			this.playerLegs.kill();
			this.playerShadow.kill();
			music.main.stop();
			sfx.laser.stop();
			this.game.state.start("play");
		}

		//this.bmdContainer.rotation -= .08;

		//this.arena.radius -= 1;

		this.playerLegs.position.setTo(this.player.x, this.player.y);
		this.playerShadow.position.setTo(this.player.x, this.player.y);
		inp = {
			x: this.game.input.x,
			y: this.game.input.y
		};

		//this.game.debug.geom(this.arena);
		//this.game.debug.geom(this.laser);

		this.laser.start = this.player;
		this.laser.end = inp;

		p1 = new Phaser.Point(0, 0);
		p2 = new Phaser.Point(0, 0);
		p3 = new Phaser.Point(0, 0);
		p4 = new Phaser.Point(0, 0);

		//console.log(intersection(this.laser, this.arena, p1, p2));
		intersection(this.laser, this.arena, p1, p2);

		this.player.rotation = this.laser.angle;

		//this.game.debug.geom(p2, '#ff0000');

		angle = Phaser.Point.angle(this.arena, p2);

		line2 = new Phaser.Line(0, 300, 0, 0);

		line2.centerOn(p2.x, p2.y);

		line2.rotate(angle, false);

		//this.refLaser.start = p2;
		//this.refLaser.start.setTo(p2.x + 1000, p2.y);
		this.refLaser = new Phaser.Line(p2.x, p2.y, p2.x + 200, p2.y);
		this.refLaser.start.setTo(p2.x, p2.y);

		refAngle = this.laser.reflect(line2);
		this.refLaser.fromAngle(p2.x, p2.y, refAngle, 1000);

		intersection(this.refLaser, this.arena, p3, p4);

		//this.refLaser.rotate(refAngle, false);

		//this.game.debug.geom(line2, '#ff00ff');

		this.laser.end = p2;
		this.refLaser.end = p4;

		gfx.clear();
		gfx.lineStyle(1, 0x000000);
		// gfx.drawCircle(this.arena.x, this.arena.y, this.arena.diameter);

		if (this.mouseDown == true && this.player.alive && !transitioning) {
			sfx.laser.mute = false;
			gfx.moveTo(this.player.x, this.player.y);
			gfx.lineStyle(4, 0xffffff, .5);
			gfx.lineTo(this.laser.end.x, this.laser.end.y);
			gfx.lineStyle(8, 0xffffff);
			gfx.lineTo(this.refLaser.end.x, this.refLaser.end.y);

			//this.game.debug.geom(this.laser, '#ff00ff');
			//this.game.debug.geom(this.refLaser, '#ff00ff');

			if (Phaser.Line.intersectsRectangle(this.refLaser, this.player)) {
				this.player.kill();
			}
			for (var i = 0; i < groups.enemies.children.length; i++) {
				enemy = groups.enemies.children[i];
				if (Phaser.Line.intersectsRectangle(this.refLaser, enemy)) {
					enemy.health--;
					enemy.x += Math.sin(this.game.time.now * 200);
				}
				if (enemy.health <= 0) {
					enemy.kill();

				}
			}
			for (var i = 0; i < groups.spawners.children.length; i++) {
				spawner = groups.spawners.children[i];
				if (Phaser.Line.intersectsRectangleGood(this.refLaser, spawner)) {
					spawner.scale.x -= .2;
					spawner.scale.y -= .2;
					spawner.x += Math.sin(this.game.time.now * 200);
				}
				if (spawner.scale.x <= .5) {
					spawner.kill();
					//sfx.kill.play();

				}
			}
		}
		if (this.mouseDown == false) {
			sfx.laser.mute = true;

		}

		for (var i = 0; i < groups.enemies.children.length; i++) {
			enemy = groups.enemies.children[i];

			enemy.x += Math.random() * 2 - 1;
			enemy.y += Math.random() * 2 - 1;
		}
		for (var i = 0; i < groups.spawners.children.length; i++) {
			spawner = groups.spawners.children[i];

			if (spawner.alive) {
				//this.spawnEnemies(spawner.x, spawner.y);
				//0.004
				scalar = this.levelNumber * 0.0002;
				spawner.scale.x += scalar;
				spawner.scale.y += scalar;

				box = new Phaser.Rectangle(spawner.left, spawner.top, spawner.width, spawner.height);

				if (Phaser.Rectangle.containsPoint(box, this.player)) {
					this.player.kill();
				}
			}
		}

		//this.game.debug.text(Math.deg(angle), 32, 32);
		//d = angle(inp, this.player);

		//this.laser.rotateAround(this.player.x, this.player.y, d);

		vel = this.player.body.velocity;
		acc = this.player.body.acceleration;

		MAX_ACC = 800;

		if (keys.up.isDown) {
			acc.y = -MAX_ACC;
			this.playerLegs.animations.play('run');
		} else if (keys.down.isDown) {
			acc.y = MAX_ACC;
			this.playerLegs.animations.play('run');
		} else {
			acc.y = 0;
		}
		if (keys.left.isDown) {
			acc.x = -MAX_ACC;
			this.playerLegs.animations.play('run');
		} else if (keys.right.isDown) {
			acc.x = MAX_ACC;
			this.playerLegs.animations.play('run');
		} else {
			acc.x = 0;
		}
		if (keys.left.isUp && keys.right.isUp && keys.up.isUp && keys.down.isUp) {
			this.playerLegs.animations.play('idle');
		}

		moveVector = new Phaser.Line(this.player.x, this.player.y, this.player.x + vel.x, this.player.y + vel.y);

		//gfx.lineStyle(2, 0xffffff);
		//gfx.moveTo(moveVector.start.x, moveVector.start.y);
		//gfx.lineTo(moveVector.end.x, moveVector.end.y);

		if (moveVector.length > .02) {
			this.playerLegs.rotation = moveVector.angle;
		}

		if (this.playerLegs.animations.currentAnim.name == 'run') {
			frame = this.playerLegs.animations.currentFrame.index;

			if (frame != this.playerLegs.currentFrame) {
				if (frame == 5) {
					this.playerLegs.currentFrame = frame;
					sfx.step.play();
				}
				if (frame == 15) {
					this.playerLegs.currentFrame = frame;
					sfx.step.play();
				}
			}
		}

		if (groups.spawners.getFirstAlive() === null) {
			this.nextLevel();
		}
		playerPos = new Phaser.Point(this.player.x, this.player.y);
		playerTether = new Phaser.Line(playerPos.x, playerPos.y, this.arena.x, this.arena.y);
		if (playerTether.length > this.arena.radius) {
			this.player.x += Math.cos(playerTether.angle) * 6;
			this.player.y += Math.sin(playerTether.angle) * 6;
		}

	},
	render: function() {

	},

};