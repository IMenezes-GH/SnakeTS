import {RGB, Coordinates} from '../types'

const WINDOW_SIZE = {
    HEIGHT: window.innerHeight * 0.9,
    WIDTH: window.innerWidth * 0.9
}

export class Snake{
    static body: Array<Segment> = []
    static head: Head
    static ctx: CanvasRenderingContext2D
    static tailMode: boolean = false
    
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

    static getScore(): number{
        return Snake.body.length - 5
    }

    static setColors(color : RGB) {
        Snake.body.forEach((segment) => {
            segment.setColor(color)
        })
    }
    
}

abstract class Segment{

    static height = window.innerHeight/70
    static width = window.innerHeight/70
    static velocity = window.innerHeight/180

    coordinates: Coordinates
    x: number
    y: number
    ctx: any
    center: Coordinates
    movementDirection: Coordinates
    color: string | RGB

    constructor(coordinates: Coordinates, color = 'rgb(0, 207, 151)'){
        this.coordinates = coordinates
        this.x = coordinates.x
        this.y = coordinates.y
        this.center = {
            x: this.x + Segment.width / 2,
            y: this.y + Segment.height / 2
        }
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
        
        this.coordinates = {x: this.x, y: this.y}
        this.center = {
            x: this.x + Segment.width / 2,
            y: this.y + Segment.height / 2
            }
        this.draw()
    }

    goTo(coordinates:Coordinates){
        this.coordinates = coordinates
        this.x = coordinates.x
        this.y = coordinates.y
        this.center = {
            x: this.x + Segment.width / 2,
            y: this.y + Segment.height / 2
        }

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
        // This adds the black eye on the snake's head
        Snake.ctx.fillStyle = this.color
        Snake.ctx.fillRect(this.x, this.y, Segment.height, Segment.width)
        Snake.ctx.fillStyle = 'black'
        Snake.ctx.fillRect(this.x + Segment.width * 0.2, this.y + Segment.height * 0.2, Segment.width * 0.45, Segment.height * 0.45)
    }

    die(){
        Snake.ctx.fillStyle = this.color
        Snake.ctx.fillRect(this.x, this.y, Segment.height, Segment.width)
        
        Snake.ctx.beginPath()
        Snake.ctx.strokeStyle = 'black'
        Snake.ctx.moveTo(this.x + Segment.width * 0.3, this.y + Segment.height * 0.3)
        Snake.ctx.lineTo(this.x + Segment.width * 0.7, this.y + Segment.height * 0.7)
        Snake.ctx.moveTo(this.x + Segment.width * 0.7, this.y + Segment.height * 0.3)
        Snake.ctx.lineTo(this.x + Segment.width * 0.3, this.y + Segment.height * 0.7)

        Snake.ctx.lineWidth = Segment.width * 0.2;
        Snake.ctx.stroke()
    }

    distanceOfWall(): Coordinates{
        let distance: Coordinates = {
            x: this.x >= WINDOW_SIZE.WIDTH / 2 ? WINDOW_SIZE.WIDTH - this.x : this.x + Segment.width,
            y : this.y >= WINDOW_SIZE.HEIGHT / 2 ? WINDOW_SIZE.HEIGHT - this.y : this.y + Segment.height 
        }
    
        return distance
    }
    
    distanceLesserThan(coordinates: Coordinates, compareWithValue: number = Segment.width): boolean{
        let distance: Coordinates = {
            x : this.center.x - coordinates.x >= 0 
            ? this.center.x - coordinates.x
            : coordinates.x - this.center.x,

            y : this.center.y - coordinates.y >= 0 
            ? this.center.y - coordinates.y
            : coordinates.y - this.center.y
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