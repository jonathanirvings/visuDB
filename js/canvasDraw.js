function canvasDraw() { }

canvasDraw.clearCanvas = function() {
    $("#main_canvas #variables").html("");
    $("#main_canvas #dependencies").html("");
    $("#annotation_text").html("");
}

canvasDraw.clearButtons = function() {
    $("#clickable_buttons").html("");
}

canvasDraw.draw = function(drawState) {
    console.log(drawState);
    this.clearCanvas();

    $("#main_canvas #variables").html(drawState.variables.toString());
    $("#annotation_text").html(drawState.annotation);

    for (var i = 0; i < drawState.dependencies.length; ++i) {
        var FD = drawState.dependencies[i].left.toString() +
                 " -> " + drawState.dependencies[i].right.toString();
        var highlighted = false;
        if ('highlightedDependencies' in drawState) {
            for (var j = 0; j < drawState.highlightedDependencies.length; ++j) {
                if (drawState.highlightedDependencies[j] == i) {
                    highlighted = true;
                }
            }
        }
        if (highlighted) {
            $("#main_canvas #dependencies").append("<li class='highlighted'>" + FD + "</li>");
        } else {
            $("#main_canvas #dependencies").append("<li>" + FD + "</li>");
        }
    }
}