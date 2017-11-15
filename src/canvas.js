// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

const gravity = 1;
const friction = 0.99;

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

addEventListener('click', function () {
    init();
});

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx; // Velocity in x
    this.dy = dy; // Velocity in y
    this.radius = radius;
    this.color = color;

    this.update = () => {
        // As soon as the ball hit the edge of the screen in y it should go up
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction; // Friction
        } else {
            // Simulate the effect of gravity
            this.dy += gravity;
        }

        // As soon as the ball hit the edge of the screen in x it should revert the velocity (right and left border)
        if (this.x + this.radius + this.dx > canvas.width ||
            this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke(); // Gives the border
        c.closePath();
    }
}

// Implementation
let ballArray;

function init() {

    ballArray = [];

    // Create 400 balls
    for (let i = 0; i < 400; i++) {

        const radius = randomIntFromRange(8, 20);
        const x = randomIntFromRange(radius, canvas.width - radius);
        const y = randomIntFromRange(0, canvas.height - radius);
        const dx = randomIntFromRange(-2, 2);
        const dy = randomIntFromRange(-2, 2);
        const color = randomColor(colors);

        // Push the new Ball into the array
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
    console.log(ballArray);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < ballArray.length; i++) {
        // Update every ball in the array
        ballArray[i].update();
    }

    //ball.update();
}

init();
animate();
