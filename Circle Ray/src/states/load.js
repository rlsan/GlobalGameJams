//60 32x18

var shooter = shooter || {};
shooter.load = function(shooter) {};

shooter.load.prototype = {

	setScaleModes: function() {
		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	},
	setPhysics: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	setTime: function() {
		this.time.advancedTiming = true;
		this.game.time.desiredFps = 60;
	},
	loadData: function() {
		load = this.game.load;

		load.tilemap('map_test', 'data/maps/test.json', null, Phaser.Tilemap.TILED_JSON);
		load.script('convolutionFilter', 'data/filters/pixi/ConvolutionFilter.js');
		load.script('noiseFilter', 'data/filters/pixi/NoiseFilter.js');
	},
	loadAudio: function() {
		load = this.game.load;

		load.audio('step', 'assets/audio/step.wav');
		load.audio('laser', 'assets/audio/laser.wav');
		load.audio('kill', 'assets/audio/kill.wav');
		load.audio('newSlide', 'assets/audio/newSlide.wav');

		load.audio('song', 'assets/audio/song.ogg');
	},
	loadImages: function() {
		load = this.game.load;

		//load characters
		load.spritesheet('player', 'assets/player/sheet.png', 64, 64);
		load.image('playerBody', 'assets/player/body.png');
		load.image('playerShadow', 'assets/player/player_shadow.png');

		load.image('backgroundOverlay', 'assets/env/microscope_overlay.png');
		load.image('background', 'assets/env/microscope_background.png');
	},

	preload: function() {
		this.game.stage.backgroundColor = '999999';

		this.setScaleModes();
		this.setPhysics();
		this.setTime();

		this.loadData();
		this.loadAudio();
		this.loadImages();
	},

	create: function() {
		this.game.state.start("play");
	}
};