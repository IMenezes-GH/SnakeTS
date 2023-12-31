import { Coordinates, RGB } from "../types"

export abstract class Food {
    static height = window.innerHeight/150
    static width = window.innerHeight/150
    static ctx: CanvasRenderingContext2D
    static pellet: Food

    color: RGB = 'rgb(255, 255, 255)'
    coordinates: Coordinates
    center: Coordinates

    constructor(coordinates: Coordinates){
        this.coordinates = coordinates
        this.center = {
            x: this.coordinates.x + Food.width / 2,
            y: this.coordinates.y + Food.height / 2
        }
    }

    draw(){
        Food.ctx.fillStyle = this.color
        Food.ctx.fillRect(this.coordinates.x, this.coordinates.y, Food.height, Food.width)
    }
}

export class Pellet extends Food {
    constructor(coordinates: Coordinates = {x: Math.floor(window.innerWidth * 0.8 * 0.1 + Math.random() * window.innerWidth * 0.8 * 0.8), y:Math.floor(window.innerHeight * 0.8 * 0.1 + Math.random() * window.innerHeight * 0.8 * 0.8)}){
        super(coordinates)
        this.color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    }

    draw(): void {
        Food.ctx.fillStyle = this.color
        Food.ctx.beginPath()

        Food.ctx.rect(this.coordinates.x, this.coordinates.y, Food.width, Food.height)
        Food.ctx.fill()

        Food.ctx.rect(this.coordinates.x, this.coordinates.y, Food.width, Food.height)
        Food.ctx.fill()
        Food.ctx.closePath()
    }
}