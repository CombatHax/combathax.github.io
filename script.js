let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
let pos = 300;
let move = 0;
let lvl = 1;
let enemies = [];
let keys = [];
let l = 0;
let t = 0;
let temp = 0;
let met = 0;
window.onload = function() {
    draw();
    l = setInterval(function() {
        lvl++;
    }, 20000 * (lvl * 0.5));
}
function draw() {
    met = 0;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(0, 0, 1000, 600);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.beginPath();
    if(pos <= 0 || pos + 10 >= 600) {
        move -= move * 2;
    }
    else {
        if(keys[0]) {
            move = -5;
        }
        else if(keys[1]) {
            move = 5;
        }
    }
    keys[0] = 0;
    keys[1] = 0;
    pos += move;
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
        let enemy = enemies[i];
        let hbox = enemy.htbox;
        if((pos >= hbox[1] && pos <= hbox[1] + hbox[3]) && (hbox[0] <= 500 && hbox[0] + hbox[2] >= 500)) {
            gameOver();
            setTimeout(function() {
                ctx.clearRect(0, 0, 1000, 600);
                enemies.length = 0;
                pos = 300;
                move = 0;
                lvl = 1;
                clearInterval(l);
                draw();
                l = setInterval(function() {
                    lvl++
                }, 20000 * (lvl * 0.5));
            }, 2000);
            return;
        }
    }
    ctx.clearRect(1000, 0, 100, 600);
    window.requestAnimationFrame(draw);
}
function gameOver() {
    ctx.clearRect(0, 0, 1000, 600);
    ctx.beginPath();
    ctx.font = "50px Arial";
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.fillText(`Game Over! Your score was ${lvl}`, 100, 400);
    ctx.beginPath();
    ctx.font = "16px Arial";
}
window.onkeydown = function(event) {
    if(event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
        keys[0] = 1;
    }
    if(event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
        keys[1] = 1;
    }
}
class Enemy {
    speed = 0;
    dim = [];
    htbox = [];
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
        ctx.beginPath();
        ctx.rect(this.dim[0], this.dim[1], this.dim[2], this.dim[3]);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.strokeStyle = "red";
        ctx.stroke();
        for(let i = 0; i < 4; i++) {
            if(i < 2) {
               this.htbox[i] = this.dim[i] - 10;
            }
            else {
                this.htbox[i] = this.dim[i] + 20;
            }
        }
        ctx.beginPath();
        ctx.rect(this.htbox[0], this.htbox[1], this.htbox[2], this.htbox[3]);
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();
    }
}