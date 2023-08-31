import { Segment } from "./snake.js"

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

// CONFIG ==========================================
const MS_PER_FRAME: number = 10
canvas.height = window.innerHeight * 0.9 // SQUARE LAYOUT
canvas.width = window.innerHeight * 0.9 // SQUARE LAYOUT
// ==================================================

async function sleep(timeMS : number): Promise<any>{
    return new Promise(resolve => setTimeout(resolve, timeMS))
}

const TESTING_SNAKE = new Segment({x:100, y:100}, ctx)

/**
 * Main Game loop
 */
async function gameLoop(): Promise<void>{
    let loop : boolean = true

    while(loop){

        await sleep(MS_PER_FRAME)
        // console.log(loop)
        // console.log(TESTING_SNAKE.x, TESTING_SNAKE.y)
        const distanceOfWall = TESTING_SNAKE.distanceOfWall()

        if (distanceOfWall.x_distance <= 20 || distanceOfWall.y_distance <= 20){
            loop = false
        }

        TESTING_SNAKE.move(TESTING_SNAKE.movementDirection)

        // KEY EVENTS ========================================
        document.addEventListener(('keydown'), (event) => {
    
            const KEY: string = event.key.toUpperCase()

            switch (KEY){
                case 'D':
                case 'ARROWRIGHT':
                    TESTING_SNAKE.setMovement({x: 1, y: 0})

                    break

                case 'W':
                case 'ARROWUP':
                    TESTING_SNAKE.setMovement({x: 0, y: -1})

                    break

                case 'A':
                case 'ARROWLEFT':
                    TESTING_SNAKE.setMovement({x: -1, y: 0})

                    break

                case 'S':
                case 'ARROWDOWN':
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