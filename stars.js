var loopStars = null;
$(function() {

    let arrayStars = [];

    function drawStars() {
            var min=0; 
            var max=1200;
            let arraySpeed = [1,3,5]
            let left = Math.floor(Math.random() * (+max - +min)) + +min;
            let speed = Math.floor(Math.random() * (3-0) + 1)
            if(arrayStars.length < 20){
                arrayStars.push({"size": speed + 2, "speed": arraySpeed[speed], "left": left, "top": 1})
            }
            setTimeout(drawStars,200);
    }
    drawStars();

    function appearsStars() {
            $('#stars').html('');
            for(let star in arrayStars) {
                let item = arrayStars[star];
                $('<div/>', {'class': 'stars', style: `width: ${item.size}px; height:${item.size}px; top: ${item.top}px; left: ${item.left}px;`}).appendTo('#stars');
            }
    }

    function moveStars() {
            let maxHeight = $('#stars').height()
            for(let star in arrayStars) {
                if(arrayStars[star].top < maxHeight - 10){
                    arrayStars[star].top += arrayStars[star].speed
                } else {
                    arrayStars.splice(star, 1);
                }
            }
    }

    loopStars = () => {
            appearsStars();
            moveStars();
    }
})