function Utility(){}

//return true iff left is the subset of right
Utility.isSubset = function(left, right) {
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
Utility.isProperSubset = function(left, right) {
    if (left.length == right.length || !isSubset(left,right)) {
        return false;
    }
    return true;
}


