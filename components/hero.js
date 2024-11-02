var loopHero = null;

var hero = {
    top:view.height,
    left:600,
    margin: 0,
};

function autoPosition(positionActual){
    return (view.size/1200) * positionActual
}

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
        if (e.which === 39 || e.which === 68) {
                    if (action.left == true) action.left = false;
                    if (action.right == false) action.right = true;
            }
            if (e.which === 37 || e.which === 81) {
                    if(action.right == true) action.right = false;
                    if(action.left == false) action.left = true;
            }
            if (hero.left > 1 && hero.left < view.size) {
                //shoot missile
                if(e.which == 32 && !pauseBool){
                    missiles.push({
                        left: hero.left,
                        top: view.height -40,
                    })
                }
            }
    })

    // include position of hero in html element
    loopHero = () => {
        if (action.left === true && hero.left > 10  ) {
            hero.left = hero.left - 10;
        }
        if (action.right === true && hero.left < view.size - 50) {
            hero.left = hero.left + 10;
        } 
        $('#hero').css('left', view.marginLeft + hero.left)
        $('#hero').css('top', view.height-40);
    }
})