var ennemy = {
    top: 15,
    left: 600,
    margin: 0,
};
var loopEnnemy = null;
var ennemys = [];

$(function() {

    //dessiné l'ennemie
    function drawEnnemy(){
        $('#ennemy').html('');
        for( var ennemy = 0; ennemy < ennemys.length; ennemy++){
            $('<div/>', {class: 'ennemy', style: `top:${ennemys[ennemy].top}px; left:${ennemys[ennemy].left}px;`}).appendTo('#ennemy')
        }
    }

    //apparition de l'ennemie aléatoirement entre 100px et 1000px 
    function appearEnnemy(){
        var min=100; 
        var max=900;
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        if (ennemys.length < 3) {
            ennemys.push({
                left: random,
                top: ennemy.top
            })
        }
    }

    function moveEnnemy(){
        for( var ennemy = 0; ennemy < ennemys.length; ennemy++){
            //tant que l'ennemie n'atteint pas le bas il continue de descendre
            if (ennemys[ennemy].top < 710) {
                ennemys[ennemy].top = ennemys[ennemy].top + 2;
            }

            //une fois l'ennemie atteint le bas de l'écran il disparait et fait apparaitre un nouveau
            else {
                ennemys.splice(ennemy,1);
            }
        }
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
    }

    function ennemyDie(){
        for (var missile = 0; missile < missiles.length; missile++){
            for(var ennemy = 0; ennemy < ennemys.length; ennemy++){
                var right = ennemys[ennemy].left +90;
                var topennemy = ennemys[ennemy].top + 80;

                //if missile touch the ennemy, he dissapear with the missile
                if (missiles[missile].top <= topennemy && missiles[missile].left >= ennemys[ennemy].left && missiles[missile].left <= right){
                    ennemys.splice(ennemy,1);
                    missiles.splice(missile,1);
                }
            }
        }
    }

    loopEnnemy = () => {
        appearEnnemy();
        drawEnnemy();
        moveEnnemy();
        esquiveEnnemy();
        attackEnnemy();
        ennemyDie();
    }
})