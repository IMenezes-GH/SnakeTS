interface Coordinates {
    x: number,
    y: number
}

abstract class Food {
    static height = 10
    static width = 10
    ctx: any
    color: string
    coordinates: Coordinates
    x: number
    y: number

    constructor(coordinates: Coordinates, ctx: RenderingContext){
        this.ctx = ctx
        this.color = 'red'
        this.coordinates = coordinates
        this.x = coordinates.x
        this.y = coordinates.y
    }

    draw(){
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.coordinates.x, this.coordinates.y, Food.height, Food.width)
    }
}

export class Pellet extends Food {
    constructor(coordinates: Coordinates, ctx: RenderingContext){
        super(coordinates, ctx)
        this.color = 'yellow'
    }

    draw(): void {
        this.ctx.fillStyle = this.color

        this.ctx.rect(this.x - 2, this.y, 8, 4)
        this.ctx.fill()

        this.ctx.rect(this.x, this.y - 2, 4, 8)
        this.ctx.fill()

    }
}