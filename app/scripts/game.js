
//   var Badguy = function(name) {
//   this.name=name;
//   this.health=100;
//   this.attack=function(attackee) {
//   return attackee.health = attackee.health -_.random(5,10);
//
//     };
//     this.special=function(attackee) {
//       return attackee.health = attackee.health -_.random(15,50);
//
//     };
//   };
//
// var Goodguy = function(options) {
//   var special_pt, attack_pt;
//   options =options || {};
//   this.name=options.name;
//   this.type=options.type;
//   this.health=100;
//   switch (this.type){
//     case "1":
//     attack_pt=[5,10];
//     special_pt=[15,35];
//     break;
//
//     case "2":
//     attack_pt=[5,15];
//     special_pt=[15,40];
//     break;
//
//     case "3":
//     attack_pt=[3,17];
//     special_pt=[10,40];
//     break;
//
//   };
//
//   this.attack=function(attackee) {
//
//     return attackee.health = attackee.health - _.random(attack_pt[0],attack_pt[1]);
//     };
//   this.special=function(attackee) {
//     return attackee.health = attackee.health - _.random(special_pt[0],special_pt[1]);
//     };
//
//   };
// //starting the game

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

    var queryParams, playerName, bguy;
    queryParams=getUrlVars();

    playerName=queryParams["player"];
    bguy=queryParams["bguy"];



//
//
//




        // $('.ggName').prepend(player.name).find('.ggHealth').text(player.health).css("color","green");
        // $('.bgName').prepend(monster.name).find('.bgHealth').text(monster.health).css("color","green");








//
// //Fight Sequence
// //1. Winner is not random
// //2. Health can be negative
//
//
// $('#fight').on('click', function (event){
//
//     $('#fight').css("display","none");
//
//     setTimeout(function() {
//
//         var attack_type=_.random(1,2);
//
//           if (attack_type===1){
//               player.attack(monster);
//               }
//           else {
//               player.special(monster);
//               }
//
//
//         if (monster.health > 0) {
//         $('.bgHealth').text(monster.health);
//         } else {
//         $('.bgHealth').text("0");
//         $('.bgName').css("text-decoration","line-through").css("color", "red");
//         }
//
//
//     }, 2000);
//
//     setTimeout(function() {
//
//       var attack_bad=_.random(1,2);
//
//         if (attack_bad===1){
//           monster.attack(player);
//         } else {
//           monster.special(player);
//         }
//
//
//
//
//     if (player.health > 0) {
//     $('.ggHealth').text(player.health);
//     } else{
//     $('.ggHealth').text("0");
//     $('.ggName').css("text-decoration","line-through").css("color", "red");
//     }
//
//     $('#fight').css("display","inline");
//
//   }, 4000);
//   });
//
//
//

var intval = null;
var pos = 0;

$(document).ready(function() {


    intval = window.setInterval(moveBg, 40);
});

function moveBg() {

    pos--;

    $("#gameCan").css({backgroundPosition: (pos *10) + "px 0px"});
}





/*end of the js*/

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
        canvasElement.appendTo('body');


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
