function checkForDebug(game) {
	if (keys.debug.downDuration(1))
		if (debug)
			debug = false;
		else
			debug = true;
	if (debug)
		updateDebug(game);

	versionString = 'v' + version;
	game.debug.text(versionString, game.width - 9.6 * versionString.length, game.height - 2, '#cccccc');
}

function updateDebug(game) {
	w = 9.6;
	h = 14;

	game.debug.text('Debug Mode', game.width - w * 10, h * 1, '#00ff00');

	function showKey(game, key, string) {
		game.debug.text(string.repeat(key.isDown), w * (key.keyCode % 10), h * 2);
	}
	things = [];
	for (var i = 0; i < Object.keys(keys).length; i++) {
		list = Object.keys(keys);
		key = keys[list[i]];
		if (key.isDown) {
			things.push(list[i]);
		} else {
			things.push('');
		}
	}
	for (var i = 0; i < things.length; i++) {
		game.debug.text(things[i], w, h * (i + 2));
	}
}