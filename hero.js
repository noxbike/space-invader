var hero = {
    top:700,
    left: 600,
    margin: 0,
};

var loopHero = null;

$(function() {
    var t;
    var action = {"right": false, "left": false}
    let view = 0;

    // stop moving to right or left depending on keyup
    $(document).keyup(function(e) {

        if(e.which === 39 || e.which === 68){
           action.right = false;
       }

       if(e.which === 37 || e.which === 81){
           action.left = false;
       };
   })

   //move right or left depending on keyboard direction
   $(document).keydown(function(e) {
        if(e.which === 39 || e.which === 68){
            if(hero.left < (view + 1098)){
            action.left = false;
            action.right = true;
            }
        }

        if(e.which === 37 || e.which === 81){
            if(hero.left > view){
                action.right = false;
                action.left = true;
            }
        };
   })

   // include position of hero in html element
   loopHero = () => {
        if(action.left === true  ) {
            if(hero.left > 40){
                hero.left = hero.left - 20;
            }
        }
        if(action.right === true ) {
            if(hero.left < 1080){
                hero.left = hero.left + 20;
            }
        }
        $('#hero').css('left', hero.left);
    }

})
