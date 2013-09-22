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

		for (var i in imgLabels) {
			this.canvas.appendChild(imgLabels[i]);
		}
}



