$(function(){

    var hero = {
        top:700,
        left: 1000
    };

    var ennemy = {
        top: 15,
        left: 1000
    };

    var missiles = [];
    var ennemys = [];

    $(document).keydown(function(e){
       
        //deplacement vers la droite
        if(e.which === 39){
            console.log('left');
            if(hero.left <= 1380){
                hero.left = hero.left + 10;
                moveHero(); 
            }
        }

        //deplacement vers la gauche
        if(e.which === 37){
            if(hero.left >= 500 ){
                hero.left = hero.left - 10;
                moveHero(); 
            }
        };
       
        //tir de missile
        if(e.which == 32){
            console.log('fire');
            missiles.push({
                left: hero.left - 355,
                top: hero.top
            })
            drawMissiles();
        }
        
    })

    function moveHero() {
          $('#hero').css('left', hero.left);
    }

    function moveEnnemy(){
        for( var ennemy = 0; ennemy < ennemys.length; ennemy++){

            //tant que l'ennemie n'atteint pas le bas il continue de descendre
            if(ennemys[ennemy].top < 710)
            {
                ennemys[ennemy].top = ennemys[ennemy].top + 2;
            }

            //une fois l'ennemie atteint le bas de l'écran il disparait et fait apparaitre un nouveau
            else
            {
                ennemys.splice(0,1);
                appearEnnemy();
            }
        }
    }

    function moveMissile(){
        for( var missile = 0; missile < missiles.length; missile++){
            //si le missile est tiré, le dirigé vers le haut
            if(missiles[missile].top > 0)
            {
                missiles[missile].top = missiles[missile].top - 5;
                var right = ennemys[0].left +90;

                //si le missile est a la hauteur de l'ennemi et inferieur a la position de l'aile droite et superieur a l'aile gauche, le missile et l'ennemie disparait
                //ensuite faire reaparaitre un nouvel ennemie
                if(missiles[missile].top <= ennemys[0].top && missiles[missile].left >= ennemys[0].left && missiles[missile].left <= right){
                    var n = missile + 1;
                    missiles.splice(missile,n);
                    ennemys.splice(0,1);
                    appearEnnemy();
                } 
            }
            else
            {
                //missile supprimé une fois atteint le haut de l'écran
                missiles.splice(0,1);
            }
        }
    }

    function drawEnnemy(){
        $('#ennemy').html('');
        for( var ennemy = 0; ennemy < ennemys.length; ennemy++){
            $('<div/>', {class: 'ennemy', style: `top:${ennemys[ennemy].top}px; left:${ennemys[ennemy].left}px;`}).appendTo('#ennemy')
        }
    }

    function drawMissiles(){
        $('#missile').html('');
        for( var missile = 0; missile < missiles.length; missile++){
            $('<div/>', {class: 'missile', style: `top:${missiles[missile].top}px; left:${missiles[missile].left}px;` }).appendTo('#missile');
        }
        
    }

    function esquiveEnnemy(){
        for( var missile = 0; missile < missiles.length; missile++){
            for( var ennemy = 0; ennemy < ennemys.length; ennemy++){
                var right = ennemys[ennemy].left +100;
                var middle = ennemys[ennemy].left +50;
                var cat = ennemys[ennemy].top + 50;

                if(missiles[missile].top >= cat  && missiles[missile].left >= middle && missiles[ennemy].left <= right){
                    ennemys[ennemy].left = ennemys[ennemy].left - 10;
                }
                else if(missiles[missile].top >= cat  && missiles[missile].left >= ennemys[ennemy].left && missiles[ennemy].left < middle){
                    ennemys[ennemy].left = ennemys[ennemy].left + 10;
                }
            }
        }   
    }

    //apparition de l'ennemie aléatoirement entre 100px et 1000px 
    var min=100; 
    var max=900;
    function appearEnnemy(){
            var random = Math.floor(Math.random() * (+max - +min)) + +min;
            ennemys.push({
                left: random,
                top: ennemy.top
            })
    }
    appearEnnemy();

    function gameLoop(){
        setTimeout(gameLoop , 25)
        esquiveEnnemy();
        moveEnnemy();
        drawEnnemy();
        moveMissile();
        drawMissiles();
    }
    gameLoop();

})