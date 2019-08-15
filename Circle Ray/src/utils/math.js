Phaser.Line.intersectsRectangleGood = function(line, rect) {

	//  Quick bail out of the Line and Rect bounds don't intersect
	if (!Phaser.Rectangle.intersects(line, rect)) {
		return false;
	}

	var x1 = line.start.x;
	var y1 = line.start.y;

	var x2 = line.end.x;
	var y2 = line.end.y;

	var bx1 = rect.left;
	var by1 = rect.top;
	var bx2 = rect.right;
	var by2 = rect.bottom;

	var t = 0;

	//  If the start or end of the line is inside the rect then we assume
	//  collision, as rects are solid for our use-case.

	if ((x1 >= bx1 && x1 <= bx2 && y1 >= by1 && y1 <= by2) ||
		(x2 >= bx1 && x2 <= bx2 && y2 >= by1 && y2 <= by2)) {
		return true;
	}

	if (x1 < bx1 && x2 >= bx1) {
		//  Left edge
		t = y1 + (y2 - y1) * (bx1 - x1) / (x2 - x1);

		if (t > by1 && t <= by2) {
			return true;
		}
	} else if (x1 > bx2 && x2 <= bx2) {
		//  Right edge
		t = y1 + (y2 - y1) * (bx2 - x1) / (x2 - x1);

		if (t >= by1 && t <= by2) {
			return true;
		}
	}

	if (y1 < by1 && y2 >= by1) {
		//  Top edge
		t = x1 + (x2 - x1) * (by1 - y1) / (y2 - y1);

		if (t >= bx1 && t <= bx2) {
			return true;
		}
	} else if (y1 > by2 && y2 <= by2) {
		//  Bottom edge
		t = x1 + (x2 - x1) * (by2 - y1) / (y2 - y1);

		if (t >= bx1 && t <= bx2) {
			return true;
		}
	}

	return false;

};

function intersection(line, circle, result1, result2, segment) {
	var lx = line.end.x - line.start.x;
	var ly = line.end.y - line.start.y;

	var len = Math.sqrt(lx * lx + ly * ly);

	var dx = lx / len;
	var dy = ly / len;

	var t = dx * (circle.x - line.start.x) + dy * (circle.y - line.start.y);

	var ex = t * dx + line.start.x;
	var ey = t * dy + line.start.y;

	var lec = Math.sqrt((ex - circle.x) * (ex - circle.x) +
		(ey - circle.y) * (ey - circle.y));

	if (lec < circle.radius) {

		var dt = Math.sqrt(circle.radius * circle.radius - lec * lec);

		var te = dx * (line.end.x - line.start.x) + dy * (line.end.y - line.start.y);

		if (segment) {
			if ((t - dt < 0 || t - dt > te) &&
				(t + dt < 0 || t + dt > te)) {
				return 2;
			} else if (t - dt < 0 || t - dt > te) {
				result1.x = (t + dt) * dx + line.start.x;
				result1.y = (t + dt) * dy + line.start.y;
				return 2;
			} else if (t + dt < 0 || t + dt > te) {
				result1.x = (t - dt) * dx + line.start.x;
				result1.y = (t - dt) * dy + line.start.y;
				return 2;
			}
		}

		result1.x = (t - dt) * dx + line.start.x;
		result1.y = (t - dt) * dy + line.start.y;

		result2.x = (t + dt) * dx + line.start.x;
		result2.y = (t + dt) * dy + line.start.y;

		return 1;
	} else if (lec == circle.radius) {

		result1.x = ex;
		result1.y = ey;

		result2.x = ex;
		result2.y = ey;

		return 3;
	}

	return 0;
}

function numToGray(n) {
	n = 1 - n;
	n = Math.min(Math.max(n, 0.01), 1);
	n *= 255;
	return Phaser.Color.packPixel(n, n, n, 255);
}

Math.rad = function(degrees) {
	return degrees * Math.PI / 180;
};

Math.deg = function(radians) {
	return radians * 180 / Math.PI;
};

function range(a, b) {
	var range = [];
	var difference = Math.abs(a - b);
	for (var i = 0; i <= difference; i++) {
		range.push(a + i);
	}
	return range;
}

function angle(a, b, asDegrees) {

	if (asDegrees === undefined) {
		asDegrees = false;
	}

	if (asDegrees) {
		return Phaser.Math.radToDeg(Math.atan2(a.y - b.y, a.x - b.x));
	} else {
		return Math.atan2(a.y - b.y, a.x - b.x);
	}

}