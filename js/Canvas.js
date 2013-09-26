
function Canvas(canvas, partials)
{
		this.canvas = canvas;
		this.partials = partials;

		this.adjustLevel();
}

Canvas.prototype.decorate = function()
{
}

Canvas.prototype.drawUiE = function(uie)
{
		uie.style.position = "absolute";
		uie.style.borderWidth = "1px";
		uie.style.borderColor = "blue";
		uie.style.borderStyle = "solid";

		this.adjust(uie);
		this.canvas.appendChild(uie);
}

Canvas.prototype.randomDraw = function(uie)
{
		var ch = parseInt(this.canvas.style.height);
		var cw = parseInt(this.canvas.style.width);

		var ih = uie.height;
		var iw = uie.width;

		var top = Math.round(Math.random() * ch);
		var lft = Math.round(Math.random() * cw);

		uie.style.top = top + "px";
		uie.style.left = lft + "px";
		
		this.drawUiE(uie);
}

Canvas.prototype.paint = function()
{
		for (var i in this.partials) {
			this.randomDraw(this.partials[i].uie.uie);
		}
}


Canvas.prototype.repaint = function()
{
		this.erase();
		this.paint();
}


Canvas.prototype.erasePartial = function(part)
{
	this.canvas.removeChild(part.uie.uie);

	var parts = new Array();
	for (var i in this.partials) {
		var p = this.partials[i];
		if (p.index != part.index) {
			parts.push(p);
		}
	}
	this.partials = parts;
}

Canvas.prototype.eraseAll = function()
{
	for (var i in this.partials) {
		var p = this.partials[i];
		this.erasePartial(p);
	}
}

Canvas.prototype.drawPartial = function(part)
{
	this.partials.push(part);
	this.drawUiE(part.uie.uie);
}

Canvas.prototype.drawPartialRandom = function(part)
{
	this.partials.push(part);
	this.randomDraw(part.uie.uie);
}

Canvas.prototype.drawPartials = function(parts)
{
	for (var i in parts) {
		this.drawPartialRandom(parts[i]);
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
		this.drawPartial(parent);

		this.adjustLevel();
	}
}

Canvas.prototype.adjustLevel = function()
{
	var level = 0;
	for (var i in this.partials) {
		var lvl = this.partials[i].level;
		if (lvl > level) {
			level = lvl;
		}
	}
	this.level = level;
}

Canvas.prototype.splitOnce = function()
{
	for (var i in this.partials) {
		var p = this.partials[i];
		if (p.chds > 0) {
			var chds = ptsMgr.getChildren(p);
			this.erasePartial(p);
			this.drawPartials(chds);
		}
	}
}



