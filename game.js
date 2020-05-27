$(function(){
    $(document).keydown(function(e){
        if(e.which == 39){
            var VaX = parseInt($('#vaisseau-allie').css('left'));
            if(VaX < 870){
                $('#vaisseau-allie').css('left', VaX+30);
            } 
        }

        if(e.which == 37){
            var VaX = parseInt($('#vaisseau-allie').css('left'));
            if(VaX > 10){
                $('#vaisseau-allie').css('left', VaX-30);
            }
        }
    });
})