
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


