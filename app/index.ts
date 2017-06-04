import { SnakeGame } from "./snake-game";

const spaceSize: number = 20;
const canvasId: string = "gc";
let snakeGame: SnakeGame;

window.onload = (): void => {
    snakeGame = new SnakeGame(canvasId, spaceSize, window);
}