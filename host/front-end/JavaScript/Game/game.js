/** @type {HTMLCanvasElement} */

let canvas;
let display;

let theme = "black";

let p_bar_speed = 10;
let p_bar_height = 100;
let p_bar_width = 20;

let p_bar_color = "white";

function initializeCanvas()
{
    canvas = document.getElementById('game');
    display = canvas.getContext('2d');

    canvas.width = 1100;
    canvas.height = 720;
}

function displayBackground()
{
    display.fillStyle = theme;
    display.fillRect(0, 0, canvas.width, canvas.height);

    displayCenterBar();
}

function displayCenterBar()
{
    display.fillStyle = "white";
    display.fillRect((canvas.width / 2) - (p_bar_width / 2), 20, 10, canvas.height - 40);
}

class Bar
{
    constructor(width, height, x, y, speed, color)
    {
        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.speed = speed;

        this.color = color;
    }

    print()
    {
        display.fillStyle = p_bar_color;
        display.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUp()
    {
        if (this.y > 0)
        {
            displayBackground();
            this.y = this.y - this.speed;
            this.print();
        }
        console.log(this.y);
    }

    moveDown()
    {
        if (this.y + p_bar_height < canvas.height)
        {
            displayBackground();
            this.y = this.y + this.speed;
            this.print();
        }
    }

    getInfo()
    {
        return ([this.x, this.y]);
    }
}

window.addEventListener('keydown', (event) => 
{
    if (event.key == 'ArrowDown')
        left_player.moveDown();
    else if (event.key == 'ArrowUp')
        left_player.moveUp();

    console.log(left_player.getInfo());
    console.log(right_player.getInfo());

    right_player.print();
});

// < CODE > //

initializeCanvas();
displayBackground();

let left_player = new Bar(p_bar_width, p_bar_height, 0 + p_bar_width, (canvas.height / 2) - p_bar_height / 2, p_bar_speed, "white");
let right_player = new Bar(p_bar_width, p_bar_height, ((canvas.width - p_bar_width) - p_bar_width), ((canvas.height / 2) - p_bar_height / 2), p_bar_speed, "white");

left_player.print();
right_player.print();