var hero = {
    top:700,
    left: 600,
    margin: 0,
};
var loopHero = null;

$(function() {
    $('#hero').css('left', view + hero.left);
    var action = { "right": false, "left": false }

    // stop moving to right or left depending on keyup
    $(document).keyup(function(e) {

        if (e.which === 39 || e.which === 68) {
            action.right = false;
        }
        if (e.which === 37 || e.which === 81) {
            action.left = false;
        };
    })

    //move right or left depending on keyboard direction
    $(document).keydown(function(e) {
        if (e.which === 39 || e.which === 68) {
                    if (action.left == true) action.left = false;
                    if (action.right == false) action.right = true;
            }
            if (e.which === 37 || e.which === 81) {
                    if(action.right == true) action.right = false;
                    if(action.left == false) action.left = true;
            }
            if (hero.left > 10 && hero.left < 1125) {
                //shoot missile
                if(e.which == 32 && !pause){
                    missiles.push({
                        left: hero.left+10,
                        top: hero.top,
                    })
                }
            }
    })


    // include position of hero in html element
    loopHero = () => {
        if (action.left === true && hero.left > 10  ) {
            hero.left = hero.left - 10;
        }
        if (action.right === true && hero.left < 1125) {
            hero.left = hero.left + 10;
        } 
        $('#hero').css('left', view + hero.left);
    }
})