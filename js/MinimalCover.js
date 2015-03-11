var MinimalCover = function() {

    var test =
    {
        variables : ["a","b","c","d"],
        dependencies :
        [
            {
                left : ["a","b"],
                right : ["c","d"]
            },
            {
                left : ["b"],
                right : ["c"]
            },
            {
                left : ["a"],
                right : ["c"]
            }
        ]
    }
    //makeSingleton(test);

    function redundantFD(relation) {
        var currentState = new Object();
        var dependencies = relation["dependencies"];
        var closure = relation["closure"];

        var tempClosure = [];
        var rightHandSide = [];

        if (dependencies.length == 1) 
        	return true;

        for (var i = 0; i < dependencies.left.length; i++) {
        	rightHandSide = dependencies[i].right;
        	tempClosure = closure[i].right;

        	for (var j = 0; j < rightHandSide.length; j++) {
        		var index = tempClosure.indexOf(rightHandSize[j]);
        		if (index > -1) {
        			tempClosure.splice(index, 1);
        		}
        	}

        	lookForRightHandSide(currentIdx, tempClosure, rightHandSide, dependencies);
        }
    }

    function lookForRightHandSide(currentIdx, tempClosure, right, dependencies) {
    	keyToLook = right;
    	for (var i = 0; i < dependencies.left.length; i++) {
    		if ( i != currentIdx ) {
    			leftHandSide = dependencies[i].left;
    			if (isASubset(tempClosure, leftHandSide)) {
    				rightHandSide = dependencies[i].right;
    			    removeKeyToLookFor(rightHandSide, keyToLook);
    			}
    		}
    	}
    }

    function removeKeyToLookFor(right, keyToLook) {
    	for (var i = 0; i < right.length; i++) {
    		
    	}
    }

    function makeSingleton(relation) {
        //var currentState = new Object();
        var dependencies = relation["dependencies"];
        var closure = relation["closure"];

        for (var i = 0; i < dependencies.length; i++) {
            while(dependencies[i].right.length > 1) {
                //Create a new FD for LHS -> Last attr of RHS
                temp = new Object();
                temp.left = dependencies[i].left.slice();
                temp.right= [dependencies[i].right[dependencies[i].right.length - 1]];
                dependencies.push(temp);

                //Remove the last attr from the current FD
                dependencies[i].right.splice(dependencies[i].right.length - 1, 1);
            }
        }

    }

    function removeExtraAttributes(relation) {
       
    }

    function isASubset(currentClosure, left) {
    	for (var i = 0; i < left.lengh; i++) {
    		var found = false;
    		var currentKey = left[i];
    		
    		for (var j = 0; j < currentClosure.length; j++) {
    			if (currentClosure[j] == currentKey) {
    				found = true;
    			}
    		}

    		if (!found) return false;
    	}

    	return true;
    }
}

//var a = new MinimalCover();