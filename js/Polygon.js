// Polygon Class
class Polygon {
    constructor() {
        this.points = [...arguments];
    }

    draw(fillColor) {
        var {
            points
        } = this;

        ctx.beginPath();

        points.forEach(function(point, index) {
            var {
                p: {
                    x,
                    y
                }
            } = point;

            if (index == 0) {

                ctx.moveTo(x, y);

            } else {

                ctx.lineTo(x, y);

                if (index == points.length - 1) {
                    ctx.closePath();
                }
            }
        })

        ctx.fillStyle = fillColor;
        ctx.strokeStyle = fillColor;

        ctx.fill();
        ctx.stroke();
    }
}
