import { GameCanvas } from "./game-canvas";
import { IPosition } from "./snake.d";
import { Snake } from "./snake";
import { Pill } from "./pill";

const spaceSize: number = 20;

let gameCanvas: GameCanvas;

let startingPosition: IPosition = {
    x: 10,
    y: 10
};

let snake = new Snake(startingPosition);
let pill: Pill;

window.onload = (): void => {
    gameCanvas = new GameCanvas("gc", spaceSize);
    pill = new Pill(gameCanvas.boardWidth, gameCanvas.boardHeight);

	document.addEventListener("keydown",keyPush);
	setInterval(game,1000/15);
}

function game() {
    snake.move();

	if(snake.head.x < 0) {
		snake.head.x = gameCanvas.boardWidth-1;
	}
	if(snake.head.x > gameCanvas.boardWidth-1) {
		snake.head.x = 0;
	}
	if(snake.head.y < 0) {
		snake.head.y= gameCanvas.boardHeight-1;
	}
	if(snake.head.y > gameCanvas.boardHeight-1) {
		snake.head.y = 0;
	}

	gameCanvas.context.fillStyle="black";
	gameCanvas.context.fillRect(0,0,gameCanvas.canvas.width,gameCanvas.canvas.height);

	gameCanvas.context.fillStyle="lime";
	for(var i=0;i<snake.trail.length;i++) {
		gameCanvas.context.fillRect(snake.trail[i].x*spaceSize,snake.trail[i].y*spaceSize,spaceSize-2,spaceSize-2);
		
        if(snake.hasCrashed()){
            snake.reset(startingPosition);
        }
	}

	if(snake.isAt(pill.position)) {
        snake.grow();
        pill.reset();
	}

	gameCanvas.context.fillStyle="red";
	gameCanvas.context.fillRect(pill.position.x*spaceSize,pill.position.y*spaceSize,spaceSize-2,spaceSize-2);
}

function keyPush(evt: KeyboardEvent) {
	switch(evt.keyCode) {
		case 37:
			snake.goWest()
			break;
		case 38:
			snake.goNorth();
			break;
		case 39:
			snake.goEast();
			break;
		case 40:
			snake.goSouth();
			break;
	}
}