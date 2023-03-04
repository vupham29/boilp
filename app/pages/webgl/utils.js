export default class Utils{
    constructor({el, canvas}){
        this.el = el;
        this.canvas = canvas;

        this.createCanvas();
        console.log('generate instance', this);
    }

    createCanvas(){
        const CANVAS_WIDTH = 512;
        const CANVAS_HEIGHT = 512;

        this.canvas.width = CANVAS_WIDTH * devicePixelRatio;
        this.canvas.height = CANVAS_HEIGHT * devicePixelRatio;

        this.canvas.style.setProperty('width', `${CANVAS_WIDTH}px`);
        this.canvas.style.setProperty('height', `${CANVAS_HEIGHT}px`);
    }
}