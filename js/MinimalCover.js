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

    function makeSingleton(relation) {
        //var currentState = new Object();
        var dependencies = relation["dependencies"];

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

    this.removeExtraAttributes = function(relation) {
        var masterRelation = JSON.parse(JSON.stringify(relation));
        var dependencies = masterRelation["dependencies"];
        //var closure = relation["closure"];

        var masterClosure = new ClosureFinder(masterRelation); //rely on existing closure anot?

        for (var i = 0; i < dependencies.length; i++) {
            var leftAttrClosure = masterClosure.getClosure(dependencies[i].left);

            for (var j = 0; j < dependencies[i].left.length; j++) {
                //Clone relation
                var tempRelation = JSON.parse(JSON.stringify(masterRelation));

                //Remove the j attr from the current FD
                tempRelation["dependencies"][i].left.splice(j, 1);

                //Check if same closure
                var tempClosure = new ClosureFinder(tempRelation);
                var tempLeftAttrClosure = tempClosure.getClosure(tempRelation["dependencies"][j].left);
                if(Utility.isEqual(leftAttrClosure, tempLeftAttrClosure)) {
                    //Extra LHS Attribute Found! Remove!
                    masterRelation = tempRelation;
                }

            }
        }
        return masterRelation;
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
