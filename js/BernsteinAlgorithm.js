var BernsteinAlgorithm = function(_relation) {
    var relation = _relation;
    var stateList = [];

    var ThreeNFCheck = function() {
        var nf = new NFTester(relation);
        var ThreeNF = nf.ThreeNFTest(stateList);
        return ThreeNF;
    }

    var findMinimalCover = function() {

    }

    var partition = function() {
        var H = new Array();
        for (var i = 0; i < relation.dependencies.length; ++i) {
            var newFD = new Object();
            newFD.left = relation.dependencies[i].left.slice();
            newFD.right = relation.dependencies[i].right.slice();
            var isExist = false;
            for (var j = 0; j < H.length; ++j) {
                if (H[j][0].left == newFD.left)
                {
                    H[j].push(newFD);
                    isExist = true;
                }
            }
            if (!isExist) {
                var newArray = new Array();
                newArray.push(newFD);
                H.push(newArray);
            }
        }
        return H;
    }

    var mergeEquivalentKeys = function(H) {

        while (true) {
            var isChanged = false;
            for (var i = 0; i < H.length; ++i) {
                for (var j = i + 1; j < H.length; ++j) {
                    for (var k = 0; k < H[i].length; ++k) {
                        for (var l = 0; l < H[j].length; ++l) {
                            if (!isChanged && Utility.isEqual(H[i][k].left,H[j][l].right) && Utility.isEqual(H[i][k].right,H[j][l].left)) {

                                currentState = new Object();
                                currentState["variables"] = relation["variables"];
                                currentState["dependencies"] = relation["dependencies"];
                                currentState["annotation"] = "[" + H[i][k].left + "] and [" + H[i][k].right + "] are equivalent keys";
                                currentState.highlightedDependencies = [];

                                H[i].push(H[j][l]);
                                H[j].splice(l,1);
                                if (H[j].length == 0) {
                                    H.splice(j,1);
                                }
                                isChanged = true;

                                for (var m = 0; m < H.length; ++i) {
                                    currentState["annotation"] += "<br/>H[" + m + "] = [";
                                    for (var n = 0; n < H[m].length; ++n) {
                                        if (n > 0) currentState["annotation"] += ",";
                                        currentState["annotation"] += H[m][n].left + "->" + H[m][n].right;
                                    }
                                    currentState["annotation"] += "]";
                                }
                                stateList.push(currentState);
                            }
                        }
                    }
                }
            }
            if (!isChanged) {
                break;
            }
        }
        return H;
    }

    this.beginAlgorithm = function() {

        stateList = [];

        if (ThreeNFCheck()) {
            currentState = new Object();
            currentState["variables"] = relation["variables"];
            currentState["dependencies"] = relation["dependencies"];
            currentState["annotation"] = "Relation is already in 3NF";
            stateList.push(currentState);

            animationWidget.startAnimation(stateList);

            return;
        }

        animationWidget.startAnimation(stateList);

    }
}


