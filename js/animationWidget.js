function animationWidget() {}

animationWidget.startAnimation = function(stateList) {
    $("#clickable_buttons").html("");
    canvasDraw.clearCanvas();

    for (var i = 0; i < stateList.length; ++i) {
        var message = "Step " + (i + 1);
        if ('message' in stateList[i]) {
            message = message + " - " + stateList[i].message;
        }
        stateList[i].annotation = message + "<br>" + stateList[i].annotation;
        $("#clickable_buttons").append("<li onclick='canvasDraw.draw(" + JSON.stringify(stateList[i]) + ")'> " 
                                       + message + "</li>");
    }
    canvasDraw.draw(stateList[0]);
    return;
    console.log(stateList);
    var frameIndex = 0;
    setInterval(function(){
        canvasDraw.draw(stateList[frameIndex]);
        ++frameIndex;
    }, 2000);
}