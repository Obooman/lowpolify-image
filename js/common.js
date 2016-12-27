// random + or -
function rndSign() {
    return Math.random() > 0.5 ? 1 : -1;
}

// Get random int number
function rnd(n, m) {
    return parseInt(Math.random() * (m - n) + n);
}
