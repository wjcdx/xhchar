
function PartialManager(partials)
{
	this.partials = partials;
}

PartialManager.prototype.getLowestPartials = function()
{
	var parts = new Array();
	for (var i in this.partials) {

		var p = this.partials[i];
		if (p.chds == 0)
			parts.push(p);

	}
	return parts;
}

PartialManager.prototype.getPartial = function(index)
{
	for (var i in this.partials) {

		var p = this.partials[i];
		if (p.index == index)
			return p;

	}
	return null;
}


