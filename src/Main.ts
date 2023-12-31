import { Food, Pellet } from "./Food.js"
import { Head, Snake } from "./Snake.js"
import Game from "./Game.js"
import { configHandler, configView } from "./Config.js"

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!
const title = document.getElementById("title") as HTMLElement

// CONFIGURATION ==========================================

canvas.height = window.innerHeight * 0.9
canvas.width = window.innerWidth * 0.9

ctx.scale(1, 1)

configHandler();

// SNAKE CREATION =========================================

function createPlayer() {
    Food.ctx = ctx
    Snake.ctx = ctx
    Game.ctx = ctx

    Snake.body = []
    Snake.setHead(new Head({ x: canvas.width / 2, y: canvas.height / 2 }))
    Snake.addBody(4);

    Food.pellet = new Pellet()
}
createPlayer()


function gameLoop() {
    
    function step() {
        if (Game.loop && !Game.lost) {
            
            Game.updateScore();
            Game.addFrame();
            Game.clear();
            
            configView()

            Game.tailModeEventHandler();
            
            Snake.moveBody(); // Move full body first
            Snake.head.move(); // Move head second
            Snake.wallCollisionHandler(); // checks if snake has hitt the wall
            
            Food.pellet.draw();
            
            if (Snake.head.distanceLesserThan(Food.pellet.center)) {
                
                Snake.addBody(Game.NUM_SEGMENT_ADD)
                Snake.setColors(Food.pellet.color)
                
                Game.tailModeStart();
                Game.subTailModeFrames();
                
                canvas.style.borderColor = Food.pellet.color; // Changes Snake color to eaten
                title.style.color =  Food.pellet.color;

                Food.pellet = new Pellet();
            }
            
        }

        window.requestAnimationFrame(step)
    }
    
    window.requestAnimationFrame(step)
}

Game.ADD_KEY_EVENTS()
gameLoop()