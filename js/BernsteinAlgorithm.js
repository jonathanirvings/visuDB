var BernsteinAlgorithm = function(_relation) {
    var relation = _relation;
    var stateList = [];
    var fc = new KeyFinder();
    var key = fc.findCandidateKey(relation)[0];

    var ThreeNFCheck = function() {
        var nf = new NFTester(relation);
        var ThreeNF = nf.ThreeNFTest(stateList);
        return ThreeNF;
    }

    var findMinimalCover = function() {
        mc = new MinimalCover();
        relation = mc.makeSingleton(relation);
        
        currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "Make every functional dependencies singleton";
        stateList.push(currentState);

        relation = mc.removeExtraAttributes(relation);
        currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "Remove extraneous attributes";
        stateList.push(currentState);

        relation = mc.redundantFD(relation);
        currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "Remove redundant functional dependencies";
        stateList.push(currentState);

    }

    var partition = function() {
        var H = new Array();
        for (var i = 0; i < relation.dependencies.length; ++i) {
            var newFD = new Object();
            newFD.left = relation.dependencies[i].left.slice();
            newFD.right = relation.dependencies[i].right.slice();
            var isExist = false;
            for (var j = 0; j < H.length; ++j) {
                if (Utility.isEqual(H[j][0].left,newFD.left))
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

                                for (var m = 0; m < H.length; ++m) {
                                    currentState["annotation"] += "<br/>H[" + m + "] = [";
                                    for (var n = 0; n < H[m].length; ++n) {
                                        if (n > 0) currentState["annotation"] += ",";
                                        currentState["annotation"] += "["+H[m][n].left + "]->[" + H[m][n].right + "]";
                                    }
                                    currentState["annotation"] += "]";
                                }
                                stateList.push(currentState);
                            }
                            if (isChanged) break;
                        }
                        if (isChanged) break;
                    }
                    if (isChanged) break;
                }
                if (isChanged) break;
            }
            if (!isChanged) {
                break;
            }
            break;
        }
        return H;
    }

    var printHToAnnotation = function(H, currentState) {
        for (var m = 0; m < H.length; ++m) {
            currentState["annotation"] += "<br/>H[" + m + "] = [";
            for (var n = 0; n < H[m].length; ++n) {
                if (n > 0) currentState["annotation"] += ",";
                currentState["annotation"] += "["+H[m][n].left + "]->[" + H[m][n].right + "]";
            }
            currentState["annotation"] += "]";
        }
    }

    var indexInH = function(H, left, right) {
        for (var i = 0; i < H.length; ++i) {
            for (var j = 0; j < H[i].length; ++j) {
                if (Utility.isEqual(left,H[i][j].left) && Utility.isEqual(right,H[i][j].right)) {
                    return [i,j];
                }
            }
        }
        return [-1,-1]; //not exist in H
    }

    var removeTransitiveDependencies = function(H) {
        while (true) {
            var isChanged = false;
            for (var i = 0; i < H.length; ++i) {
                for (var j = 0; j < H.length; ++j) {
                    for (var k = 0; k < H[i].length; ++k) {
                        for (var l = 0; l < H[j].length; ++l) {
                            if (Utility.isEqual(H[i][k].right,H[j][l].left)) {
                                var position = indexInH(H,H[i][k].left,H[j][l].right);
                                if (position[0] >= 0) {

                                    console.log(position);
                                    H[position[0]].splice(position[1],1);
                                    isChanged = true;

                                    currentState = new Object();
                                    currentState["variables"] = relation["variables"];
                                    currentState["dependencies"] = relation["dependencies"];
                                    currentState["annotation"] = "Removing transitive dependency [" + H[i][k].left + "]->[" + H[j][l].right + "]";
                                    currentState.highlightedDependencies = [];
                                    printHToAnnotation(H, currentState);
                                    stateList.push(currentState);                                    
                                }
                            }
                            if (isChanged) break;
                        }
                        if (isChanged) break;
                    }
                    if (isChanged) break;
                }
                if (isChanged) break;
            }
            if (!isChanged) {
                break;
            }
        }

        return H;
    }

    var createRelation = function(H) {
        var allAttributes = new Array();

        currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "Creating relations";
        for (var i = 0; i < H.length; ++i) {
            var attributes = new Array();
            for (var j = 0; j < H[i].length; ++j) {
                for (var k = 0; k < H[i][j].left.length; ++k) {
                    if (!Utility.isInside(H[i][j].left[k],attributes)) {
                        attributes.push(H[i][j].left[k]);
                    }
                }
                for (var k = 0; k < H[i][j].right.length; ++k) {
                    if (!Utility.isInside(H[i][j].right[k],attributes)) {
                        attributes.push(H[i][j].right[k]);
                    }
                }
            }
            allAttributes = Utility.union(allAttributes,attributes);

            currentState["annotation"] += "<br/>R[" + i + "] = (";
            for (var j = 0; j < attributes.length; ++j) {
                if (j > 0) currentState["annotation"] += ",";
                var isKey = false;
                for (var l = 0; l < H[i].length; ++l) {
                    if (Utility.isInside(attributes[j],H[i][l].left)) {
                        isKey = true;
                    }
                }
                if (isKey) {
                    currentState["annotation"] += "<u>";
                }
                currentState["annotation"] += attributes[j];
                if (isKey) {
                    currentState["annotation"] += "</u>";
                }
            }
            currentState["annotation"] += ")";
        
        }
        stateList.push(currentState);
        var lastAnnotation = currentState["annotation"];

        if (!Utility.isEqual(allAttributes,relation.variables)) {
            currentState = new Object();
            currentState["variables"] = relation["variables"];
            currentState["dependencies"] = relation["dependencies"];
            currentState["annotation"] = "Some attribute is missing. Adding a relation consisting of a key<br/>" + lastAnnotation + "<br/>";
            currentState["annotation"] += "R[" + H.length + "] = (";
            for (var i = 0; i < key.length; ++i) {
                if (i > 0) currentState["annotation"] += ",";
                 currentState["annotation"] += "<u>" + key[i] + "</u>";
            }
            currentState["annotation"] += ")";

            stateList.push(currentState);
        }
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
        } else {
            currentState = new Object();
            currentState["variables"] = relation["variables"];
            currentState["dependencies"] = relation["dependencies"];
            currentState["annotation"] = "Relation is not in 3NF. Bernstein Algorithm required";
            stateList.push(currentState);
        }

        findMinimalCover();

        var H = partition();
        currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "Partitioning into H based on left side FD";
        printHToAnnotation(H, currentState);
        stateList.push(currentState);

        currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "Merging equivalent key";
        printHToAnnotation(H, currentState);
        stateList.push(currentState);
        H = mergeEquivalentKeys(H);

        currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "Remove transitive dependencies";
        printHToAnnotation(H, currentState);
        stateList.push(currentState);
        H = removeTransitiveDependencies(H);

        /*currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "Creating relations";
        stateList.push(currentState);*/
        createRelation(H);

        animationWidget.startAnimation(stateList);

    }
}


