var MinimalCover = function(_relation) {
	
	this.relation = _relation;

this.something = function redundantFD(relation) {
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

var test =
{
    variables : ["a","b","c"],
    dependencies :
    [
        {
            left : ["a","b"],
            right : ["a"]
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

var minimalCover = new MinimalCover(test);
minimalCover.something(test);
console.log(minimalCover.relation.dependencies);
