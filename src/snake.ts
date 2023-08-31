
interface Coordinates {
    x: number,
    y: number,
}

export class Segment{

    static height = 20
    static width = 20

    x: number
    y: number
    ctx: any

    constructor(coordinates: Coordinates, ctx:RenderingContext){
        this.x = coordinates.x
        this.y = coordinates.y
        this.ctx = ctx
    }

    draw(){
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.x, this.y, Segment.height, Segment.width)
    }

}