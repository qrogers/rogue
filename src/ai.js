function ai() {

	this.seek_and_attack_player = function(enemy) {
		if(are_adjacent(enemy, player)) {
			enemy.attack_enemy(player);
			return [0, 0];
		} else {
			if(enemy.x < player.x) {
				return [1, 0];
			} else if(enemy.x > player.x) {
				return [-1, 0];
			} else if(enemy.y > player.y) {
				return [0, -1];
			} else if(enemy.y < player.y) {
				return [0, 1];
			}
		}
	};

}