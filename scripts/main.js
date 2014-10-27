/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){

	jQuery.hotkeys = {
		version: "0.8+",

		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 188: ",", 190: ".",
			191: "/", 224: "meta"
		},

		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
			".": ">",  "/": "?",  "\\": "|"
		}
	};

	function keyHandler( handleObj ) {

		var origHandler = handleObj.handler,
			//use namespace as keys so it works with event delegation as well
			//will also allow removing listeners of a specific key combination
			//and support data objects
			keys = (handleObj.namespace || "").toLowerCase().split(" ");
			keys = jQuery.map(keys, function(key) { return key.split("."); });

		//no need to modify handler if no keys specified
		//Added keys[0].substring(0, 12) to work with jQuery ui 1.9.0
		//Added accordion, tabs and menu, then jquery ui can use keys.

			if (keys.length === 1 && (keys[0] === "" || 
			keys[0].substring(0, 12) === "autocomplete"  || 
			keys[0].substring(0, 9) === "accordion"  || 
			keys[0].substring(0, 4) === "tabs"  || 
			keys[0].substring(0, 4) === "menu")) {
			return;
		}

		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			// important to note that $.fn.prop is only available on jquery 1.6+
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				event.target.type === "text" || $(event.target).prop('contenteditable') == 'true' )) {
				return;
			}

			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt_";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl_";
			}

			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta_";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift_";
			}

			if ( special ) {
				possible[ modif + special ] = true;

			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift_" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );

(function() {
  function LoaderProxy() {
    return {
      draw: $.noop,
      fill: $.noop,
      frame: $.noop,
      update: $.noop,
      width: null,
      height: null
    };
  }

  function Sprite(image, sourceX, sourceY, width, height) {
    sourceX = sourceX || 0;
    sourceY = sourceY || 0;
    width = width || image.width;
    height = height || image.height;

    return {
      draw: function(canvas, x, y) {
        canvas.drawImage(
          image,
          sourceX,
          sourceY,
          width,
          height,
          x,
          y,
          width,
          height
        );
      },

      fill: function(canvas, x, y, width, height, repeat) {
        repeat = repeat || "repeat";
        var pattern = canvas.createPattern(image, repeat);
        canvas.fillColor(pattern);
        canvas.fillRect(x, y, width, height);
      },

      width: width,
      height: height
    };
  };

  Sprite.load = function(url, loadedCallback) {
    var img = new Image();
    var proxy = LoaderProxy();

    img.onload = function() {
      var tile = Sprite(this);

      $.extend(proxy, tile);

      if(loadedCallback) {
        loadedCallback(proxy);
      }
    };

    img.src = url;

    return proxy;
  };

  var spriteImagePath = "images/";

  window.Sprite = function(name, callback) {
    return Sprite.load(spriteImagePath + name + ".png", callback);
  };
  window.Sprite.EMPTY = LoaderProxy();
  window.Sprite.load = Sprite.load;
}());

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * <pre>
 * (x * 255).clamp(0, 255)
 * </pre>
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};
  

$(function() {
  window.keydown = {};

  function keyName(event) {
    return jQuery.hotkeys.specialKeys[event.which] ||
      String.fromCharCode(event.which).toLowerCase();
  }

  $(document).bind("keydown", function(event) {
    keydown[keyName(event)] = true;
  });

  $(document).bind("keyup", function(event) {
    keydown[keyName(event)] = false;
  });
});

  var CANVAS_WIDTH = 1300;
        var CANVAS_HEIGHT = 1300;
        var FPS = 30;

        var player = {

          x: 50,
          y: 270,
          width: 200,
          height: 180,
          draw: function() {

            canvas.fillRect(this.x, this.y, this.width, this.height);
          }
        };

        var bgVal=100;
        var ggVal=100;

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
        I.age =Math.floor(Math.random());



          I.x = 900;
          I.y = 0;
          I.xVelocity = 1;
          I.yVelocity = 2;

          I.width = 100;
          I.height = 100;

          I.inBounds = function() {
            return I.x >= 0 && I.x <= CANVAS_WIDTH &&
              I.y >= 0 && I.y <= (CANVAS_HEIGHT-1100);
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

            if(frameCount==10) {
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

          player.y = player.y.clamp(-20, CANVAS_HEIGHT - 1100);

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
                bgVal=bgVal-_.random(0,10);
                $('.bgHealth').text(bgVal);

                if (bgVal<=0)    {
                    $('.winner').css("display","block");
                    $('.fight').css("display","none");
                };

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


        player.sprite = Sprite("armyMan");


        player.draw = function() {
          this.sprite.draw(canvas, this.x, this.y);
        };



                setInterval(function() {
                  ggVal=ggVal-1;
                  $('.ggHealth').text(ggVal);


              if (ggVal<=0)    {
              $('.loser').css("display","block");
              $('.fight').css("display","none");
                        };


                }, 10000/FPS);

var end=document.getElementById('bgHealth');


var Badguy = function(name) {
  this.name=name;
  this.health=100;
  };

var Goodguy = function(options) {
  var special_pt, attack_pt;
  options =options || {};
  this.name=options.name;
  this.type=options.type;
  this.health=100;
  };


//starting the game
 var goodGuy;
 var badguy;
$('.hello button').on('click', function (event){


  $('.hello').css("display","none");
  $('.welcome').css("display","block");


});

$('.welcome button').on('click', function (event){
    event.preventDefault();

    var char_type= $(this).attr('name'),
        char_name= $(this).text();


    goodGuy=new Goodguy({

      name:char_name,
      type:char_type
    });
      //create instances of Badguy
    badguy = new Badguy('Health');

    //get ready to fight
    $('.welcome').css("display","none");
      //set goodGuy/badguy health
        $('.ggName').prepend(goodGuy.name).find('.ggHealth').text(goodGuy.health).css("color","green");
        $('.bgName').prepend(badguy.name).find('.bgHealth').text(badguy.health).css("color","green");





        $('.fight').css("display","block");

});




//Fight Sequence
//1. Winner is not random
//2. Health can be negative


var intval = null;
var pos = 0;

$(document).ready(function() {


    intval = window.setInterval(moveBg, 40);
});

function moveBg() {

    pos--;

    $(".fight").css({backgroundPosition: (pos *10) + "px 0px"});
}
