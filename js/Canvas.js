

function Canvas(canvas)
{
		this.canvas = canvas;
}

Canvas.prototype.decorate = function()
{
}

Canvas.prototype.paint = function(partials)
{
		var ch = parseInt(this.canvas.style.height);
		var cw = parseInt(this.canvas.style.width);

		for (var i in partials) {
			var img = partials[i].uie.uie;

			img.style.position = "absolute";

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


Canvas.prototype.repaint = function(partials)
{
		this.erase();
		this.paint(partials);
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

		var top = parseInt(img.style.top);
		var lft = parseInt(img.style.left);

		if (top + ih > ch) 
			top = ch - ih;

		if (lft + iw > cw)
			lft = cw - iw;

		if (top < 0)
				top = 0;

		if (lft < 0)
				lft = 0;

		img.style.top = top + "px";
		img.style.left = lft + "px";
}


