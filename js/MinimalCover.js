var MinimalCover = function() {
	
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