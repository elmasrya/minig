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
