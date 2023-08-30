const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

const MS_PER_FRAME: number = 166

ctx.fillRect(0, 0, canvas.width, canvas.height)

async function sleep(timeMS : number): Promise<any>{
    return new Promise(resolve => setTimeout(resolve, timeMS))
}

async function gameLoop(){
    let gameLoop : boolean = true

    while(gameLoop){

        await sleep(MS_PER_FRAME)
    }
}

gameLoop()