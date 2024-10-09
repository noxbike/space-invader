var life = [1, 2, 3, 4];
var minute = 0;
var second = 0;
var score = 0;
var updateScore = null;
var updatelife = null;
var chronometer = null;
var chronometerTime = null;
$(function() {
    chronometer = () => {
        chronometerTime = setTimeout(chronometer,1000);
        if(second == 59){
            minute += 1;
            second = 0;
        } else {
            second += 1
        }
        $("#time").html(`${minute < 10 ? 0 : ''}${minute} : ${second < 10 ? 0 : ''}${second}`);
        $('#dashboard').css('display', 'flex');
    }
    

    updateScore = () => {
        $("#kill").html(`${score}`)
    }
    
    updatelife = () => {
        string = "";
        for(let i = life.length - 1; i >= 0; i--) {
            string += `<span class="point ${life.length < 3? "red": "" }"></span>`
        }
        $('#life').html(string)
        if(life.length == 0){
            $('#gameOver').css('display', 'flex');
            gameOver();
        }
    }
})