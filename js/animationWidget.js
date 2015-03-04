function animationWidget() {}

animationWidget.startAnimation = function(stateList) {
    $("#clickable_buttons").html();
    canvasDraw.clearCanvas();

    for (var i = 0; i < stateList.length; ++i) {
        var message = "Step " + (i + 1);
        if ('message' in stateList[i]) {
            message = stateList[i].message;
        }
        $("#clickable_buttons").append("<li onclick='canvasDraw.draw(" + JSON.stringify(stateList[i]) + ")'> " 
                                       + message + "</li>");
    }
}