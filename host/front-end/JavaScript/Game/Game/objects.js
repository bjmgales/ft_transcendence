// < OBJECT > //

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
        infos.display.fillStyle = infos.bar_color;
        infos.display.fillRect(this.x, this.y, this.width, this.height);
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
        if (this.y + infos.bar_height < infos.game_height)
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

// < INFO STRUCT > //

infos = {
    canvas: null,
    display: null,

    game_width: 1100,
    game_height: 720,

    bar_speed: 10,

    bar_height: 100,
    bar_width: 20,

    separator_height: 20,
    separator_width: 10,
    separator_space: 17,

    menu_color: null,
    background_color: null,
    bar_color: null
}

// < GAME STRUCT > //

game = {
    left_player: null,
    right_player: null,

    ball: null,

    scores: [0, 0]
}