export class GameCanvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    boardHeight: number;
    boardWidth: number;

    constructor(canvasElementId: string, spaceSize: number){
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasElementId);
        this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");

        this.boardHeight = Math.floor(this.canvas.height / spaceSize);
        this.boardWidth = Math.floor(this.canvas.width / spaceSize);
    }
}