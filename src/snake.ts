import {RGB, Coordinates} from '../types'

const WINDOW_SIZE = {
    HEIGHT: window.innerHeight * 0.9,
    WIDTH: window.innerHeight * 0.9
}

export class Snake{
    static body: Array<Segment> = []
    static head: Head
    static ctx: CanvasRenderingContext2D
    
    static setHead(head: Head){
        Snake.head = head
        Snake.body[0] = head
    }

    static addBody(segment: BodySegment): void{
        if (Snake.getSize() < 1) throw new Error('Snake body parts can only be added after the snake head')
        
        Snake.body.push(segment)
    }

    static getSize() : number{
        return Snake.body.length
    }

    static setColors(color : RGB) {
        Snake.body.forEach((segment) => {
            segment.setColor(color)
        })
    }
    
}

abstract class Segment{

    static height = 16
    static width = 16
    static velocity = 8

    x: number
    y: number
    ctx: any
    movementDirection: Coordinates
    color: string | RGB

    constructor(coordinates: Coordinates, color = 'rgb(0, 207, 151)'){
        this.x = coordinates.x
        this.y = coordinates.y
        this.color = color
        this.movementDirection = {x: 0, y: -1}
    }

    draw(){
        Snake.ctx.fillStyle = this.color
        Snake.ctx.fillRect(this.x, this.y, Segment.height, Segment.width)
    }

    move(){
        this.x = this.x + this.movementDirection.x * Segment.velocity
        this.y = this.y + this.movementDirection.y * Segment.velocity
        this.draw()
    }

    goTo(coordinates:Coordinates){
        this.x = coordinates.x  
        this.y = coordinates.y
        this.draw()
    }

    setColor(color:string){
        this.color = color
        Snake.ctx.fillStyle = color
    }

}

export class BodySegment extends Segment{

    constructor(coordinates:Coordinates){
        super(coordinates)
    }
}



export class Head extends Segment{
    
    constructor(coordinates:Coordinates){
        super(coordinates)
    }

    draw(){
        Snake.ctx.fillStyle = this.color
        Snake.ctx.fillRect(this.x, this.y, Segment.height, Segment.width)
        Snake.ctx.fillStyle = 'black'
        Snake.ctx.fillRect(this.x + 5, this.y + 5, 6, 4)

        // TODO: Make a cute snake tongue ?
    }

    die(){
        Snake.ctx.fillStyle = this.color
        Snake.ctx.fillRect(this.x, this.y, Segment.height, Segment.width)
        
        Snake.ctx.beginPath()
        Snake.ctx.strokeStyle = 'black'
        Snake.ctx.moveTo(this.x + 5, this.y + 5)
        Snake.ctx.lineTo(this.x + 10, this.y + 10)
        Snake.ctx.moveTo(this.x + 10, this.y + 5)
        Snake.ctx.lineTo(this.x + 5, this.y + 10)

        Snake.ctx.lineWidth = 2
        Snake.ctx.stroke()
    }

    distanceOfWall(): Coordinates{
        let distance: Coordinates = {
            x: this.x >= WINDOW_SIZE.WIDTH / 2 ? WINDOW_SIZE.WIDTH - this.x : this.x + Segment.width,
            y : this.y >= WINDOW_SIZE.HEIGHT / 2 ? WINDOW_SIZE.HEIGHT - this.y : this.y + Segment.height 
        }
    
        return distance
    }
    
    distanceLesserThan(coordinates: Coordinates, compareWithValue: number = 16): boolean{
        let distance: Coordinates = {
            x : this.x + (Segment.width / 2) - coordinates.x >= 0 
            ? this.x + (Segment.width / 2) - coordinates.x
            : coordinates.x - this.x - (Segment.width / 2),

            y : this.y + (Segment.height / 2) - coordinates.y >= 0 
            ? this.y + (Segment.height / 2) - coordinates.y
            : coordinates.y - this.y - (Segment.height / 2) 
        }

        return distance.x < compareWithValue && distance.y < compareWithValue
        
    }
    setMovement(vector: Coordinates){
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
}