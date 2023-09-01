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
    
}

abstract class Segment{

    static height = 16
    static width = 16
    static velocity = 8

    x: number
    y: number
    ctx: any
    movementDirection: Vector
    color: string

    constructor(coordinates: Coordinates, color = '#00CF97'){
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
}

export class BodySegment extends Segment{

    constructor(coordinates:Coordinates, color='#00CF97'){
        super(coordinates, color)
    }
}



export class Head extends Segment{
    
    constructor(coordinates:Coordinates, color='#00CF97'){
        super(coordinates, color)
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
    
    distanceLesserThan(coordinates: Coordinates, compare: number): boolean{
        let distance: Coordinates = {
            x : this.x + Segment.width / 2 - coordinates.x > 0 
            ? this.x + Segment.width / 2 - coordinates.x
            : coordinates.x - this.x - Segment.width / 2,

            y : this.y + Segment.height / 2 - coordinates.y > 0 
            ? this.y + Segment.width / 2 - coordinates.y
            : coordinates.y - this.y + Segment.width / 2 
        }
        
        return distance.x < compare && distance.y < compare
        
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
}