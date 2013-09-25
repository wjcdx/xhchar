
function UiElement(uie, height, width)
{
		this.uie = uie;
		this.height = height;
		this.width = width;
		this.top = 0;
		this.left = 0;

		this.attachEventListener();
}

UiElement.prototype.attachEventListener = function()
{
		this.uie.style.cursor = "move";
		attachEventListener(this.uie, "mousedown", mousedownDragNDrop, false);
}

UiElement.prototype.collisionWith = function(target)
{
		var tx = parseInt(target.style.left);
		var ty = parseInt(target.style.top);
		var th = target.height;
		var tw = target.width;

		var uiex = parseInt(this.uie.style.left);
		var uiey = parseInt(this.uie.style.top);

		var uieh = this.uie.height;
		var uiew = this.uie.width;

		// target and uie is the same
		if (tx == uiex && ty == uiey)
				return false;

		var xc = false;
		var yc = false;
		if ((tx > uiex && tx < (uiex + uiew))
			|| (uiex > tx && uiex < (tx + tw))) {
			xc = true;
		}

		if ((ty > uiey && ty < (uiey + uieh))
			|| (uiey > ty && uiey < (ty + th))) {
			yc = true;
		}

		return (xc && yc);
}

UiElement.prototype.hasUI = function(target)
{
	if (this.uie.src == target.src)
		return true;
	return false;
}

UiElement.prototype.initUiE = function(uie)
{
	this.uie.style.top = uie.uie.style.top;
	this.uie.style.left = uie.uie.style.left;
}

