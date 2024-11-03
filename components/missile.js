var loopMissile = null;
var missiles = [];
var missileEnnemy = [];

$(function() {
    moveMissileEnnemy = () => {
        missileEnnemy = move(missileEnnemy, 5);
        missileEnnemy = dammage(missileEnnemy, 1);
    }

    loopMissile = () => {
        moveMissileEnnemy();
        move(missiles, -5);
        appears('missile', missiles)
        appears('missileEnnemy', missileEnnemy)
    }
})