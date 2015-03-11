function MainButton() {
    var relation = new Object();
    relation.variables = new Array();
    relation.dependencies = new Array();

    this.getRelation = function() {
        return this.relation;
    }

    this.addAttribute = function(attribute) {
        relation.variables.push(attribute);
        canvasDraw.draw(relation);
    }

    this.addFD = function(_left, _right) {
        newFD = {left : _left, right : _right}
        relation.dependencies.push(newFD);
        canvasDraw.draw(relation);
    }

    this.findClosure = function(attributes) {
        cs = new ClosureFinder(relation);
        cs.getClosure(attributes);
        canvasDraw.draw(relation);
    }

    this.bernsteinAlgorithm = function() {
        ba = new BernsteinAlgorithm(relation);
        ba.beginAlgorithm();
    }

    this.test = function() {
        relation = //in 2NF
        {
            variables : ["a","b","c","d"],
            dependencies :
            [
                {
                    left : ["a","b"],
                    right : ["c"]
                },
                {
                    left : ["a"],
                    right : ["b"]
                },
                {
                    left : ["d"],
                    right : ["c"]
                }
            ]
        }
        canvasDraw.draw(relation);
    }
}


