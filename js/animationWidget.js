function animationWidget() {}

/*animationWidget.startAnimation = function(stateList) {
    $("#clickable_buttons").html("");
    canvasDraw.clearCanvas();

    for (var i = 0; i < stateList.length; ++i) {
        var message = "Step " + (i + 1);
        if ('message' in stateList[i]) {
            message = message + " - " + stateList[i].message;
        }
        stateList[i].annotation = message + "<br/>" + stateList[i].annotation;
        $("#clickable_buttons").append("<li onclick='canvasDraw.draw(" + JSON.stringify(stateList[i]) + ")'> " 
                                       + message + "</li>");
    }
    canvasDraw.draw(stateList[0]);
}*/

var animationIndex = -1;
var stateList;

animationWidget.startAnimation = function(_stateList) {
    stateList = _stateList;
    $("#clickable_buttons").html("");
    canvasDraw.clearCanvas();
    canvasDraw.clearButtons();

    for (var i = 0; i < stateList.length; ++i) {
        var message = "Step " + (i + 1);
        if ('message' in stateList[i]) {
            message = message + " - " + stateList[i].message;
        }
        stateList[i].annotation = message + "<br/>" + stateList[i].annotation;
        $("#clickable_buttons").append("<li id='stepbutton" + i +  "' onclick='mB.draw(" + i + ")'> " 
                                       + message + "</li>");
    }
    //canvasDraw.draw(stateList[0]);
    animationWidget.load(0);
}

animationWidget.next = function() {
    ++animationIndex;
    if (animationIndex >= stateList.length) {
        --animationIndex;
    }
    animationWidget.load(animationIndex);
}

animationWidget.prev = function() {
    --animationIndex;
    if (animationIndex < 0) {
        ++animationIndex;
    }
    animationWidget.load(animationIndex);
}

animationWidget.load = function(index) {
    for (var i = 0; i < stateList.length; ++i) {
        $("#stepbutton" + i).css("color","");
    }
    purple_color = "#8e44ad";
    $("#stepbutton" + index).css("color",purple_color );
    animationIndex = index;
    canvasDraw.draw(stateList[index]);
}