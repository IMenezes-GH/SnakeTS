interface Coordinates {
    x: number,
    y: number
}

abstract class food {
    static height = 10
    static width = 10
    ctx: any
    color: string
    coordinates: Coordinates

    constructor(coordinates: Coordinates, ctx: RenderingContext){
        this.ctx = ctx
        this.color = 'red'
        this.coordinates = coordinates
    }

    draw(){
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.coordinates.x, this.coordinates.y, food.height, food.width)
    }
}

export class Pellet extends food {
    constructor(coordinates: Coordinates, ctx: RenderingContext){
        super(coordinates, ctx)
        this.color = 'yellow'
    }
}