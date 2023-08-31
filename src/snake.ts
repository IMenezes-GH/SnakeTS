// import { WINDOW_SIZE } from "./main"

const WINDOW_SIZE = {
    HEIGHT: window.innerHeight * 0.9,
    WIDTH: window.innerHeight * 0.9
}

interface Coordinates {
    x: number,
    y: number,
}

// Might be redundant
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
    movementDirection: Vector
    color: string

    constructor(coordinates: Coordinates, ctx:RenderingContext, color = '#03D9FF'){
        this.x = coordinates.x
        this.y = coordinates.y
        this.color = color
        this.ctx = ctx
        this.movementDirection = {x: 0, y: -1}
    }

    draw(){

        this.ctx.fillStyle = this.color
        this.ctx.clearRect(this.x, this.y, Segment.height, Segment.width)
        this.ctx.fillRect(this.x, this.y, Segment.height, Segment.width)
    }

    move(movement: Vector){
        this.ctx.fillStyle = this.color
        this.ctx.clearRect(this.x, this.y, Segment.height, Segment.width)
        this.x = this.x + this.movementDirection.x * Segment.velocity
        this.y = this.y + this.movementDirection.y * Segment.velocity
        this.ctx.fillRect(this.x, this.y, Segment.height, Segment.width)
    }
    
    setMovement(vector: Vector){
        if (vector.x === 1 || vector.x === -1){
            if (this.movementDirection.x === 0){
                this.movementDirection = vector
            }
        }

        if (vector.y === 1 || vector.y === -1){
            if (this.movementDirection.y === 0){
                this.movementDirection = vector
            }
        }
    }

    distanceOfWall(): Coordinates{

        let distance: Coordinates = {
            x: this.x >= WINDOW_SIZE.WIDTH / 2 ? WINDOW_SIZE.WIDTH - this.x : this.x + Segment.width,
            y : this.y >= WINDOW_SIZE.HEIGHT / 2 ? WINDOW_SIZE.HEIGHT - this.y : this.y + Segment.height 
        }

        return distance
    }

    isHitting(coordinates: Coordinates): boolean{
        let distance: Coordinates = {
            x : this.x - coordinates.x > 0 ? this.x - coordinates.x - Segment.width : coordinates.x - this.x - Segment.width,
            y : this.y - coordinates.y > 0 ? this.y - coordinates.y - Segment.height : coordinates.y - this.y - Segment.height
        }

        return distance.x - Segment.velocity <= 0 && distance.y - Segment.velocity <= 0 

    }
}