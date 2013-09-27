
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

Canvas.prototype.erasePartials = function(partials)
{
	for (var i in partials) {
		this.erasePartial(partials[i]);
	}
}

Canvas.prototype.eraseAll = function()
{
	for (var i in this.partials) {
		this.erasePartial(this.partials[i]);
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
	var collers = new Array();
	var parents = new Array();

	for (var i in this.partials) {
		this.partials[i].collision = false;
	}

	for (var i in this.partials) {
		var pi = this.partials[i];
		for (var j = this.partials.length - 1; j > i; j--) {
			var pj = this.partials[j];
			if (pi.uie.collisionWith(pj.uie)) {
				pi.collision = true;
				pj.collision = true;
			}
		}
	}

	for (var i in this.partials) {
		var p = this.partials[i];
		if (p.collision) {
			collers.push(p);
			var parent = ptsMgr.getPartial(p.getParentIndex());
			ptsMgr.addPartialInto(parent, parents);
		}
	}

	if (parents.length != 1) {
		return;
	}

	var parent = parents[0];
	if (parent.chds != collers.length) {
		return;
	}

	parent.initUiE(collers[0]);
	this.erasePartials(collers);
	this.drawPartial(parent, false);
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


