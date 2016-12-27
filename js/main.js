var oC = document.querySelector('canvas');
var ctx = oC.getContext('2d');

var imageArray = null;

// space size between point
var step = 30;
var points = [];
var polygons = [];

var oImage = new Image();

function init(precision,imageSrc){
    points = [];
    polygons = [];
    step = precision;

    oImage.src = imageSrc;
}

// resize the canvas and redraw all pixels
oImage.onload = function() {
    oC.width = oImage.width;
    oC.height = oImage.height;

    ctx.drawImage(oImage, 0, 0)


    // generate low-poly trangle points
    for (let col = 0; col < oC.width / step + 3; col++) {
        for (let row = 0; row < oC.height / step + 3; row++) {
            !points[row] && (points[row] = []);
            points[row][col] = new Point(col, row);
        }
    }

    points.forEach(function(row) {
        row.forEach(function(singlePoint) {
            singlePoint.draw();
        })
    })

    // uncomment line below to see the lowpoly grid
    // ctx.stroke();

    imageArray = ctx.getImageData(0, 0, oC.width, oC.height);

    polygons.forEach((polygon) => {
        fillColor(polygon);
    })
}

/*
 * return related three points with given point
 * @param point Point
 * @return points Array
 * @demo    
 *      [(→)Point,(↓)Point,(↘️)Point]
 */

function getPolygonPoints(pointO) {

    /*

    let O == point

    O----P
    |    |
    |    |
    Q----R

    */

    var lastRow = !points[pointO.y + 1];
    var lastCol = !points[pointO.y][pointO.x + 1];

    var pointP = lastRow ? null : points[pointO.y + 1][pointO.x];
    var pointQ = lastCol ? null : points[pointO.y][pointO.x + 1];
    var pointR = (lastRow || lastCol) ? null : points[pointO.y + 1][pointO.x + 1]

    pointO.name = "O";
    if (pointP) pointP.name = "P";
    if (pointQ) pointQ.name = "Q";
    if (pointR) pointR.name = "R";

    return [pointP, pointQ, pointR];
}


/*
 * avgColor
 * @param colorArray array
 * @demo
 *  [[r,g,b,a],[r,g,b,a]]
 * @return color String
 * @demo
 *  "#029df9" / "rgb(0,12,21)"
 */

function avgColor(colorArray) {
    var r = 0;
    var g = 0;
    var b = 0;
    var a = 0;

    var count = 0;

    var hasUndefined = false;

    colorArray.forEach(function(color) {

        if (!color[3]) {
            hasUndefined = true;
            return;
        }

        r += Number(color[0]);
        g += Number(color[1]);
        b += Number(color[2]);
        a += Number(color[3]);

        count++;
    })

    r = Math.round(r / count);
    g = Math.round(g / count)
    b = Math.round(b / count)
    a = a / count / 255;

    var colorStr = `rgba(${r},${g},${b},${a})`;

    // invalid value
    if (/NaN/.test(colorStr)) {
        return 'white';
    }

    return colorStr;
}

/*
 * fill colors to polygon
 * @param polygon Polygon
 */

function fillColor(polygon) {
    var {
        width,
        height
    } = imageArray;

    var areaPoints = getPoints(polygon);
    var colorArray = [];

    areaPoints.forEach(function({
        x,
        y: [y1, y2]
    }) {

        if (x < 0 || y2 < 0) {
            return;
        }

        for (var y = y1; y < y2; y++) {

            var r = imageArray.data[(y * width + x) * 4];
            var g = imageArray.data[(y * width + x) * 4 + 1];
            var b = imageArray.data[(y * width + x) * 4 + 2];
            var a = imageArray.data[(y * width + x) * 4 + 3];

            colorArray.push([r, g, b, a]);
        }
    })

    polygon.draw(avgColor(colorArray));
}
