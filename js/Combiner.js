
function Combiner()
{
}

Combiner.prototype.combine = function(part1, part2)
{
	var parentUiE = part1.uie.uie.parentElement;
	var parentPart = ptsMgr.getPartial(part1.getParentIndex());

	parentPart.initUiE(part1);

	parentUiE.removeChild(part1.uie.uie);
	parentUiE.removeChild(part2.uie.uie);
	parentUiE.appendChild(parentPart.uie.uie);
}

