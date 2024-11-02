function initializedDashboard() {
    life = 4;
    minute = 0;
    second = 0;
    score = 0;
}

function appears(name, array) {
    $(`#${name}`).html('');
    for(let obj in array) {
        let item = array[obj];
        $('<div/>', {'class': name, style: `width: ${item.size}px; height:${item.size}px; top: ${item.top}px; left: ${item.left}px;`}).appendTo(`#${name}`);
    }
}

function move(array, speed){
    for(let obj in array) {
        //tant que l'ennemie n'atteint pas le bas il continue de descendre
        if (array[obj].top < view.height-30 && array[obj].left < view.size -40 && array[obj].top > 0) {
            array[obj].top += speed;
        }
        //une fois l'ennemie atteint le bas de l'écran il disparait et fait apparaitre un nouveau
        else {
            array.splice(obj,1);
        }
    }
    return array;
}

function leftRandom(){
    var min = 100; 
    var max = view.size -150;
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random;
}