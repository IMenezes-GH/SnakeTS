
interface Coordinates {
    x: number,
    y: number,
}

interface Vector {
    x: number,
    y: number
}

export class Segment{

    static height = 20
    static width = 20
    static velocity = 3

    x: number
    y: number
    ctx: any
    movement: Vector

    constructor(coordinates: Coordinates, ctx:RenderingContext){
        this.x = coordinates.x
        this.y = coordinates.y
        this.ctx = ctx
        this.ctx.fillStyle = 'green'
        this.movement = {x: 1, y: 0}
    }

    draw(){
        this.ctx.clearRect(this.x, this.y, Segment.height, Segment.width)
        this.ctx.fillRect(this.x, this.y, Segment.height, Segment.width)
    }

    move(movement: Vector){
        this.ctx.clearRect(this.x, this.y, Segment.height, Segment.width)
        this.x = this.x + this.movement.x * Segment.velocity
        this.y = this.y + this.movement.y * Segment.velocity
        this.ctx.fillRect(this.x, this.y, Segment.height, Segment.width)
    }
    
    setMovement(vector: Vector){
        this.movement = vector
    }

}