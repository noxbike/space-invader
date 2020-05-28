$(function(){

    var hero = {
        top:700,
        left: 1000
    };

    var missiles = [];

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
                left: hero.left - 450,
                top: hero.top
            })
            drawMissiles();
        }
        
    })

    function moveHero() {
          $('#hero').css('left', hero.left);
    }

    function moveMissile(){
        for( var missile = 0; missile < missiles.length; missile++){
            missiles[missile].top = missiles[missile].top - 5;
        }
    }

    function drawMissiles(){
        $('#missile').html('');
        for( var missile = 0; missile < missiles.length; missile++){
            $('<div/>', {class: 'missile', style: `top:${missiles[missile].top}px; left:${missiles[missile].left}px;` }).appendTo('#missile');
        }
        
    }

    function gameLoop(){
        setTimeout(gameLoop , 10)
        moveMissile();
        drawMissiles();
    }
    gameLoop();

})