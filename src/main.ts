import { Segment } from "./snake.js"

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

// CONFIG ==========================================
const MS_PER_FRAME: number = 10
canvas.height = window.innerHeight * 0.7 // SQUARE LAYOUT
canvas.width = window.innerHeight * 0.7 // SQUARE LAYOUT
// ==================================================

async function sleep(timeMS : number): Promise<any>{
    return new Promise(resolve => setTimeout(resolve, timeMS))
}

const TESTING_SNAKE = new Segment({x:0, y:0}, ctx)

/**
 * Main Game loop
 */
async function gameLoop(): Promise<void>{
    let loop : boolean = true

    while(loop){

        await sleep(MS_PER_FRAME)
        console.log(loop)
        TESTING_SNAKE.move(TESTING_SNAKE.movement)

        // KEY EVENTS ========================================
        document.addEventListener(('keydown'), (event) => {
    
            const KEY: string = event.key.toUpperCase()
    
            switch (KEY){
                case 'D':
                    TESTING_SNAKE.setMovement({x: 1, y: 0})

                    break

                case 'W':
                    TESTING_SNAKE.setMovement({x: 0, y: -1})

                    break

                case 'A':
                    TESTING_SNAKE.setMovement({x: -1, y: 0})

                    break

                case 'S':
                    TESTING_SNAKE.setMovement({x: 0, y: 1})

                    break

                // DEBUG CASES ====================
                case 'P':
                    loop = false
                    break
            }
    
        })
    }
}

gameLoop()