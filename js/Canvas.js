

function Canvas(canvas, partials)
{
		this.canvas = canvas;
		this.partials = partials;
}

Canvas.prototype.decorate = function()
{
}

Canvas.prototype.paint = function()
{
		var partials = this.partials;
		var ch = parseInt(this.canvas.style.height);
		var cw = parseInt(this.canvas.style.width);

		for (var i in partials) {
			var img = partials[i].uie.uie;

			img.style.position = "absolute";
			img.style.borderWidth = "1px";
			img.style.borderColor = "blue";
			img.style.borderStyle = "solid";

			var ih = img.height;
			var iw = img.width;

			var top = Math.round(Math.random() * ch);
			var lft = Math.round(Math.random() * cw);

			if (top + ih > ch)
					top = ch - ih;

			if (lft + iw > cw)
					lft = cw - iw;

			img.style.top = top + "px";
			img.style.left = lft + "px";

			this.canvas.appendChild(img);
		}
}


Canvas.prototype.repaint = function()
{
		this.erase();
		this.paint();
}


Canvas.prototype.erase = function()
{
}

Canvas.prototype.adjust = function(img)
{
		var ch = parseInt(this.canvas.style.height);
		var cw = parseInt(this.canvas.style.width);

		var ih = img.height;
		var iw = img.width;

		var ix = parseInt(img.style.left);
		var iy = parseInt(img.style.top);

		if (ix + iw > cw)
			ix = cw - iw;

		if (iy + ih > ch) 
			iy = ch - ih;

		if (ix < 0)
				ix = 0;

		if (iy < 0)
				iy = 0;

		img.style.left = ix + "px";
		img.style.top = iy + "px";
}

Canvas.prototype.collisionDetect = function(target)
{
		for (var i in this.partials) {
				var uie = this.partials[i].uie;
				if (uie.collisionWith(target)) {
					alert("collision detected!");
					break;
				}
		}
}



