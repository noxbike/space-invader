var loopHero = null;

var hero = {
    top:view.height-40,
    left:50,
    margin: 0,
};

$(function() {
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
        if(hero.left < 4) hero.left = 4;
        if(hero.left > 96) hero.left = 96;
        
        if (e.which === 39 || e.which === 68) {
                if (action.left) action.left = false;
                if (!action.right) action.right = true;
        }
        if (e.which === 37 || e.which === 81) {
                if(action.right) action.right = false;
                if(!action.left) action.left = true;
        }
        //shoot missile
        if(e.which == 32 && !pauseBool){
            missiles.push({
                left: hero.left,
                top: view.height -40,
            })
        }
        
    })

    var setHeroLeft = () => {$('#hero').css('left',`${hero.left}%`)}

    // include position of hero in html element
    loopHero = () => {
        if(hero.left >= 4 && hero.left <= 96){
            if (action.left || action.right ) {
                hero.left += !action.right ? -1 : 1
                setHeroLeft();
            }
        }
        
    }
})