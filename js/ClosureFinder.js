var ClosureFinder = function(_relation) {
    var relation = _relation;

    this.getClosure = function(attributes) {
        var stateList = new Array();

        var closure = new Array();
        for (var i = 0; i < attributes.length; ++i) {
            closure.push(attributes[i]);
        }

        currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "Closure is [" + closure + "]";
        currentState["message"] = "Closure is [" + closure + "]";
        currentState.highlightedDependencies = [];
        stateList.push(currentState);

        while (true) {
            var isAdded = false;
            for (var i = 0; i < relation.dependencies.length; ++i) {
                if (Utility.isSubset(relation.dependencies[i].left,closure)) {
                    var newClosure = Utility.union(closure,relation.dependencies[i].right);
                    if (newClosure.length > closure.length) {
                        isAdded = true;

                        currentState = new Object();
                        currentState["variables"] = relation["variables"];
                        currentState["dependencies"] = relation["dependencies"];
                        currentState["annotation"] = "[" + relation.dependencies[i].left + "] is subset of [" + closure + "]";
                        currentState["annotation"] += "<br/>Closure is [" + closure + "]";
                        currentState["annotation"] += " union [" + relation.dependencies[i].right + "]";
                        currentState["annotation"] += "<br/>= [" + newClosure + "]";
                        currentState["message"] = "Closure is [" + newClosure + "]";
                        currentState.highlightedDependencies = [i];
                        stateList.push(currentState);

                        closure = newClosure;
                    }
                }
            }
            if (!isAdded) {
                break;
            }
        }

        currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "No more FD can be used";
        currentState["message"] = "Closure is [" + closure + "]";
        stateList.push(currentState);
        animationWidget.startAnimation(stateList);

        return closure;
    }
}