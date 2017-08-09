var Sprite = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = null;
};

Sprite.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Sprite.prototype.update = function() {

}
Sprite.prototype.collisionDetection = function(sprite) {
  var dx = sprite.x - this.x;
  var dy = sprite.y - this.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < 50) {
    return true;
  } else {
    return false;
  }
};


var Enemy = function(x, y) {
  Sprite.call(this, x, y);
  this.sprite = 'images/enemy-bug.png';
  this.speed = getRandomNumber(50, 200);
}
Enemy.prototype = Object.create(Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.speed * dt;
  if (this.x > 505) {
    this.x = 0;
  }
};

var Player = function(x, y) {
  Sprite.call(this, x, y);
  this.sprite = 'images/char-boy.png';
}
Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
  this.checkCollisions();
};

Player.prototype.checkCollisions = function() {
  /*
    allEnemies.forEach(function(i){
      if(this.checkCollisions(i)){
        this.y = 425;
        return true;
      }
    });
    */
  for (var i = 0; i < allEnemies.length; i++) {
    if (this.collisionDetection(allEnemies[i])) {
      // If player collided with enemies, set them back to the start and drop score by 50 points
      this.y = 425;

      return true;
    }

  }
  return false;
};
/*
var Player = function(){
  this.x = 200;
  this.y = 380;

  this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function(){

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
*/

Player.prototype.handleInput = function(key) {
  if (key === 'left') {
    if (this.x > 0) {
      this.x = this.x - 100;
    }
  } else if (key === 'right') {
    if (this.x < 400) {
      this.x = this.x + 100;
    }
  } else if (key === 'up') {
    if (this.y > 0) {
      this.y = this.y - 80;
    }
  } else if (key === 'down') {
    if (this.y < 380) {
      this.y = this.y + 80;
    }
  }
};



/*
// Enemies our player must avoid
var Enemy1 = function(location, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    // Loading the image by setting this.sprite to the appropriate image in the image folder (already provided)
    this.sprite = 'images/enemy-bug.png';

    // Setting the Enemy initial location (you need to implement)
    this.x = -100;
    this.y = 60 + (location-1) * 80
    // Setting the Enemy speed (you need to implement)
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates the Enemy location (you need to implement)
    this.x = this.x + this.speed * dt;

    // Handles collision with the Player (you need to implement)
    if (this.x>500) this.x = -100;
    //Add own Enemy methods as needed
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
*/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var allEnemies = [];

for (var i = 0; i < 4; i++) {
  var random_speed = getRandomNumber(10, 31) * 10;
  var random_row = getRandomNumber(1, 4);
  allEnemies[i] = new Enemy(random_row, random_speed);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var player = new Player(200, 425);
//Player.prototype = Object.create(Enemy.prototype);
//Player.prototype.constructor = Player;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
  //console.log(e);
});
