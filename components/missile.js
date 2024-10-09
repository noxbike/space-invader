var loopMissile = null;
var missiles = [];
var missileEnnemy = [];

$(function() {
    function moveMissileEnnemy() {
        for ( var missile = 0; missile < missileEnnemy.length; missile++) {
            //move missile to the bottom
            if (missileEnnemy[ missile ].top < 700) {
                missileEnnemy[ missile ].top = missileEnnemy[ missile ].top + 5;
            } 
            else if (missileEnnemy[missile].top > 699 && missileEnnemy[missile].top < 751) {
                if(missileEnnemy[ missile ].left > hero.left - 35 && missileEnnemy[ missile ].left < hero.left + 45) {
                    missileEnnemy.splice(missile, 1);
                    life.pop();
                    updatelife();
                    return true;
                }
                missileEnnemy[ missile ].top = missileEnnemy[ missile ].top + 5;
            }
            
            else {
                //delete missile when it's out of screen
                missileEnnemy.splice(missile,1);
            }
        }
    }

    function moveMissile() {
        for (var missile = 0; missile < missiles.length; missile++) {
            //move the missile to the top
            if (missiles[ missile ].top > 0) {
                missiles[ missile ].top = missiles[ missile ].top - 5;
            } else {
                //delete missile when it's out of screen
                missiles.splice(missile,1);
            }
        }
    }

    //dessiné les missile
    function drawMissiles() {
        $('#missile').html('');
        for( var missile = 0; missile < missiles.length; missile++){
            $('<div/>', {class: 'missile', style: `top:${missiles[ missile ].top}px; left:${missiles[ missile ].left}px;` }).appendTo('#missile');
        }
        for( var missile = 0; missile < missileEnnemy.length; missile++){
            $('<div/>', {class: 'missileEnnemy', style: `top:${missileEnnemy[ missile ].top}px; left:${missileEnnemy[ missile ].left}px;` }).appendTo('#missile');
        }
    }

    loopMissile = () => {
        moveMissileEnnemy();
        moveMissile();
        drawMissiles();
    }
})