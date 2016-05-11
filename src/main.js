canvas = document.getElementById('rogue');
context = canvas.getContext('2d');

//TODO: refactor uses

var BLOCK_WIDTH = 5;
var BLOCK_HEIGHT = 5;
var BLOCK_DISTANCE = 10;
var SPACE_SIZE = 15;
var BLOCKS_WIDTH  =  Math.floor(canvas.width / ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE));
var BLOCKS_HEIGHT =  Math.floor(canvas.height / ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE));

console.log(BLOCKS_WIDTH);
console.log(BLOCKS_HEIGHT);

document.addEventListener("keydown", handle_keypress);

var rooms = [];
for(var i = 0; i < BLOCKS_WIDTH; i++) {
    rooms.push([]);
}
var r1 = new room(random_range(0, BLOCKS_WIDTH - 1), random_range(0, BLOCKS_HEIGHT - 1), 5, 5);
var num_rooms = 1;
var target_num_rooms = 250;
var player = new player();

r1.spawn_links();

while(num_rooms < target_num_rooms){ 
   spawn_rooms();
   num_rooms += 1;
}

console.log(num_rooms);
player.current_room = r1;
r1.seen = true;

draw();

function spawn_rooms() {
    for(var i = BLOCKS_WIDTH - 1; i >= 0; i--){
        for(var j = BLOCKS_HEIGHT - 1; j >= 0; j--){
            if(typeof rooms[i][j] !== 'undefined'){
                rooms[i][j].spawn_links();
                return;
            }
        }
    } 
}

function draw() {
    canvas.width = canvas.width;
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < rooms.length; i++) {
        for (var j = 0; j < 10; j++) {
            if(typeof rooms[i][j] !== 'undefined'){
                rooms[i][j].draw();
                //console.log(i + " " + j);
                //console.log(rooms[i][j]);
            }
        }
      }
      player.draw();
}

function handle_keypress(e) {
    var code = e.keyCode;
    if(code === 83) {
        player.current_room.move_player("south");
    } else if(code === 68) {
        player.current_room.move_player("east");
    } else if(code === 87) {
        player.current_room.move_player("north");
    } else if(code === 65) {
        player.current_room.move_player("west");
    }
    draw();
}
