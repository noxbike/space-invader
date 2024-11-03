var life = 4;
var minute = 0;
var second = 0;
var ms = 0;
var score = 0;
var updateScore = null;
var updatelife = null;
var chronometer = null;
$(function() {
    chronometer = () => {
        ms += ms == 60 ? -ms : 1;
        second += ms == 60 ? 1 : 0;
        minute += second == 59 ? 1 : 0;
        
        $("#time").html(`${minute < 10 ? 0 : ''}${minute}:${second < 10 ? 0 : ''}${second}`);
        $('#dashboard').css('display', 'flex');
    }

    updateScore = () => {
        $("#kill").html(`${score}`)
    }
    
    updatelife = () => {
        if(life <= 0){
            $('#gameOver').css('display', 'flex');
            gameOver();
        }
        string = `<span class="point ${life.length < 3? "red": "" }"></span>`;
        $('#life').html(string.repeat(life));
    }
})