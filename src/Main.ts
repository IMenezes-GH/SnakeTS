import { Food, Pellet } from "./Food.js"
import { BodySegment, Head, Snake } from "./Snake.js"

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!
const score = document.getElementById('score') as HTMLHeadingElement

// CONFIGURATION ==========================================

const TAILMODE_THRESHOLD: number = 15
let loop: boolean = true
let gameOver: boolean = false
let keypressDelay : number = 0

canvas.height = window.innerHeight * 0.9
canvas.width = window.innerWidth * 0.9 

ctx.scale(1, 1)

// ==================================================
// SNAKE CREATION ==============================================

function createPlayer() {
    Food.ctx = ctx
    Snake.ctx = ctx

    Snake.body = []
    Snake.setHead(new Head({ x: canvas.width / 2, y: canvas.height / 2 }))

    for (let i = 0; i < 4; i++) {
        Snake.addBody(new BodySegment({ x: canvas.width / 2, y: canvas.height / 2 }))
    }

    Food.pellet = new Pellet({
        x: (canvas.width * 0.1 + Math.random() * canvas.width * 0.8),
        y: (canvas.height * 0.1 + Math.random() * canvas.height * 0.8)
    })

    for (let i = Snake.body.length - 1; i > 0; i--) {
        Snake.body[i].goTo(
            {
                x: Snake.body[i - 1].x,
                y: Snake.body[i - 1].y
            })
    }
}
createPlayer()


// KEY EVENTS ========================================
document.addEventListener(('keydown'), (event) => {

    if (keypressDelay > 0) return

    const KEY: string = event.key.toUpperCase()
    keypressDelay += 3

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
            location.reload()
            break
    }
})

/**
 * Game loop events
*/
function gameLoop() {
    
    let frame: number = 0
    let counter: number = 0
    score.innerText = Snake.getScore().toString()
    
    function step() {
        if (loop && !gameOver) {
            frame += 1
            if (keypressDelay > 0) keypressDelay -= 1 // Allows keypress cooldown to progress

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            if (Snake.tailMode && frame % TAILMODE_THRESHOLD - Math.round(Snake.getSize() * 0.2) === 0) {
                counter += 1
                for (let i = 1; i < counter; i++) {
                    Snake.body[Snake.getSize() - i].setColor('red')
                }

                if (counter > Snake.getSize()) {
                    gameOver = true
                }
            }

            for (let i = Snake.body.length - 1; i > 0; i--) {
                Snake.body[i].goTo(
                    {
                        x: Snake.body[i - 1].x,
                        y: Snake.body[i - 1].y
                    })

                if (i > 6) {

                    if (Snake.head.distanceLesserThan(Snake.body[i].center, 10)) {

                        gameOver = true
                    }
                }
            }


            Food.pellet.draw()
            Snake.head.move()

            const distanceOfWall = Snake.head.distanceOfWall() // checks Snake head's distance from wall
            if (distanceOfWall.x <= BodySegment.height || distanceOfWall.y <= BodySegment.height) {
                gameOver = true
            }


            if (Snake.head.distanceLesserThan(Food.pellet.center)) {

                Snake.addBody(new BodySegment({ x: -1000, y: -1000 }))
                Snake.setColors(Food.pellet.color)
                canvas.style.borderColor = Food.pellet.color // Changes Snake color to eaten
                score.innerText = Snake.getScore().toString() // Sets scoreboard

                if (Snake.getScore() >= TAILMODE_THRESHOLD) {
                    Snake.tailMode = true
                    counter = 0
                }


                Food.pellet = new Pellet({
                    x: Math.floor(canvas.width * 0.1 + Math.random() * canvas.width * 0.8),
                    y: Math.floor(canvas.height * 0.1 + Math.random() * canvas.height * 0.8)
                })
            }

        }

        if (gameOver) {
            counter = 0
            loop = false
            Snake.tailMode = false
            Snake.head.die()
            return
        }
        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
}

gameLoop()