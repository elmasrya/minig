  var CANVAS_WIDTH = 1300;
        var CANVAS_HEIGHT = 1300;
        var FPS = 30;

        var player = {
          color: "#00A",
          x: 50,
          y: 270,
          width: 200,
          height: 180,
          draw: function() {
            canvas.fillStyle = this.color;
            canvas.fillRect(this.x, this.y, this.width, this.height);
          }
        };

        var bgVal=100;

        var playerBullets = [];

        function Bullet(I) {
          I.active = true;

          I.xVelocity = I.speed ;
          I.yVelocity = 0;
          I.width = 3;
          I.height = 3;
          I.color = "#000";

          I.inBounds = function() {
            return I.x >= 0 && I.x <= CANVAS_WIDTH &&
              I.y >= 0 && I.y <= CANVAS_HEIGHT;
          };

          I.draw = function() {
            canvas.fillStyle = this.color;
            canvas.fillRect(this.x, this.y, this.width, this.height);
          };

          I.update = function() {
            I.x += I.xVelocity;
            I.y += I.yVelocity;

            I.active = I.active && I.inBounds();
          };

          I.explode = function() {
            this.active = false;

            // Extra Credit: Add an explosion graphic
          };

          return I;
        }

        enemies = [];

        function Enemy(I) {
          I = I || {};

          I.active = true;
          I.age =Math.floor(Math.random() * 8);

          I.color = "#A2B";

          I.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
          I.y = 0;
          I.xVelocity = 0;
          I.yVelocity = 5;

          I.width = 200;
          I.height = 200;

          I.inBounds = function() {
            return I.x >= 0 && I.x <= CANVAS_WIDTH &&
              I.y >= 0 && I.y <= (CANVAS_HEIGHT-1000);
          };

          I.sprite = Sprite("nuclearTruck");

          I.draw = function() {
            this.sprite.draw(canvas, this.x, this.y);
          };

          I.update = function() {
            I.x += I.xVelocity;
            if (enemyDirection==0) {
              I.y += I.yVelocity;
            } else {
              I.y -= I.yVelocity;
            }


            I.xVelocity = 3 * Math.sin(I.age * Math.PI / 64);

            I.age++;


            I.active = I.active && I.inBounds();
            if (!I.active) {
              if(enemyDirection==0){
                enemyDirection=1;
                } else {
                  enemyDirection=0;
                }

              }

          };

          I.explode = function() {


            this.active = false;
            // Extra Credit: Add an explosion graphic
          };

          return I;
        };

        var canvasElement = $("<canvas   id='gameCan' width='" + CANVAS_WIDTH +
          "' height='" + CANVAS_HEIGHT + "'></canvas");
        var canvas = canvasElement.get(0).getContext("2d");
        canvasElement.appendTo('.fight');


        var enemyDirection=0;
        var frameCount=0;


        setInterval(function() {
          update();
          draw();
        }, 1000/FPS);

        function update() {
          if(keydown.s) {

            if(frameCount==5) {
              player.shoot();
              frameCount=0;

            }

            else {
              frameCount++;
            }

          }

          if(keydown.a) {
            player.y -= 5;
          }

          if(keydown.d) {
            player.y += 5;
          }

          player.y = player.y.clamp(0, CANVAS_HEIGHT - 1000);

          playerBullets.forEach(function(bullet) {
            bullet.update();
          });

          playerBullets = playerBullets.filter(function(bullet) {
            return bullet.active;
          });

          enemies.forEach(function(enemy) {
            enemy.update();
          });

          enemies = enemies.filter(function(enemy) {
            return enemy.active;
          });

          handleCollisions();

          if(enemies.length ==0) {
            enemies.push(Enemy());
          }
        }

        player.shoot = function() {


          var bulletPosition = this.midpoint();
// setInterval(function() {
          playerBullets.push(Bullet({
            speed: 5,
            x: bulletPosition.x,
            y: bulletPosition.y
          }));


      // }, 2000/FPS);

    };



        player.midpoint = function() {
          return {
            x: this.x + this.width+30,
            y: this.y + this.height/2
          };
        };

        function draw() {
          canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          player.draw();

          playerBullets.forEach(function(bullet) {
            bullet.draw();
          });

          enemies.forEach(function(enemy) {
            enemy.draw();
          });
        }

        function collides(a, b) {
          return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
        }

        function handleCollisions() {
          playerBullets.forEach(function(bullet) {
            enemies.forEach(function(enemy) {
              if(collides(bullet, enemy)) {
                enemy.explode();
                bullet.active = false;
                bgVal=bgVal-10;
                $('.bgHealth').text(bgVal);
              }
            });
          });

          enemies.forEach(function(enemy) {
            if(collides(enemy, player)) {
              enemy.explode();
              player.explode();
            }
          });
        }

        player.explode = function() {
          this.active = false;
          // Extra Credit: Add an explosion graphic and then end the game
        };

        player.sprite = Sprite("tank");

        player.draw = function() {
          this.sprite.draw(canvas, this.x, this.y);
        };
