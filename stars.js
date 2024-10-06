var loopStars = null;
$(function() {
    
    var stars = {
        size: "small",
        speed: 1,
        top: 1,
    }

    let arrayStars = [];
    let t;

   function drawStars() {
        var min=0; 
        var max=1200;
        let arraySpeed = [1,3,6]
        let left = Math.floor(Math.random() * (+max - +min)) + +min;
        let speed = Math.floor(Math.random() * (3-0) + 1)
        if(arrayStars.length < 400){
            arrayStars.push({"size": speed + 2, "speed": arraySpeed[speed], "left": left, "top": 1})
        }
   }

   function appearsStars() {
        $('#stars').html('');
        for(let star in arrayStars) {
            let item = arrayStars[star];
            $('<div/>', {'class': 'stars', style: `width: ${item.size}px; height:${item.size}px; top: ${item.top}px; left: ${item.left}px;`}).appendTo('#stars');
        }
   }
   appearsStars();

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
        drawStars();
        appearsStars();
        moveStars();
   }
})