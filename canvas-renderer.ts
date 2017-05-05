import { utils, Shape } from './utils';

export class CanvasRenderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    scale: number;
    x: number = 0;
    y: number = 0;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.scale = Math.min(this.canvas.width, this.canvas.height);


        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(shapes: Shape[]) {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.context.scale(this.scale, -this.scale);
        this.context.translate(this.x, this.y);

        for (let s of shapes) {
            this.drawShape(s);
        }
    }

    drawShape(shape: Shape) {
        this.context.save();

        this.context.transform.apply(this.context, shape.transform);
        this.context.fillStyle = 'rgba(' + utils.hsv2rgb(shape.color) + ')';
        this.context.scale(1.025, 1.025);
        
        switch(shape.shape) {
            case 'SQUARE':
                this.drawSquare();
                break;
            case 'CIRCLE':
                this.drawCircle();
                break;
            case 'TRIANGLE':
                this.drawTriangle();
                break;
        }

        this.context.restore();
    }

    drawSquare() {
        this.context.fillRect(-0.5, -0.5, 1, 1);
    }

    drawCircle() {
        this.context.beginPath();
        this.context.arc(0, 0, 0.5, 0, Math.PI * 2, false);
        this.context.fill();
    }

    drawTriangle() {
        this.context.beginPath();
        this.context.moveTo(0, 0.57735);
        this.context.lineTo(-0.5, -0.28828);
        this.context.lineTo(0.5, -0.28828);
        this.context.closePath();
        this.context.fill();
    }
}