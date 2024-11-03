var ennemy = {
    top: 15,
    left: 50,
    margin: 0,
};
var loopEnnemy = null;
var ennemys = [];

$(function() {

    //apparition de l'ennemie aléatoirement entre 100px et 1000px 
    function drawEnnemy(){
        if (ennemys.length < 4) {
            ennemys.push({
                left: leftRandom(),
                top: ennemy.top
            })
        }
    }

    moveEnnemy = () => {
        ennemys = move(ennemys, 2);
        ennemys = dammage(ennemys, 2);
    }

    //esquive de l'ennemie
    function esquiveEnnemy(){
        for( var missile = 0; missile < missiles.length; missile++){
            for( var ennemy = 0; ennemy < ennemys.length; ennemy++){
                var right = ennemys[ennemy].left +10;
                var middle = ennemys[ennemy].left +10;
                var cat = ennemys[ennemy].top + 100;

                if(missiles[missile].top <= cat  && missiles[missile].left >= middle && missiles[missile].left <= right){
                    ennemys[ennemy].left = ennemys[ennemy].left - 0.5;
                }
                else if(missiles[missile].top <= cat  && missiles[missile].left >= ennemys[ennemy].left && missiles[missile].left < middle){
                    ennemys[ennemy].left = ennemys[ennemy].left + 0.5;
                }
            }
        }     
    }

    function attackEnnemy(){
        for(let ennemy in ennemys) {
            var right = ennemys[ennemy].left +4;
            var left = ennemys[ennemy].left +4;
            var rightHero = hero.left;
            if(hero.left <= left && rightHero >= right){
                if(missileEnnemy.length < 5){
                    missileEnnemy.push({
                        left: ennemys[ennemy].left,
                        top: ennemys[ennemy].top
                    })
                }
            }
        }
        setTimeout(attackEnnemy, 500);
    }
    attackEnnemy();

    function ennemyDie(){
        for (let missile in missiles){
            for(let ennemy in ennemys){
                let bullet = missiles[missile];
                let target = ennemys[ennemy];
                let right = target.left + 4;
                let left = target.left - 4;
                let top = target.top + 20;

                //if missile touch the ennemy, he dissapear with the missile
                if (bullet.top <= top && bullet.left >= left && bullet.left <= right){
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