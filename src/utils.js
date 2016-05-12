function random_range(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function are_adjacent(unit1, unit2) {
	if(unit1.x + 1 === unit2.x && unit1.y === unit2.y){
		return true;
	} else if(unit1.x - 1 === unit2.x && unit1.y === unit2.y){
		return true;
	} else if(unit1.x === unit2.x && unit1.y + 1 === unit2.y){
		return true;
	} else if(unit1.x === unit2.x && unit1.y - 1 === unit2.y){
		return true;
	}
	return false;
}