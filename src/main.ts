import { Pellet } from "./food.js"
import { BodySegment, Head, Snake } from "./snake.js"

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

// CONFIGURATION ==========================================

const MS_PER_FRAME: number = 30
let loop: boolean = true
let gameOver: boolean = false

canvas.height = window.innerHeight * 0.9 // SQUARE LAYOUT
canvas.width = window.innerHeight * 0.9 // SQUARE LAYOUT

async function sleep(timeMS: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, timeMS))
}

// ==================================================
// SNAKE CREATION ==============================================

function createPlayer() {

    Snake.body = []
    Snake.setHead(new Head({ x: canvas.width / 2, y: canvas.height / 2 }, ctx))

    for (let i = 0; i < 4; i++) {
        Snake.addBody(new BodySegment({ x: canvas.width / 2, y: canvas.height / 2 }, ctx))
    }
}
createPlayer()
const testFood = new Pellet({x: 100, y: 100}, ctx)


// KEY EVENTS ========================================
document.addEventListener(('keydown'), (event) => {

    const KEY: string = event.key.toUpperCase()

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
            loop = false
            break

        case 'C':
            loop = true
            gameLoop()
            break

        case 'R':
            createPlayer()
            loop = true
            gameOver = false
            gameLoop()
            break

        case 'E':
            Snake.body.push(new BodySegment({ x: Snake.head.x, y: Snake.head.y }, ctx))
            break
    }
})

/**
 * Game loop events
*/
async function gameLoop(): Promise<void> {

    while (loop && !gameOver) {

        await sleep(MS_PER_FRAME)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        testFood.draw()


        for (let i = Snake.body.length - 1; i > 0; i--) {
            Snake.body[i].goTo(
                {
                    x: Snake.body[i - 1].x,
                    y: Snake.body[i - 1].y
                })
        }

        Snake.head.move()

        const distanceOfWall = Snake.head.distanceOfWall() // checks Snake head's distance from wall
        if (distanceOfWall.x <= 20 || distanceOfWall.y <= 20) {
            gameOver = true
        }
    }

    if (gameOver){
        Snake.head.die()
    }

}

gameLoop()