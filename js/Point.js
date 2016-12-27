// Point Class
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.p = {
            x: x * step + rndSign() * (rnd(0, step / 2)) - step,
            y: y * step + rndSign() * (rnd(0, step / 2)) - step
        }
    }
    draw() {

        var {
            x,
            y
        } = this;

        var pX = this.p.x;
        var pY = this.p.y;

        ctx.save();

        /*

        let O == point

        O----P
        |    |
        |    |
        Q----R

        */

        var [P, Q, R] = getPolygonPoints(this);
        var O = this;

        if (R) {

            O.opposite = R;
            P.opposite = Q;
            Q.opposite = P;
            R.opposite = O;

            var OP = new Vector(O, P);
            var PO = new Vector(P, O);
            var OQ = new Vector(O, Q);
            var QO = new Vector(Q, O);
            var RP = new Vector(R, P);
            var PR = new Vector(P, R);
            var RQ = new Vector(R, Q);
            var QR = new Vector(Q, R);

            O.angle = OP.angleWith(OQ);
            P.angle = PO.angleWith(PR);
            Q.angle = QO.angleWith(QR);
            R.angle = RP.angleWith(RQ);

            if (
                O.angle < 160 &&
                P.angle < 160 &&
                Q.angle < 160 &&
                R.angle < 160
            ) {
                var points = [O, P, Q, R];
                var polygonOne, polygonTwo;

                points.sort(function(pointOne, pointTwo) {
                    return pointTwo.angle - pointOne.angle;
                })

                ctx.moveTo(points[0].p.x, points[0].p.y);
                ctx.lineTo(points[0].opposite.p.x, points[0].opposite.p.y)
                ctx.lineTo(points[0].opposite.p.x, points[0].opposite.p.y)

                if (/[OR]/.test(points[0].name)) {

                    // Add polygon
                    var polygonOne = new Polygon(O, P, R);
                    var polygonTwo = new Polygon(O, Q, R);

                } else {

                    // Add polygon
                    var polygonOne = new Polygon(P, O, Q);
                    var polygonTwo = new Polygon(P, R, Q);

                }

                polygons.push(polygonOne);
                polygons.push(polygonTwo);

            } else {

                // Add polygon
                var polygon = new Polygon(O, P, R, Q);
                polygons.push(polygon);
            }

            // link four points
            ctx.moveTo(O.p.x, O.p.y);
            ctx.lineTo(P.p.x, P.p.y);
            ctx.lineTo(R.p.x, R.p.y);
            ctx.lineTo(Q.p.x, Q.p.y);
            ctx.closePath();
        }

        // if want to see point uncomment code below
        // ctx.fillRect(pX,pY,1,1)
        ctx.restore();
    }
}
