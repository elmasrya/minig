var Badguy = function(name) {
  this.name=name;
  this.health=100;
  this.attack=function(attackee) {
  return attackee.health = attackee.health -_.random(5,10);

    };
    this.special=function(attackee) {
      return attackee.health = attackee.health -_.random(15,50);

    };
  };

var Goodguy = function(options) {
  var special_pt, attack_pt;
  options =options || {};
  this.name=options.name;
  this.type=options.type;
  this.health=100;
  switch (this.type){
    case "1":
    attack_pt=[5,10];
    special_pt=[15,35];
    break;

    case "2":
    attack_pt=[5,15];
    special_pt=[15,40];
    break;

    case "3":
    attack_pt=[3,17];
    special_pt=[10,40];
    break;

  };

  this.attack=function(attackee) {

    return attackee.health = attackee.health - _.random(attack_pt[0],attack_pt[1]);
    };
  this.special=function(attackee) {
    return attackee.health = attackee.health - _.random(special_pt[0],special_pt[1]);
    };

  };
//starting the game
 var player, monster;



$('.welcome button').on('click', function (event){
    event.preventDefault();

    var char_type= $(this).attr('name'),
        char_name= $(this).text();


    player=new Goodguy({

      name:char_name,
      type:char_type
    });
      //create instances of Badguy
    monster = new Badguy('Robber');

    //get ready to fight
    $('.welcome').css("display","none");
      //set player/monster health
        $('.ggName').prepend(player.name).find('.ggHealth').text(player.health).css("color","green");
        $('.bgName').prepend(monster.name).find('.bgHealth').text(monster.health).css("color","green");





        $('.fight').css("display","block");

});

//Fight Sequence
//1. Winner is not random
//2. Health can be negative


$('#fight').on('click', function (event){

    $('#fight').css("display","none");

    setTimeout(function() {

        var attack_type=_.random(1,2);

          if (attack_type===1){
              player.attack(monster);
              }
          else {
              player.special(monster);
              }


        if (monster.health > 0) {
        $('.bgHealth').text(monster.health);
        } else {
        $('.bgHealth').text("0");
        $('.bgName').css("text-decoration","line-through").css("color", "red");
        }


    }, 2000);

    setTimeout(function() {

      var attack_bad=_.random(1,2);

        if (attack_bad===1){
          monster.attack(player);
        } else {
          monster.special(player);
        }




    if (player.health > 0) {
    $('.ggHealth').text(player.health);
    } else{
    $('.ggHealth').text("0");
    $('.ggName').css("text-decoration","line-through").css("color", "red");
    }

    $('#fight').css("display","inline");

  }, 4000);






  });



//   var intval = null;
// var pos = 0;
//
// $(document).ready(function() {
//
//
//     intval = window.setInterval(moveBg, 40);
// });
//
// function moveBg() {
//
//     pos--;
//
//     $(".fight").css({backgroundPosition: (pos *10) + "px 0px"});
// }
