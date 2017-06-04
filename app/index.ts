import { SnakeGame } from "./snake-game";
import { GameCanvas } from "./game-canvas";

const spaceSize: number = 20;
const canvasId: string = "gc";
let snakeGame: SnakeGame;

window.onload = (): void => {
    let gameCanvas = new GameCanvas(canvasId, spaceSize);
    snakeGame = new SnakeGame(gameCanvas);

    document.addEventListener("keydown", (evt: KeyboardEvent) => snakeGame.handleKeyPush(evt));
    setInterval(() => snakeGame.tick(), 1000 / 15);
}