const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

// CONFIG ==========================================
const MS_PER_FRAME: number = 166

// ==================================================

async function sleep(timeMS : number): Promise<any>{
    return new Promise(resolve => setTimeout(resolve, timeMS))
}

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