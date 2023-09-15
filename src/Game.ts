import { Snake } from "./Snake";

const score = document.getElementById('score') as HTMLHeadingElement

export default class Game {

    static ctx: CanvasRenderingContext2D;
    set ctx(context: CanvasRenderingContext2D) {
        Game.ctx = context;
    }

    static keypressDelay: number = 0;
    static TAILMODE_MINIMUM_SCORE: number = 15; // Number of minimum points for TailMode to start
    static TAILMODE_FRAMES: number = 20; // Number of frames needed to have passed for TailMode to progress
    static TAILMODE_COLOR = 'red';
    static NUM_SEGMENT_ADD = 5;


    static loop: boolean = true;
    static lost: boolean = false;

    static frame: number = 0; // Number of frames that has passed during the game
    static fireCounter: number = 0; // number of segments taken during TailMode

    static updateScore(): void { score.innerText = Snake.getScore().toString() }
    static clear(): void { Game.ctx.clearRect(0, 0, window.innerWidth * 0.9, window.innerHeight * 0.9) }
    static pause(): void { Game.loop = false }
    static unpause(): void { Game.loop = true }
    static addFrame(): void { 
        Game.frame += 1 
        if (Game.keypressDelay > 0) Game.keypressDelay -= 1 // Allows keypress cooldown to progress
    }
    static tailModeStart(): void {
        if (Snake.getScore() >= Game.TAILMODE_MINIMUM_SCORE) {
            Snake.tailMode = true
            Game.fireCounter = 0
        }
    }
    static subTailModeFrames(): void {
        if (Game.TAILMODE_FRAMES > 1 && Snake.getSize() % 5 === 0) Game.TAILMODE_FRAMES -= 1;
    }
    static addFireCounter(): void { Game.fireCounter += 1 }
    static burnTail(): void {
        for (let i = 1; i < Game.fireCounter; i++) {
            Snake.body[Snake.getSize() - i].setColor(Game.TAILMODE_COLOR); // Burns tail 
        }
    }
    static tailModeEventHandler(): void {

        if (Snake.tailMode && Game.frame % Game.TAILMODE_FRAMES === 0) {

            Game.addFireCounter();
            Game.burnTail();

            if (Game.fireCounter > Snake.getSize()) { Game.gameOver() }
        }
    }

    static gameOver(): void {
        Game.lost = true;
        Game.loop = false;

        Game.frame = 0;
        Game.fireCounter = 0;
        Game.TAILMODE_FRAMES = 0;
    }

    static ADD_KEY_EVENTS(callback: CallableFunction): void {
        document.addEventListener(('keydown'), (event) => {

            if (Game.keypressDelay > 0) return

            const KEY: string = event.key.toUpperCase()
            Game.keypressDelay += 3

            switch (KEY) {
                case 'D':
                case 'ARROWRIGHT':
                    Snake.head.setMovement({ x: 1, y: 0 })

                    break

                case 'W':
                case 'ARROWUP':
                    Snake.head.setMovement({ x: 0, y: -1 })

                    break

                case 'A':
                case 'ARROWLEFT':
                    Snake.head.setMovement({ x: -1, y: 0 })

                    break

                case 'S':
                case 'ARROWDOWN':
                    Snake.head.setMovement({ x: 0, y: 1 })

                    break

                // DEBUG CASES ========================================
                case 'P':
                    Game.pause()
                    break

                case 'C':

                    if (!Game.loop) {
                        Game.unpause()
                        callback()
                    }

                    break

                case 'R':
                    location.reload()
                    break
            }
        })
    }
}