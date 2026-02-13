let hearts = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('heart-canvas');
}

function draw() {
    clear();
    
    // Create a new heart occasionally
    if (frameCount % 10 == 0) {
        hearts.push(new Heart(random(width), height + 20));
    }

    // Update and show hearts
    for (let i = hearts.length - 1; i >= 0; i--) {
        hearts[i].update();
        hearts[i].show();
        if (hearts[i].y < -50) {
            hearts.splice(i, 1);
        }
    }
}

class Heart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(10, 30);
        this.speed = random(1, 3);
        this.noiseOffset = random(1000);
    }

    update() {
        this.y -= this.speed;
        this.x += map(noise(this.noiseOffset), 0, 1, -2, 2);
        this.noiseOffset += 0.01;
    }

    show() {
        fill(230, 57, 70, 150);
        noStroke();
        beginShape();
        // Mathematical Heart Curve
        for (let a = 0; a < TWO_PI; a += 0.1) {
            let r = this.size / 15;
            let hx = 16 * pow(sin(a), 3);
            let hy = -(13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
            vertex(this.x + r * hx, this.y + r * hy);
        }
        endShape(CLOSE);
    }
}

function celebrate() {
    alert("The best outcome possible! ❤️");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}