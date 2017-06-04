import { IPosition } from "./snake.d";

export class Pill {
    position: IPosition;

    constructor(private boardWidth: number, private boardHeight: number) {
        this.init();
        this.reset();
    }

    reset(): void {
        this.position.x = Math.floor(Math.random() * this.boardWidth);
        this.position.y = Math.floor(Math.random() * this.boardHeight);
    }

    private init(): void {
        this.position = {
            x: 0,
            y: 0
        };
    }
}