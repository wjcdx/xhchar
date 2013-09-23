function Displayer(canvas, imgs)
{
		this.canvas = canvas;
		this.imgs = imgs;

}

Displayer.prototype.display = function()
{
		var imgLabels = new Array();
		for (var i in this.imgs) {
			imgLabels[i] = document.createElement("img");
			imgLabels[i].src = imgs[i];
		}

		var ch = parseInt(this.canvas.style.height);
		var cw = parseInt(this.canvas.style.width);

		for (var i in imgLabels) {
			var img = imgLabels[i];

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



