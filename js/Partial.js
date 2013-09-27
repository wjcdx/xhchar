
function Partial(index, chds, uie)
{
		this.index = index;
		this.uie = uie;

		this.level = index.split('.').length;
		this.chds = chds;

		this.collision = false;
}

Partial.prototype.neighborTo = function(partial)
{
	var iidx = this.index.split('.');
	var pidx = partial.index.split('.');

	var ilen = iidx.length;
	if (ilen < 1 || ilen != pidx.length)
		return false;

	for (var i = 0; i < ilen - 1; i++) {
		if (iidx[i] != pidx[i]) {
			return false;	
		}
	}

	if (Math.abs(iidx[ilen-1] - pidx[ilen - 1]) == 1) {
		return true;
	}
	return false;
}

Partial.prototype.getParentIndex = function()
{
	var last = this.index.lastIndexOf('.');
	return this.index.substring(0, last);
}

Partial.prototype.initUiE = function(part)
{
	this.uie.initUiE(part.uie);
}


