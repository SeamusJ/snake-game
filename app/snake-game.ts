import { GameCanvas } from "./game-canvas";
import { IPosition } from "./snake.d";
import { Snake } from "./snake";
import { Pill } from "./pill";

const colors: string[] = ["lime", "gold", "white", "lightskyblue", "magenta"];

export class SnakeGame {
    private snakes: Snake[];
    private pill: Pill;
    private startingPositions: IPosition[];

    constructor(private gameCanvas: GameCanvas) {
        this.init();
    }

    tick(): void {
        this.moveSnakes();
        
        this.gameCanvas.paint(this.snakes, this.pill);
    }

    handleKeyPush(evt: KeyboardEvent): void {
        switch(evt.keyCode) {
            case 37:
                this.snakes[0].goWest()
                break;
            case 38:
                this.snakes[0].goNorth();
                break;
            case 39:
                this.snakes[0].goEast();
                break;
            case 40:
                this.snakes[0].goSouth();
                break;
            case 65:
                this.snakes[1].goWest();
                break;
            case 68:
                this.snakes[1].goEast();
                break;
            case 83:
                this.snakes[1].goSouth();
                break;
            case 87:
                this.snakes[1].goNorth();
                break;
        }
    }

    private init() {
        this.setStartingPositions();

        this.createSnakes();
        this.createPill();
    }

    private createPill(): void {
        this.pill = new Pill(this.gameCanvas.boardWidth, this.gameCanvas.boardHeight);
    }

    private createSnakes(): void {
        this.snakes = [];

        for(let i = 0; i < this.startingPositions.length; i++){
            this.snakes.push(new Snake(this.startingPositions[i], colors[i % colors.length]));
        }
    }

    private setStartingPositions(): void {
        this.startingPositions = [
            {
                x: Math.floor(2* this.gameCanvas.boardWidth / 3),
                y: Math.floor(this.gameCanvas.boardHeight / 2)
            },
            {
                x: Math.floor(1 * this.gameCanvas.boardWidth / 3),
                y: Math.floor(this.gameCanvas.boardHeight / 2)
            }];
    }

    private moveSnakes(): void {
        for(let snake of this.snakes){
            this.moveSnake(snake);
        }
    }

    private moveSnake(snake: Snake): void {
        snake.move();
        this.warpIfSnakeIsPastBoundary(snake);

        if(this.snakeHasCrashed(snake)){
            snake.reset();
        }

        if(this.snakeFoundThePill(snake)){
            this.eatThePill(snake);
        }
    }

    private snakeHasCrashed(snake: Snake): boolean {
        for(let aSnake of this.snakes){
            if(snake.hasCrashedInto(aSnake)){
                return true;
            }
        }

        return false;
    }

    private warpIfSnakeIsPastBoundary(snake: Snake): void {
        if(this.snakeIsPastWestBoundary(snake)) {
            this.teleportSnakeToEastBoundary(snake);
        }

        if(this.snakeIsPastEastBoundary(snake)) {
            this.teleportSnakeToWestBoundary(snake);
        }

        if(this.snakeIsPastNorthBoundary(snake)) {
            this.teleportSnakeToSouthBoundary(snake);
        }

        if(this.snakeIsPastSouthBoundary(snake)) {
            this.teleportSnakeToNorthBoundary(snake);
        }
    }

    private teleportSnakeToNorthBoundary(snake: Snake): void {
        snake.head.y = 0;
    }

    private teleportSnakeToSouthBoundary(snake: Snake): void {
        snake.head.y= this.gameCanvas.boardHeight-1;
    }

    private teleportSnakeToWestBoundary(snake: Snake): void {
        snake.head.x = 0;
    }

    private teleportSnakeToEastBoundary(snake: Snake): void {
        snake.head.x = this.gameCanvas.boardWidth-1;
    }

    private snakeIsPastWestBoundary(snake: Snake): boolean {
        return snake.head.x < 0;
    }

    private snakeIsPastEastBoundary(snake: Snake): boolean {
        return snake.head.x > this.gameCanvas.boardWidth-1;
    }

    private snakeIsPastNorthBoundary(snake: Snake): boolean {
        return snake.head.y < 0;
    }

    private snakeIsPastSouthBoundary(snake: Snake): boolean {
        return snake.head.y > this.gameCanvas.boardHeight-1;
    }

    private snakeFoundThePill(snake: Snake): boolean {
        return snake.isAt(this.pill.position);
    }

    private eatThePill(snake: Snake): void {
        this.pill.reset();
        snake.grow();
    }
}