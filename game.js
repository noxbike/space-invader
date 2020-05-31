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
    var missileEnnemy = [];

    var ennemys = [];
    var t;
    var pause = false;

    $(document).keydown(function(e){
       
        //deplacement vers la droite
        if(e.which === 39){
            if(hero.left <= 1380){
                hero.left = hero.left + 20;
                moveHero(); 
            }
        }

        //deplacement vers la gauche
        if(e.which === 37){
            if(hero.left >= 500 ){
                hero.left = hero.left - 20;
                moveHero(); 
            }
        };
       
        //tir de missile
        if(e.which == 32){
            missiles.push({
                left: hero.left - 355,
                top: hero.top
            })
            drawMissiles();
        }

        if(e.which == 27){
            menu();
        }

        
        if(e.which == 13){
            console.log('pause');
            pause = !pause;
            var txtpause = $('<h1></h1>').text('Pause');
            txtpause.attr('class', 'pause');
            if(pause){
                txtpause.appendTo('#view'); 
                clearTimeout(t);
            }
            else{
                $('.pause').html('');
                gameLoop();
            }
        }
        
    })

    function menu(){
        clearTimeout(t);
        $('#missile').hide();
        missiles = [];
        $('#ennemy').hide();
        ennemys = [];
        $('#hero').hide();
        $('#menu').show();
    }

    function moveHero() {
          $('#hero').css('left', hero.left);
    }

    function moveEnnemy(){
        for( var ennemy = 0; ennemy < ennemys.length; ennemy++){
            //tant que l'ennemie n'atteint pas le bas il continue de descendre
            if(ennemys[ennemy].top < 710)
            {
                ennemys[ennemy].top = ennemys[ennemy].top + 2;
                if(ennemys[ennemy].top > 300  && ennemys[ennemy].top < 302){
                    appearEnnemy();
                }
            }

            //une fois l'ennemie atteint le bas de l'écran il disparait et fait apparaitre un nouveau
            else
            {
                appearEnnemy();
                ennemys.splice(ennemy,1);
            }
        }
    }
    function moveMissileEnnemy(){
        for( var missile = 0; missile < missileEnnemy.length; missile++){
            //si le missile est tiré, le dirigé vers le haut
            if(missileEnnemy[missile].top < 700)
            {
                missileEnnemy[missile].top = missileEnnemy[missile].top + 5;
            }
            else
            {
                //missile supprimé une fois atteint le haut de l'écran
                missileEnnemy.splice(missile,1);
            }
        }
    }

    function moveMissile(){
        for( var missile = 0; missile < missiles.length; missile++){
            //si le missile est tiré, le dirigé vers le haut
            if(missiles[missile].top > 0)
            {
                missiles[missile].top = missiles[missile].top - 5;
            }
            else
            {
                //missile supprimé une fois atteint le haut de l'écran
                missiles.splice(missile,1);
            }
        }
    }

    //dessiné l'ennemie
    function drawEnnemy(){
        $('#ennemy').html('');
        for( var ennemy = 0; ennemy < ennemys.length; ennemy++){
            $('<div/>', {class: 'ennemy', style: `top:${ennemys[ennemy].top}px; left:${ennemys[ennemy].left}px;`}).appendTo('#ennemy')
        }
    }

    //dessiné les missile
    function drawMissiles(){
        $('#missile').html('');
        for( var missile = 0; missile < missiles.length; missile++){
            $('<div/>', {class: 'missile', style: `top:${missiles[missile].top}px; left:${missiles[missile].left}px;` }).appendTo('#missile');
        }
        for( var missile = 0; missile < missileEnnemy.length; missile++){
            $('<div/>', {class: 'missileEnnemy', style: `top:${missileEnnemy[missile].top}px; left:${missileEnnemy[missile].left}px;` }).appendTo('#missile');
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
                    attackEnnemy();
                }
                else if(missiles[missile].top <= cat  && missiles[missile].left >= ennemys[ennemy].left && missiles[missile].left < middle){
                    ennemys[ennemy].left = ennemys[ennemy].left + 3;
                    attackEnnemy();
                }
            }
        }   
    }

    function ennemyDie(){
        for (var missile = 0; missile < missiles.length; missile++){
            for(var ennemy = 0; ennemy < ennemys.length; ennemy++){
                var right = ennemys[ennemy].left +90;
                var topennemy = ennemys[ennemy].top + 80;

                //si le missile est a la hauteur de l'ennemi et inferieur a la position de l'aile droite et superieur a l'aile gauche, le missile et l'ennemie disparait
                //ensuite faire reaparaitre un nouvel ennemie
                if(missiles[missile].top <= topennemy && missiles[missile].left >= ennemys[ennemy].left && missiles[missile].left <= right){
                    ennemys.splice(ennemy,1);
                    missiles.splice(missile,1);
                    appearEnnemy();
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
               console.log('detection');
                if(missileEnnemy.length < 2){
                    missileEnnemy.push({
                        left: ennemys[ennemy].left +35,
                        top: ennemys[ennemy].top
                    })
                    drawMissiles();
                }
            }
        }
    }

    //apparition de l'ennemie aléatoirement entre 100px et 1000px 
    function appearEnnemy(){
        var min=100; 
        var max=900;
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        if(ennemys.length < 3){
            ennemys.push({
                left: random,
                top: ennemy.top
            })
        }
        attackEnnemy();
    }
    appearEnnemy();

    $('#play').click(function(){
        $('#menu').hide();
        $('#missile').show();
        $('#ennemy').show();
        $('#hero').show();
        appearEnnemy();
        gameLoop();
    })
    
    function gameLoop(){
        t = setTimeout(gameLoop , 25)
        attackEnnemy();
        moveMissileEnnemy();
        esquiveEnnemy();
        moveEnnemy();
        drawEnnemy();
        moveMissile();
        drawMissiles();
        ennemyDie();
    };

})