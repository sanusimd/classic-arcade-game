// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.xAxis = 101;
    this.boundary = this.xAxis * 5;
    this.resetPos = -this.xAxis;
    
};

const gameOver = document.querySelector('.gameOver')
// 
const theEnemy1 = new Enemy(-101, 0, 190);
const theEnemy2 = new Enemy(-101, 83, 230);
const theEnemy3 = new Enemy(-101, 83, 260);
const theEnemy4 = new Enemy((-101*2.5), 166, 270);
// create an empty array for all enemy
const allEnemies = [];
// push the theEnemy to array 
allEnemies.push(theEnemy1, theEnemy2, theEnemy3,theEnemy4);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if the Enemy not passed boundary 
    if (this.x < this.boundary) {
        //then move enemy forward 
        // increment x by the speed * dt
        this.x += this.speed * dt;

    } else {
        //reset pos to start 
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


class superHero {
    constructor() {
        this.sprite = 'images/char-horn-girl.png';
        this.xAxis = 101;
        this.yAxis = 83;
        this.startX = this.xAxis * 2;
        this.startY = (this.yAxis * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
        
    }
    // Draw superhero sprite on current x and axis position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * update superHero's x and y properties base on input
     *
     */
    handleInput(input) {
        switch (input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.xAxis;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= this.yAxis;
                }
                break;
            case 'right':
                if (this.x < this.xAxis * 4) {
                    this.x += this.xAxis;
                }
                break;
            case 'down':
                if (this.y < this.yAxis * 4) {
                    this.y += this.yAxis;
                }
                break;
        }
    }

    update() {
        // Let Check Collision Here 
        for (let enemy of allEnemies) {
            //  check the player x and y collide with enemy 
            if (this.y === enemy.y && (enemy.x + enemy.xAxis / 2 > this.x && enemy.x < this.x + this.xAxis / 2)) {
                this.reset();
            }
        }
        // checking for winning
        // check if the player x and y reach final tile 

        if(this.y === 55){
            this.victory = true;  
            console.log('game over');
            // Add Information when the game is over 
            gameOver.innerHTML = 'You Won The Game !!!';
        }   
    }

    
    // reset superHero 
    reset() {
        // Starting x and y again 
        this.y = this.startY;
        this.x = this.startX;

    }
}
// Instance of our Superhero 
const player = new superHero();


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});