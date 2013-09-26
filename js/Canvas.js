
function Canvas(canvas)
{
		this.canvas = canvas;
		this.partials = new Array();
}

Canvas.prototype.decorate = function()
{
}

Canvas.prototype.drawUiE = function(uie, random)
{
		uie.style.position = "absolute";
		uie.style.borderWidth = "1px";
		uie.style.borderColor = "blue";
		uie.style.borderStyle = "solid";

		if (random) {
			this.positionRandomize(uie);
		}
		this.adjust(uie);
		this.canvas.appendChild(uie);
}

Canvas.prototype.positionRandomize = function(uie)
{
	var ch = parseInt(this.canvas.style.height);
	var cw = parseInt(this.canvas.style.width);

	var ih = uie.height;
	var iw = uie.width;

	var top = Math.round(Math.random() * ch);
	var lft = Math.round(Math.random() * cw);

	uie.style.top = top + "px";
	uie.style.left = lft + "px";
}

Canvas.prototype.paint = function(partials)
{
	this.drawPartials(partials, true);
}


Canvas.prototype.repaint = function()
{
	var parts = this.partials;
	this.eraseAll();
	this.paint(parts);
}

Canvas.prototype.removePartial = function(part)
{
	var parts = new Array();
	for (var i in this.partials) {
		var p = this.partials[i];
		if (p.index != part.index) {
			parts.push(p);
		}
	}
	this.partials = parts;
}

Canvas.prototype.erasePartial = function(part)
{
	this.canvas.removeChild(part.uie.uie);
	this.removePartial(part);
}

Canvas.prototype.eraseAll = function()
{
	for (var i in this.partials) {
		var p = this.partials[i];
		this.erasePartial(p);
	}
}

Canvas.prototype.addPartial = function(part)
{
	this.partials.push(part);
}

Canvas.prototype.drawPartial = function(part, random)
{
	this.addPartial(part);
	this.drawUiE(part.uie.uie, random);
}

Canvas.prototype.drawPartials = function(parts, random)
{
	for (var i in parts) {
		this.drawPartial(parts[i], random);
	}
}

Canvas.prototype.adjust = function(uie)
{
		var ch = parseInt(this.canvas.style.height);
		var cw = parseInt(this.canvas.style.width);

		var ih = uie.height;
		var iw = uie.width;

		var ix = parseInt(uie.style.left);
		var iy = parseInt(uie.style.top);

		if (ix + iw > cw)
			ix = cw - iw;

		if (iy + ih > ch) 
			iy = ch - ih;

		if (ix < 0)
				ix = 0;

		if (iy < 0)
				iy = 0;

		uie.style.left = ix + "px";
		uie.style.top = iy + "px";
}

Canvas.prototype.collisionDetect = function(target)
{
	var coller = null, collee = null;
	var collision = 0;
	for (var i in this.partials) {
			var p = this.partials[i];
			if (p.uie.collisionWith(target)) {
				collision++;
				collee = p;
			} else if (p.uie.hasUI(target)) {
				coller = p;
			}
	}

	if (collision == 1 && collee.neighborTo(coller)) {
		//var combiner = new Combiner();
		//combiner.combine(collee, coller);
		var parent = ptsMgr.getPartial(collee.getParentIndex());
		parent.initUiE(collee);

		this.erasePartial(collee);
		this.erasePartial(coller);
		this.drawPartial(parent, false);
	}
}

Canvas.prototype.splitOnce = function()
{
	for (var i in this.partials) {
		var p = this.partials[i];
		if (p.chds > 0) {
			var chds = ptsMgr.getChildren(p);
			this.erasePartial(p);
			this.drawPartials(chds, true);
		}
	}
}


