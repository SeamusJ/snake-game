import { IPosition, IVelocity } from "./snake.d";

const initialSize = 5;

export class Snake {
    head: IPosition;
    trail: IPosition[];

    private velocity: IVelocity;
    private length: number;
    private pendingTurn: Function | null = null;

    constructor(private startingPosition: IPosition, public color: string) {
        this.init();
        this.reset();
    }

    move(): void {
        this.processPendingTurn();
        this.updateTrail();
        this.advanceHead();
    }

    hasCrashedInto(snake: Snake): boolean {
        for(let segment of snake.trail){
            if(this.isAt(segment)){
                return true;
            }
        }

        return false;
    }

    reset(){
        this.head.x = this.startingPosition.x;
        this.head.y = this.startingPosition.y;

        this.length = initialSize;
        this.trail = [];
    }

    grow(): void {
        this.length++;
    }

    isAt(position: IPosition): boolean {
        return this.head.x === position.x && this.head.y === position.y;
    }

    goNorth(): void {
        this.pendingTurn = (): void => {
            if(!this.isGoingSouth()){
                this.velocity.xVelocity = 0;
                this.velocity.yVelocity = -1;
            }
        }
    }

    goEast(): void {
        this.pendingTurn = (): void => {
            if(!this.isGoingWest()){
                this.velocity.xVelocity = 1;
                this.velocity.yVelocity = 0;
            }
        }
    }

    goSouth(): void {
        this.pendingTurn = (): void => {
            if(!this.isGoingNorth()){
                this.velocity.xVelocity = 0;
                this.velocity.yVelocity = 1;
            }
        }
    }

    goWest(): void {
        this.pendingTurn = (): void => {
            if(!this.isGoingEast()){
                this.velocity.xVelocity = -1;
                this.velocity.yVelocity = 0;
            }
        }
    }

    private processPendingTurn(): void {
        if(this.pendingTurn !== null){
            this.pendingTurn();
            this.pendingTurn = null;
        }
    }

    private isGoingSouth(): boolean {
        return this.velocity.xVelocity === 0 && this.velocity.yVelocity === 1;
    }

    private isGoingNorth(): boolean {
        return this.velocity.xVelocity === 0 && this.velocity.yVelocity === -1;
    }

    private isGoingEast(): boolean {
        return this.velocity.xVelocity === 1 && this.velocity.yVelocity === 0;
    }

    private isGoingWest(): boolean {
        return this.velocity.xVelocity === -1 && this.velocity.yVelocity === 0;
    }

    private init(): void {
        this.velocity = {
            xVelocity: 0,
            yVelocity: 0
        };

        this.head = {
            x: 0,
            y: 0
        }
    }

    private advanceHead(): void {
        this.head.x += this.velocity.xVelocity;
        this.head.y += this.velocity.yVelocity;
    }

    private updateTrail(): void {
        this.addHeadPositionToTrail();

        this.removeExcessSegments();
    }

    private addHeadPositionToTrail(){
        this.trail.push({
            x: this.head.x,
            y: this.head.y
        });
    }

    private removeExcessSegments(){
        while(this.trail.length > this.length){
            this.trail.shift();
        }
    }
}