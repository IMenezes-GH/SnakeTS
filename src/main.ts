import { Segment } from "./snake.js"

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

// CONFIG ==========================================
const MS_PER_FRAME: number = 166
canvas.height = window.innerHeight * 0.7 // SQUARE LAYOUT
canvas.width = window.innerHeight * 0.7 // SQUARE LAYOUT
// ==================================================

async function sleep(timeMS : number): Promise<any>{
    return new Promise(resolve => setTimeout(resolve, timeMS))
}

const test = new Segment({x:0, y:0}, ctx)
test.draw()

/**
 * Main Game loop
 */
async function gameLoop(): Promise<void>{
    let loop : boolean = true

    while(loop){

        await sleep(MS_PER_FRAME)
        console.log(loop)

        // KEY EVENTS ========================================
        document.addEventListener(('keypress'), (event) => {
    
            const KEY: string = event.key.toUpperCase()
    
            switch (KEY){
                // DEBUG CASES ====================
                case 'P':
                    loop = false
                    break
            }
    
        })
    }
}

gameLoop()