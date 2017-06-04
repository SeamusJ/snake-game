import { GameCanvas } from "./game-canvas";
import { IPosition } from "./snake.d";
import { Snake } from "./snake";
import { Pill } from "./pill";


export class SnakeGame {
    private snake: Snake;
    private pill: Pill;
    private startingPosition: IPosition;

    constructor(private gameCanvas: GameCanvas) {
        this.init();
    }

    tick(): void {
        this.moveSnake();
        this.gameCanvas.paint(this.snake, this.pill);
    }

    handleKeyPush(evt: KeyboardEvent): void {
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

    private init() {
        this.setStartingPosition();

        this.createSnake();
        this.createPill();
    }

    private createPill(): void {
        this.pill = new Pill(this.gameCanvas.boardWidth, this.gameCanvas.boardHeight);
    }

    private createSnake(): void {
        this.snake = new Snake(this.startingPosition);
    }

    private setStartingPosition(): void {
        this.startingPosition = {
            x: Math.floor(this.gameCanvas.boardWidth / 2),
            y: Math.floor(this.gameCanvas.boardHeight / 2)
        };
    }

    private moveSnake(): void {
        this.snake.move();
        this.warpIfSnakeIsPastBoundary();

        if(this.snake.hasCrashed()){
            this.snake.reset(this.startingPosition);
        }

        if(this.snakeFoundThePill()){
            this.eatThePill();
        }
    }

    private warpIfSnakeIsPastBoundary(): void {
        if(this.snakeIsPastWestBoundary()) {
            this.teleportSnakeToEastBoundary();
        }

        if(this.snakeIsPastEastBoundary()) {
            this.teleportSnakeToWestBoundary();
        }

        if(this.snakeIsPastNorthBoundary()) {
            this.teleportSnakeToSouthBoundary();
        }

        if(this.snakeIsPastSouthBoundary()) {
            this.teleportSnakeToNorthBoundary();
        }
    }

    private teleportSnakeToNorthBoundary(): void {
        this.snake.head.y = 0;
    }

    private teleportSnakeToSouthBoundary(): void {
        this.snake.head.y= this.gameCanvas.boardHeight-1;
    }

    private teleportSnakeToWestBoundary(): void {
        this.snake.head.x = 0;
    }

    private teleportSnakeToEastBoundary(): void {
        this.snake.head.x = this.gameCanvas.boardWidth-1;
    }

    private snakeIsPastWestBoundary(): boolean {
        return this.snake.head.x < 0;
    }

    private snakeIsPastEastBoundary(): boolean {
        return this.snake.head.x > this.gameCanvas.boardWidth-1;
    }

    private snakeIsPastNorthBoundary(): boolean {
        return this.snake.head.y < 0;
    }

    private snakeIsPastSouthBoundary(): boolean {
        return this.snake.head.y > this.gameCanvas.boardHeight-1;
    }

    private snakeFoundThePill(): boolean {
        return this.snake.isAt(this.pill.position);
    }

    private eatThePill(): void {
        this.pill.reset();
        this.snake.grow();
    }
}