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
    attack_pt=10;
    special_pt=20;
    break;

    case "2":
    attack_pt=15;
    special_pt=25;
    break;

    case "3":
    attack_pt=5;
    special_pt=30;
    break;

  };

  this.attack=function(attackee) {

    return attackee.health = attackee.health - attack_pt;
    };
  this.special=function(attackee) {
    return attackee.health = attackee.health - special_pt;
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
    monster = new Badguy('Bowser');

    //get ready to fight
    $('.welcome').fadeOut(500, function (){
      //set player/monster health
        $('.ggName').prepend(player.name).find('ggHealth').text(player.health);
        $('.bgName').prepend(monster.name)find('bgHealth').text(monster.health);




        $('.fight').fadeIn();
});
});

//Fight Sequence
//1. Winner is not random
//2. Health can be negative

$('#fight').on('click', function (event){
    event.preventDefault();
    //console.log('working');
    var attack_type=_.random(1,2);

    if (attack_type===1){
      player.attack(monster);
    }
    //goodguy will attack the badguy
    //badguys health will decrease
    player.attack(monster);
    if (monster.health > 0) {
    $('bgHealth').text(monster.health);
    monster.attack(player);
  } else {
    $('bgHealth').text("0");
    $('#monster').css("text-decoration","line-through").css("color", "red");
    $('bgHealth').text(monster.health);
  }

    //badguy will retaliate
    //goodguys health will decrease
    monster.attack(monster);
    $('ggHealth').text(player.health);


    if (player.health <= 0) {
      //player is dead
    } else if (monster.health <= 0) {
      //monster is dead
    }


  });
