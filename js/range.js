/*
 * getPoints within a given polygon
 * @param polygon Polygon
 * @return points Array
 * @demo 
 * 		[{x:x1,y:[y1,y2]},{x:x2,y:[y1,y2]}]
 */

function getPoints(polygon) {

    var newPoints = [].concat(polygon.points);
    var pointSet = [];

    var [
        a, b, c, d
    ] = newPoints;

    // four side polygon
    if (d) {
        var polygonOne = new Polygon(a, b, c)
        var polygonTwo = new Polygon(a, c, d);

        return getPoints(polygonOne).concat(getPoints(polygonTwo));
    }

    newPoints.sort(function(a, b) {
        return a.p.x - b.p.x
    });

    /*
				· G(x2,y2)

		·E(x1,y1)	·F(x3,y3)

 	 */

    var x1 = a.p.x;
    var y1 = a.p.y;

    var x2 = b.p.x;
    var y2 = b.p.y;

    var x3 = c.p.x;
    var y3 = c.p.y;

    // get the point in (x1,y1)-(x2,y2) line whose x equals to x2
    var x4 = x2;
    var y4 = (x2 - x1) / (x1 - x3) * (y1 - y3) + y1;

    var d = new Point(0, 0);
    d.p.x = x4;
    d.p.y = y4;

    // TODO return trangetSection().concat(trangetSection());
    // Done

    var leftHalf = trangleSection(a, b, d);
    var rightHalf = trangleSection(c, b, d);

    return leftHalf.concat(rightHalf);
}

function trangleSection(pointOne, pointTwo, pointThree) {
    /*
     *      ·F
     * ·E   |
     *      ·G
     */

    var pixelArray = [];

    // point E
    var x1 = pointOne.p.x;
    var y1 = pointOne.p.y;

    // point F
    var x2 = pointTwo.p.x;
    var y2 = pointTwo.p.y;

    // point G
    var x3 = pointThree.p.x;
    var y3 = pointThree.p.y;

    // loop from leftX to rightX
    for (let x = Math.min(x1, x2); x < Math.max(x1, x2); x++) {
        var percentage = (x - x1) / (x2 - x1);

        // sort y range from small to big
        var yRange = [
            Math.ceil(percentage * (y2 - y1) + y1),
            Math.ceil(percentage * (y3 - y1) + y1)
        ].sort((a, b) => a - b);

        if (yRange[1] == yRange[0]) {
            yRange[1] += 1;
        }

        pixelArray.push({
            x,
            y: yRange
        })
    }

    return pixelArray;
}
