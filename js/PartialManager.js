
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

PartialManager.prototype.getPartialsOfLevel = function(level)
{
}

PartialManager.prototype.getChildren = function(part)
{
	var parts = new Array();

	if (part.chds == 0) {
		return parts;
	}

	for (var i in this.partials) {

		var p = this.partials[i];
		if (p.level > part.level
			&& p.getParentIndex() == part.index) {
			parts.push(p);
		}
	}
	return parts;
}

PartialManager.prototype.addPartialInto = function(part, partials)
{
	for (var i in partials) {
		if (part.index == partials[i].index) {
			return;
		}
	}
	partials.push(part);
}


