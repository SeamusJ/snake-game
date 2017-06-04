import { GameCanvas } from "./game-canvas";
import { IPosition } from "./snake.d";
import { Snake } from "./snake";
import { Pill } from "./pill";


export class SnakeGame {
    private gameCanvas: GameCanvas;
    private snake: Snake;
    private pill: Pill;
    private startingPosition: IPosition;

    constructor(private canvasId: string, private spaceSize: number, w: Window) {
        this.init(w);
    }

    private init(w: Window) {
        this.gameCanvas = new GameCanvas(this.canvasId, this.spaceSize);

        this.startingPosition = {
            x: Math.floor(this.gameCanvas.boardWidth / 2),
            y: Math.floor(this.gameCanvas.boardHeight / 2)
        };

        this.snake = new Snake(this.startingPosition);
        this.pill = new Pill(this.gameCanvas.boardWidth, this.gameCanvas.boardHeight);

        w.document.addEventListener("keydown",(evt: KeyboardEvent) => this.keyPush(evt));
	    w.setInterval(() => this.tick(),1000/15);
    }

    private tick(): void {
        this.snake.move();

        if(this.snake.head.x < 0) {
            this.snake.head.x = this.gameCanvas.boardWidth-1;
        }
        if(this.snake.head.x > this.gameCanvas.boardWidth-1) {
            this.snake.head.x = 0;
        }
        if(this.snake.head.y < 0) {
            this.snake.head.y= this.gameCanvas.boardHeight-1;
        }
        if(this.snake.head.y > this.gameCanvas.boardHeight-1) {
            this.snake.head.y = 0;
        }

        this.gameCanvas.context.fillStyle="black";
        this.gameCanvas.context.fillRect(0,0,this.gameCanvas.canvas.width,this.gameCanvas.canvas.height);

        this.gameCanvas.context.fillStyle="lime";
        for(var i=0;i<this.snake.trail.length;i++) {
            this.gameCanvas.context.fillRect(this.snake.trail[i].x*this.spaceSize,this.snake.trail[i].y*this.spaceSize,this.spaceSize-2,this.spaceSize-2);
            
            if(this.snake.hasCrashed()){
                this.snake.reset(this.startingPosition);
            }
        }

        if(this.snake.isAt(this.pill.position)) {
            this.snake.grow();
            this.pill.reset();
        }

        this.gameCanvas.context.fillStyle="red";
        this.gameCanvas.context.fillRect(this.pill.position.x*this.spaceSize,this.pill.position.y*this.spaceSize,this.spaceSize-2,this.spaceSize-2);
    }

    private keyPush(evt: KeyboardEvent): void {
        switch(evt.keyCode) {
            case 37:
                this.snake.goWest()
                break;
            case 38:
                this.snake.goNorth();
                break;
            case 39:
                this.snake.goEast();
                break;
            case 40:
                this.snake.goSouth();
                break;
        }
    }
}