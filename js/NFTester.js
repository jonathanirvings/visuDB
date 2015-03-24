var NFTester = function(_relation) {
    var relation = _relation;
    var keyFinder = new KeyFinder();
    var listOfKeys = keyFinder.findCandidateKey(relation);

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

    //return a key that is a proper subset of, or NULL if there is no key satisfies
    function properSubsetOfAKey(attributes) {
        for (var i = 0; i < listOfKeys.length; ++i) {
            if (Utility.isProperSubset(attributes,listOfKeys[i])) {
                return listOfKeys[i];
            }
        }
        return null;
    }

    function isPrimeAttribute(attribute) {
        for (var i = 0; i < listOfKeys.length; ++i) {
            for (var j = 0; j < listOfKeys[i].length; ++j) {
                if (attribute == listOfKeys[i][j]) {
                    return true;
                }
            }
        }
        return false;
    }

    function isSuperKey(attributes) {
        for (var i = 0; i < listOfKeys.length; ++i) {
            if (Utility.isSubset(listOfKeys[i],attributes)) {
                return true;
            }
        }
        return false;
    }

    //2NF <=> all FD X->{A}
    //X -> {A} is trivial, or
    //X is not a proper subset of a candidate key, or
    //A is a prime attribute
    this.TwoNFTest = function(stateList) {

        var currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "Key = [";// + listOfKeys;
        for (var i = 0; i < listOfKeys.length; ++i) {
            if (i > 0) currentState["annotation"] += ",";
            currentState["annotation"] += "[";
            for (var j = 0; j < listOfKeys[i].length; ++j) {
                if (j > 0) currentState["annotation"] += ",";
                currentState["annotation"] += listOfKeys[i][j];
            }
            currentState["annotation"] += "]";
        }
        currentState["annotation"] += "]";
        currentState["message"] = "2NF check";
        stateList.push(currentState);

        var twoNF = true;
        for (var i = 0; i < relation.dependencies.length; ++i) {
            currentState = new Object();
            currentState["variables"] = relation["variables"];
            currentState["dependencies"] = relation["dependencies"];
            currentState["annotation"] = "Checking FD " + currentState.dependencies[i].left + " -> "
                                         + currentState.dependencies[i].right;
            currentState["message"] = "Checking FD " + currentState.dependencies[i].left + " -> "
                                         + currentState.dependencies[i].right;
            currentState.highlightedDependencies = [i];
            stateList.push(currentState);

            var leftRelation = relation.dependencies[i].left;
            var rightRelation = relation.dependencies[i].right;
            var OK = false;

            if (!OK && Utility.isSubset(rightRelation,leftRelation)) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Right hand is a subset of left hand. This is a trivial FD. FD satifies 2NF";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);

                OK = true;
            } else if (!OK) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Right hand is NOT a subset of left hand. This is not a trivial FD";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);
            }


            if (!OK && properSubsetOfAKey(leftRelation) == null) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Left hand is not a proper subset of any key. FD satisfies 2NF";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);

                OK = true;
            } else if (!OK) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Left hand is a proper subset of a key " + properSubsetOfAKey(leftRelation);
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);
            }

            for (var j = 0; j < rightRelation.length; ++j) {
                if (OK) {
                    break;
                }
                if (isPrimeAttribute(rightRelation[j])) {
                    currentState = new Object();
                    currentState["variables"] = relation["variables"];
                    currentState["dependencies"] = relation["dependencies"];
                    currentState["annotation"] = rightRelation[j] + " is a prime attribute. FD satisfies 2NF";
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

        if (twoNF) {
            currentState = new Object();
            currentState["variables"] = relation["variables"];
            currentState["dependencies"] = relation["dependencies"];
            currentState["annotation"] = "All FDs satifies 2NF. The relation satifies 2NF.";
            stateList.push(currentState);
        }

        return twoNF;
    }

    //3NF <=> all FD X->{A}
    //X -> {A} is trivial, or
    //X is a superkey
    //A is a prime attribute
    this.ThreeNFTest = function(stateList) {
        var currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "Key = [";// + listOfKeys;
        for (var i = 0; i < listOfKeys.length; ++i) {
            if (i > 0) currentState["annotation"] += ",";
            currentState["annotation"] += "[";
            for (var j = 0; j < listOfKeys[i].length; ++j) {
                if (j > 0) currentState["annotation"] += ",";
                currentState["annotation"] += listOfKeys[i][j];
            }
            currentState["annotation"] += "]";
        }
        currentState["annotation"] += "]";
        currentState["message"] = "3NF Check";
        stateList.push(currentState);

        var threeNF = true;
        for (var i = 0; i < relation.dependencies.length; ++i) {
            currentState = new Object();
            currentState["variables"] = relation["variables"];
            currentState["dependencies"] = relation["dependencies"];
            currentState["annotation"] = "Checking FD " + currentState.dependencies[i].left + " -> "
                                         + currentState.dependencies[i].right;
            currentState["message"] = "Checking FD " + currentState.dependencies[i].left + " -> "
                                         + currentState.dependencies[i].right;
            currentState.highlightedDependencies = [i];
            stateList.push(currentState);

            var leftRelation = relation.dependencies[i].left;
            var rightRelation = relation.dependencies[i].right;
            var OK = false;

            if (!OK && Utility.isSubset(rightRelation,leftRelation)) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Right hand is a subset of left hand. This is a trivial FD. FD satifies 3NF";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);

                OK = true;
            } else if (!OK) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Right hand is NOT a subset of left hand. This is not a trivial FD";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);
            }


            if (!OK && isSuperKey(leftRelation)) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Left hand is a superkey. FD satisfies 3NF";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);

                OK = true;
            } else if (!OK) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Left hand is not a superkey";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);
            }

            for (var j = 0; j < rightRelation.length; ++j) {
                if (OK) {
                    break;
                }
                if (isPrimeAttribute(rightRelation[j])) {
                    currentState = new Object();
                    currentState["variables"] = relation["variables"];
                    currentState["dependencies"] = relation["dependencies"];
                    currentState["annotation"] = rightRelation[j] + " is a prime attribute. FD satisfies 3NF";
                    currentState.highlightedDependencies = [i];
                    stateList.push(currentState);

                    OK = true;
                }
            }
            
            if (!OK) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "This FD violates 3NF. Therefore, this is not in 3NF";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);
                threeNF = false;

                break;
            }
        }

        if (threeNF) {
            currentState = new Object();
            currentState["variables"] = relation["variables"];
            currentState["dependencies"] = relation["dependencies"];
            currentState["annotation"] = "All FDs satifies 3NF. The relation satifies 3NF.";
            stateList.push(currentState);
        }

        return threeNF;
    }

    /*this.EKNFTest = function(relation) {
        //NOT IMPLEMENTED
        return true;
    }*/

    this.BCNFTest = function(stateList) {
        var currentState = new Object();
        currentState["variables"] = relation["variables"];
        currentState["dependencies"] = relation["dependencies"];
        currentState["annotation"] = "Key = [";// + listOfKeys;
        for (var i = 0; i < listOfKeys.length; ++i) {
            if (i > 0) currentState["annotation"] += ",";
            currentState["annotation"] += "[";
            for (var j = 0; j < listOfKeys[i].length; ++j) {
                if (j > 0) currentState["annotation"] += ",";
                currentState["annotation"] += listOfKeys[i][j];
            }
            currentState["annotation"] += "]";
        }
        currentState["annotation"] += "]";
        currentState["message"] = "BCNF Check";
        stateList.push(currentState);

        var BCNF = true;
        for (var i = 0; i < relation.dependencies.length; ++i) {
            currentState = new Object();
            currentState["variables"] = relation["variables"];
            currentState["dependencies"] = relation["dependencies"];
            currentState["annotation"] = "Checking FD " + currentState.dependencies[i].left + " -> "
                                         + currentState.dependencies[i].right;
            currentState["message"] = "Checking FD " + currentState.dependencies[i].left + " -> "
                                         + currentState.dependencies[i].right;
            currentState.highlightedDependencies = [i];
            stateList.push(currentState);

            var leftRelation = relation.dependencies[i].left;
            var rightRelation = relation.dependencies[i].right;
            var OK = false;

            if (!OK && Utility.isSubset(rightRelation,leftRelation)) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Right hand is a subset of left hand. This is a trivial FD. FD satifies BCNF";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);

                OK = true;
            } else if (!OK) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Right hand is NOT a subset of left hand. This is not a trivial FD";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);
            }


            if (!OK && isSuperKey(leftRelation)) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Left hand is a superkey. FD satisfies BCNF";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);

                OK = true;
            } else if (!OK) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "Left hand is not a superkey";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);
            }
            
            if (!OK) {
                currentState = new Object();
                currentState["variables"] = relation["variables"];
                currentState["dependencies"] = relation["dependencies"];
                currentState["annotation"] = "This FD violates BCNF. Therefore, this is not in BCNF";
                currentState.highlightedDependencies = [i];
                stateList.push(currentState);
                BCNF = false;

                break;
            }
        }

        if (BCNF) {
            currentState = new Object();
            currentState["variables"] = relation["variables"];
            currentState["dependencies"] = relation["dependencies"];
            currentState["annotation"] = "All FDs satifies BCNF. The relation satifies BCNF.";
            stateList.push(currentState);
        }

        return BCNF;
    }
}


