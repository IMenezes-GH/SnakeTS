import { Body, Head } from "./snake.js"

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

// CONFIG ==========================================
const MS_PER_FRAME: number = 30
canvas.height = window.innerHeight * 0.9 // SQUARE LAYOUT
canvas.width = window.innerHeight * 0.9 // SQUARE LAYOUT
// ==================================================

async function sleep(timeMS : number): Promise<any>{
    return new Promise(resolve => setTimeout(resolve, timeMS))
}

// const TESTING_SNAKE = new Head({x:canvas.width / 2, y:canvas.height / 2}, ctx)
const SNAKE_HEAD : Head = new Head({x: canvas.width / 2, y: canvas.height / 2}, ctx, 'green')
const TESTING_SNAKE = [SNAKE_HEAD, new Body({x: canvas.width / 2, y: canvas.height / 2}, ctx, 'green'), new Body({x: canvas.width / 2, y: canvas.height / 2}, ctx, 'green'), new Body({x: canvas.width / 2, y: canvas.height / 2}, ctx, 'green')]

/**
 * Main Game loop
*/
async function gameLoop(): Promise<void>{
    let loop : boolean = true
    while(loop){
        await sleep(MS_PER_FRAME)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        SNAKE_HEAD.move(SNAKE_HEAD.movementDirection)
        
        for (let i = TESTING_SNAKE.length - 1 ; i > 0; i--){
            TESTING_SNAKE[i].goTo(
                {
                    x: TESTING_SNAKE[i - 1].x, 
                    y: TESTING_SNAKE[i - 1].y
                })
            }
            

        const distanceOfWall = SNAKE_HEAD.distanceOfWall() // checks Snake head's distance from wall
        if (distanceOfWall.x <= 20 || distanceOfWall.y <= 20){
            loop = false
        } 
        
        // KEY EVENTS ========================================
        document.addEventListener(('keydown'), (event) => {
    
            const KEY: string = event.key.toUpperCase()

            switch (KEY){
                case 'D':
                case 'ARROWRIGHT':
                    SNAKE_HEAD.setMovement({x: 1, y: 0})

                    break

                case 'W':
                case 'ARROWUP':
                    SNAKE_HEAD.setMovement({x: 0, y: -1})

                    break

                case 'A':
                case 'ARROWLEFT':
                    SNAKE_HEAD.setMovement({x: -1, y: 0})

                    break

                case 'S':
                case 'ARROWDOWN':
                    SNAKE_HEAD.setMovement({x: 0, y: 1})

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