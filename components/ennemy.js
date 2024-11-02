var ennemy = {
    top: 15,
    left: 600,
    margin: 0,
};
var loopEnnemy = null;
var ennemys = [];

$(function() {

    //apparition de l'ennemie aléatoirement entre 100px et 1000px 
    function drawEnnemy(){
        if (ennemys.length < 5) {
            ennemys.push({
                left: leftRandom(),
                top: ennemy.top
            })
        }
    }

    moveEnnemy = () => {
        ennemys = move(ennemys, 2)
    }

    //esquive de l'ennemie
    function esquiveEnnemy(){
        for( var missile = 0; missile < missiles.length; missile++){
            for( var ennemy = 0; ennemy < ennemys.length; ennemy++){
                var right = ennemys[ennemy].left +90;
                var middle = ennemys[ennemy].left +45;
                var cat = ennemys[ennemy].top + 140;

                if(missiles[missile].top <= cat  && missiles[missile].left >= middle && missiles[missile].left <= right){
                    ennemys[ennemy].left = ennemys[ennemy].left - 3;
                }
                else if(missiles[missile].top <= cat  && missiles[missile].left >= ennemys[ennemy].left && missiles[missile].left < middle){
                    ennemys[ennemy].left = ennemys[ennemy].left + 3;
                }
            }
        }     
    }

    function attackEnnemy(){
        for(var ennemy = 0; ennemy < ennemys.length; ennemy++){
            var right = ennemys[ennemy].left +333;
            var left = ennemys[ennemy].left +383;
            var rightHero = hero.left +90;
            if(hero.left <= left && rightHero >= right){
                if(missileEnnemy.length < 5){
                    missileEnnemy.push({
                        left: ennemys[ennemy].left +35,
                        top: ennemys[ennemy].top
                    })
                }
            }
        }
        setTimeout(attackEnnemy, 1000);
    }
    attackEnnemy();

    function ennemyDie(){
        for (var missile = 0; missile < missiles.length; missile++){
            for(var ennemy = 0; ennemy < ennemys.length; ennemy++){
                var right = ennemys[ennemy].left +90;
                var topennemy = ennemys[ennemy].top + 80;

                //if missile touch the ennemy, he dissapear with the missile
                if (missiles[missile].top <= topennemy && missiles[missile].left >= ennemys[ennemy].left && missiles[missile].left <= right){
                    ennemys.splice(ennemy,1);
                    missiles.splice(missile,1);
                    score += 1;
                    updateScore();
                }
            }
        }
    }

    loopEnnemy = () => {
        appears('ennemy', ennemys);
        drawEnnemy()
        moveEnnemy();
        esquiveEnnemy();
        ennemyDie();
    }
})