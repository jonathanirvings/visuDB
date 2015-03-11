var MinimalCover = function(_relation) {
	
	this.relation = _relation;

    this.redundantFD = function (relation) {
    	var filter = new Array();
    	for (var i = 0; i < relation.dependencies.length; i++) {
    		var currentIdx = i;
    		var temp = new Object();
    		temp.variables = relation.variables.slice();
    		temp.dependencies = new Array();
    		temp.dependencies = populateDependencies(relation, currentIdx, filter);
    		
    		var closureFinder = new ClosureFinder(temp);
    		closureWithoutCurrFD = closureFinder.getClosure(relation.dependencies[i].left);
    		
    		if (!closureContainsRight(closureWithoutCurrFD, relation.dependencies[i].right)) {
    			filter.push(i);
    		}
    	}

     	relation.dependencies = populateDependencies(relation, -1, filter);
    }

    function closureContainsRight(closure, right) {
    	for (var i = 0; i < right.length; i++) {
    		if (closure.indexOf(right[i]) == -1) {
    			return false;
    		}
    	}
    	return true;
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

    function populateDependencies(relation, currentIdx, filter) {
    	var temp = new Array();
    	for (var i = 0; i < relation.dependencies.length; i++) {
    		if (i != currentIdx && filter.indexOf(i) > -1) {
    			temp.push(relation.dependencies[i]);
    		}
    	}
    	return temp;
    }
}
