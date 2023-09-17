import Game from "./Game";
import { BodySegment } from "./Snake";

const speed = document.getElementById('speed') as HTMLElement
const size = document.getElementById('size') as HTMLElement
const fireStart = document.getElementById('fireStart') as HTMLElement
const fireFrames = document.getElementById('fireFrames') as HTMLElement

export function configHandler() {
    const config = document.getElementById("config") as HTMLElement;
    const config_nav = document.getElementById("config-nav") as HTMLElement;

    config.addEventListener('click', () => {
        config_nav.classList.toggle('config-aside-open')
    })
    
}

export function configView(){
    speed.innerText = (BodySegment.velocity).toFixed(2);
    size.innerText = (Game.NUM_SEGMENT_ADD).toString();
    fireStart.innerHTML = Game.TAILMODE_MINIMUM_SCORE.toString();
    fireFrames.innerHTML = Game.TAILMODE_FRAMES.toFixed(2);
}