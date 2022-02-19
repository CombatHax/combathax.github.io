let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
let pos = 300;
let move = 0;
let lvl = 1;
let enemies = [];
window.onload = function() {
    draw();
}
function draw() {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(0, 0, 1000, 600);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.beginPath();
    pos += move;
    if (pos >= 600 - 5 || pos <= 0 + 5) {
        pos -= move;
    }
    ctx.arc(500, pos, 10, 0, 360);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.beginPath();
    ctx.font = "42px Arial";
    let g = ctx.createLinearGradient(0, 0, 300, 1000);
    g.addColorStop(0.0, "red");
    g.addColorStop(0.5, "yellow");
    g.addColorStop(1.0, "green");
    ctx.fillStyle = g;
    ctx.fillText(`Level: ${Math.floor(lvl)}`, 10, 300);
    if (Math.floor(Math.random() * 300) <= lvl) {
        let dim = [(Math.floor(Math.random() * 2) - 1) * 600, Math.floor(Math.random() * (500 - 0 + 1)), 300, 100];
        enemies[enemies.length] = new Enemy(lvl, dim);
    }
    for(let i = 0; i < enemies.length; i++) {
        enemies[i].move();
    }
    window.requestAnimationFrame(draw);
}
window.onkeydown = function(event) {
    switch(event.key) {
        case "w":
            move = -5
            break;
        case "s":
            move = 5;
            break;
    }
}
class Enemy {
    speed = 0;
    dim = [];
    constructor(s, d) {
        this.speed = s;
        this.dim = d;
        if(this.dim[0] > 300) {
            this.direction = -1;
        }
        else {
            this.direction = 1;
        }
    }
    move() {
        this.dim[0] += this.speed * this.direction;
        console.log(this.dim);
        ctx.beginPath();
        ctx.rect(this.dim[0], this.dim[1], this.dim[2], this.dim[3]);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
}