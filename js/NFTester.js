var NFTester = function() {

    //return true iff right is the subset of left
    function isTrivial(left, right) {
        for (var i = 0; i < right.length; ++i) {
            var found = false;
            for (var j = 0; j < left.length; ++j) {
                if (right[i] == left[j]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }
        return true;
    }

    function isSubset(left,right) {
        for (var i = 0; i < left.length; ++i) {
            var found = false;
            for (var j = 0; j < right.length; ++j) {
                if (left[i] == right[j]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }
        return true;
    }

    //return true iff left is the proper subset of right
    function isProperSubset(left,right) {
        if (left.length == right.length || !isSubset(left,right)) {
            return false;
        }
        return true;
    }

    //return a key that is a proper subset of, or NULL if there is no key satisfies
    function properSubsetOfAKey(attributes) {
        var listOfKeys = [["a","b","c"]]; //TODO
        for (var i = 0; i < listOfKeys.length; ++i) {
            if (isProperSubset(attributes,listOfKeys[i])) {
                return listOfKeys[i];
            }
        }
        return null;
    }

    function isPrimeAttribute(attributes) {
        return true; //TODO
    }

    //2NF <=> all FD X->{A}
    //X -> {A} is trivial, or
    //X is not a proper subset of a candidate key, or
    //A is a prime attribute
    this.TwoNFTest = function(relation) {
        var stateList = [];
        var currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "";
        var twoNF = true;
        stateList.push(currentState);
        for (var i = 0; i < relation.dependencies.length; ++i) {
            currentState = new Object();
            currentState["variables"] = relation["variables"];
            currentState["dependencies"] = relation["dependencies"];
            currentState["annotation"] = "Checking FD " + currentState.dependencies[i].left + " -> "
                                         + currentState.dependencies[i].right;
            currentState.highlightedDependencies = [i];
            stateList.push(currentState);

            var leftRelation = relation.dependencies[i].left;
            var rightRelation = relation.dependencies[i].right;
            var OK = false;

            if (!OK && isSubset(rightRelation,leftRelation)) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Right hand is a subset of left hand. This is a trivial FD. FD satifies 2NF";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);

                OK = true;
            }
            if (!OK && properSubsetOfAKey(leftRelation) != null) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Left hand is a proper subset of a key " + properSubsetOfAKey(leftRelation)
                                             + ". FD satifies 2NF";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);

                OK = true;
            }
            for (var j = 0; j < rightRelation.length; ++j) {
                if (OK) {
                    break;
                }
                if (isPrimeAttribute(rightRelation)) {
                    currentState = new Object();
                    currentState["variables"] = relation["variables"];
                    currentState["dependencies"] = relation["dependencies"];
                    currentState["annotation"] = "Right hand is a prime attribute. FD satisfies 2NF";
                    currentState.highlightedDependencies = [i];
                    stateList.push(currentState);

                    OK = true;
                }
            }
            
            if (!OK) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "This FD violates 2NF. Therefore, this is not in 2NF";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);
                twoNF = false;

                break;
            }
        }

        currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "All FDs satifies 2NF. The relation satifies 2NF.";
        stateList.push(currentState);

        animationWidget.startAnimation(stateList);
        return twoNF;
    }

    //3NF <=> all FD X->{A}
    //X -> {A} is trivial, or
    //X is a superkey
    //A is a prime attribute
    this.ThreeNFTest = function(relation) {
        //TODO
        return true;
    }

    this.EKNFTest = function(relation) {
        //TODO
        return true;
    }

    this.BCNFTest = function(relation) {
        //TODO
        return true;
    }
}


