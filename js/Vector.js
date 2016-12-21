// Vector Class
class Vector {
    constructor(pointOne, pointTwo) {
        this.x = pointOne.p.x - pointTwo.p.x;
        this.y = pointOne.p.y - pointTwo.p.y;

        this.norm = Math.sqrt(
            Math.pow(this.x, 2) +
            Math.pow(this.y, 2)
        )
    }

    multiWith(vector) {
        return (
            this.x * vector.x +
            this.y * vector.y
        );
    }

    ranAngleWith(vector) {
        return Math.acos(
            this.multiWith(vector) / (this.norm * vector.norm)
        );
    }

    angleWith(vector) {
        return this.ranAngleWith(vector) / Math.PI * 180
    }
}
