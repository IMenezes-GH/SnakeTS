interface Coordinates {
    x: number,
    y: number
}

export abstract class Food {
    static height = 10
    static width = 10
    static ctx: CanvasRenderingContext2D
    
    color: string
    coordinates: Coordinates
    x: number
    y: number

    constructor(coordinates: Coordinates){
        this.color = 'red'
        this.coordinates = coordinates
        this.x = coordinates.x
        this.y = coordinates.y
    }

    draw(){
        Food.ctx.fillStyle = this.color
        Food.ctx.fillRect(this.coordinates.x, this.coordinates.y, Food.height, Food.width)
    }
}

export class Pellet extends Food {
    constructor(coordinates: Coordinates){
        super(coordinates)
        this.color = 'yellow'
    }

    draw(): void {
        Food.ctx.fillStyle = this.color

        Food.ctx.rect(this.x - 2, this.y, 8, 4)
        Food.ctx.fill()

        Food.ctx.rect(this.x, this.y - 2, 4, 8)
        Food.ctx.fill()

    }
}