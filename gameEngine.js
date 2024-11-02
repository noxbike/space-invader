var view = {'marginLeft': 0, 'size': 1200, "height": 800};
var pauseBool = false;
var gameOver = null;
$(function() { 
    var t;

    setViewSize = () => {
        view.marginLeft = parseInt( $('#view').css('margin-left'));
        view.size = parseInt( $('#view').css('width'));
        view.height = parseInt( $('#view').css('height'));
    }

    gameView = () => {
        $('#missile').toggle();
        $('#missileEnnemy').toggle();
        $('#ennemy').toggle();
        $('#hero').toggle();
        $('#stars').toggle();
    }

    hideGame = () => {
        clearTimeout(chronometerTime)
        cancelAnimationFrame(t)
        missiles = [];
        ennemys = [];
        gameView()
    }

    showGame = () => {
        gameLoop();
        gameView();
    }

    

    $(document).keydown(function(e) {
        if (e.which == 27) { menu(); }
        if (e.which == 13) { pause();  }  
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
        $("#dashboard").hide();
        $('#gameOver').css("display", "none");
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
        setViewSize();
        chronometer();
        loopHero();
        loopStars();
        loopEnnemy();
        loopMissile();
    };
})