// import { WINDOW_SIZE } from "./main"

const WINDOW_SIZE = {
    HEIGHT: window.innerHeight * 0.9,
    WIDTH: window.innerHeight * 0.9
}

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
    movementDirection: Vector

    constructor(coordinates: Coordinates, ctx:RenderingContext){
        this.x = coordinates.x
        this.y = coordinates.y
        this.ctx = ctx
        this.ctx.fillStyle = 'green'
        this.movementDirection = {x: 1, y: 0}
    }

    draw(){
        this.ctx.clearRect(this.x, this.y, Segment.height, Segment.width)
        this.ctx.fillRect(this.x, this.y, Segment.height, Segment.width)
    }

    move(movement: Vector){
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

    distanceOfWall(){
        // if (this.x <= 0 || this.x >= WINDOW_SIZE.WIDTH){
        //     return 
        // }

        let distance = {
            x_distance : 0,
            y_distance : 0
        }

        if (this.x >= WINDOW_SIZE.WIDTH / 2){
            distance.x_distance = WINDOW_SIZE.WIDTH - this.x 
        } else {
            distance.x_distance = this.x + Segment.width
        }

        if (this.y >= WINDOW_SIZE.HEIGHT / 2){
            distance.y_distance = WINDOW_SIZE.HEIGHT - this.y 
        } else {
            distance.y_distance = this.y + Segment.height
        }

        return distance
    }

    isHitting(coordinates: Coordinates){
        if (this.x - coordinates.x <= 10 && this.y - coordinates.y <= 10){
            return true
        }
        else {
            return false
        }

    }

}