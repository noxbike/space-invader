var loopMissile = null;
var missiles = [];
var missileEnnemy = [];

$(function() {
    moveMissileEnnemy = () => {
        for (let missile in missileEnnemy ) {
            //move missile to the bottom
            if (missileEnnemy[ missile ].top < view.height -30) {
                missileEnnemy[ missile ].top += 5;
            } else if (missileEnnemy[missile].top > 699 && missileEnnemy[missile].top < 751) {
                if(missileEnnemy[ missile ].left > hero.left - 35 && missileEnnemy[ missile ].left < hero.left + 45) {
                    missileEnnemy.splice(missile, 1);
                    life -=1;
                    updatelife();
                }
                missileEnnemy[ missile ].top += 5;
            } else {
                //delete missile when it's out of screen
                missileEnnemy.splice(missile,1);
            }
        }
    }

    loopMissile = () => {
        moveMissileEnnemy();
        move(missiles, -5);
        appears('missile', missiles)
        appears('missileEnnemy', missileEnnemy)
    }
})