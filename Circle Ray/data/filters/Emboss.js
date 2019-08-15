Phaser.Filter.Gray = function(game) {

	Phaser.Filter.call(this, game);

	this.uniforms.gray = {
		type: '1f',
		value: 1.0
	};

	this.fragmentSrc = [

		"precision mediump float;",

		"varying vec2       vTextureCoord;",
		"varying vec4       vColor;",
		"uniform sampler2D  uSampler;",

		"void main(void) {",

		"vec4 tex = texture2D(uSampler, vTextureCoord);",
		"gl_FragColor = tex + vec4(0,0,0,1)*tex.a;",
		"}"

	];

};

Phaser.Filter.Gray.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Gray.prototype.constructor = Phaser.Filter.Gray;

/**
 * The strength of the gray. 1 will make the object black and white, 0 will make the object its normal color
 * @property gray
 */
Object.defineProperty(Phaser.Filter.Gray.prototype, 'gray', {

	get: function() {
		return this.uniforms.gray.value;
	},

	set: function(value) {
		this.uniforms.gray.value = value;
	}

});