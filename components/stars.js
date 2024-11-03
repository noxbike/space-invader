var loopStars = null;
$(function() {

    let arrayStars = [];

    drawStars = () => {
        let arraySpeed = [0.1,0.5,1]
        let speed = Math.floor(Math.random() * (3-0) + 1)
        if(arrayStars.length < 20){
            arrayStars.push({
                size: speed + 2,
                speed: arraySpeed[speed],
                left: leftRandom(),
                top: 1})
        }
        setTimeout(drawStars,400);
    }
    drawStars();

    moveStars = () => {
        arrayStars = move(arrayStars, 3);
    }

    loopStars = () => {
        appears('stars', arrayStars);
        moveStars();
    }
})