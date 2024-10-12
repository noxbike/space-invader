let view = 0;
var pause = false;
var gameOver = null;
$(function() { 
    var t;

    $(document).keydown(function(e) {

        if (e.which == 27) {
            menu();
        }
 
        if (e.which == 13) {
            pause = !pause;
            var txtpause = $('<h1></h1>').text('Pause');
            txtpause.attr('class', 'pause');
            if (pause) {
                txtpause.appendTo('#view'); 
                cancelAnimationFrame(t);
            } else {
                $('.pause').html('');
                gameLoop();
            }
        }  
    })

    function menu() {
        cancelAnimationFrame(t)
        $('#menu').show();
        missiles = [];
        ennemys = [];
        $('#missile').hide();
        $('#ennemy').hide();
        $('#hero').hide();
        $('#stars').hide();
    }

    $('#play').click(function(){
        gameLoop();
        chronometer();
        updatelife();
        $('#menu').hide();
        $('#missile').show();
        $('#ennemy').show();
        $('#hero').show();
        $('#stars').show();
    })

    gameOver = () => {
        $('.endTime').html(`${minute < 10 ? 0 : ''}${minute}:${second < 10 ? 0 : ''}${second}`)
        $('.endScore').html(`${score}`)
        minute = 0;
        second = 0;
        life = [1, 2, 3, 4]
        score = 0
        clearTimeout(chronometerTime)
        cancelAnimationFrame(t)
        missiles = [];
        ennemys = [];
        $('#missile').hide();
        $('#ennemy').hide();
        $('#hero').hide();
        $('#stars').hide();
    }

    gameLoop = () =>{
        if(!pause){
            t = requestAnimationFrame(gameLoop);
        }
        view = parseInt( $('#view').css('margin-left'))
        loopHero();
        loopStars();
        loopEnnemy();
        loopMissile();
    };
})