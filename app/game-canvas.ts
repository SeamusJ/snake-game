import { Snake } from "./snake";
import { Pill } from "./pill";
import { IPosition } from "./snake.d";

export class GameCanvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    boardHeight: number;
    boardWidth: number;

    constructor(canvasElementId: string, private spaceSize: number){
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasElementId);
        this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");

        this.boardHeight = Math.floor(this.canvas.height / spaceSize);
        this.boardWidth = Math.floor(this.canvas.width / spaceSize);
    }

    paint(snake: Snake, pill: Pill): void {
        this.paintCanvasBackground();
        this.paintSnake(snake);
        this.paintPill(pill);
    }

    private paintCanvasBackground(): void {
        this.context.fillStyle="black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private paintSnake(snake: Snake): void {
        this.context.fillStyle="lime";

        this.paintSquare(snake.head);
        
        for(let segment of snake.trail){
            this.paintSquare(segment);
        }
    }

    private paintSquare(position: IPosition): void {
            this.context.fillRect(
                position.x * this.spaceSize,
                position.y * this.spaceSize,
                this.spaceSize - 2,
                this.spaceSize - 2);
    }

    private paintPill(pill: Pill): void {
        this.context.fillStyle="red";
        this.paintSquare(pill.position);
    }
}