var view = {"height": 800};
var pauseBool = false;
var gameOver = null;
$(function() { 
    var t;

    addEventListener('resize', () => {
       setViewSize();
    })

    setViewSize = () => {
        view.height = parseInt( $('#view').css('height'));
        $('#hero').css('top', view.height-30);
    }
    setViewSize();

    hideGame = () => {
        cancelAnimationFrame(t)
        missiles = [];
        ennemys = [];
        $("#dashboard").hide();
        $('#missile').hide();
        $('#missileEnnemy').hide();
        $('#ennemy').hide();
        $('#hero').hide();
        $('#stars').hide();
    }

    showGame = () => {
        gameLoop();
        $("#dashboard").show();
        $('#missile').show();
        $('#missileEnnemy').show();
        $('#ennemy').show();
        $('#hero').show();
        $('#stars').show();
    }

    

    $(document).keydown(function(e) {
        if (e.which == 27) { menu(); }
        if (e.which == 13) { gamePlay && pause();  }  
    })

    $('#play').click(() => play() )
    $("#restart").click(() => play() );

    play = () => {
        setViewSize();
        chronometer();
        updatelife();
        $('#gameOver').css("display", "none");
        $('#menu').hide();
        showGame();
    }

    pause = () => {
        pauseBool = !pauseBool;
        if (pauseBool) {
            $('.pause').show(); 
            cancelAnimationFrame(t);
            clearTimeout(chronometerTime)
        } else {
            $('.pause').hide();
            setTimeout(chronometer,1000);
            gameLoop();
        } 
    }

    $("#back").click(() => menu())

    menu = () => {
        $('#menu').show();
        $('#gameOver').css("display", "none");
        pauseBool = false;
        $('.pause').hide();
        hideGame();
    }

    gameOver = () => {
        $('.endTime').html(`${minute < 10 ? 0 : ''}${minute}:${second < 10 ? 0 : ''}${second}`)
        $('.endScore').html(`${score}`)
        initializedDashboard();
        hideGame();
    }

    gameLoop = () => {
        if(!pauseBool){
            t = requestAnimationFrame(gameLoop);
        }
        chronometer();
        loopHero();
        loopStars();
        loopEnnemy();
        loopMissile();
    };
})