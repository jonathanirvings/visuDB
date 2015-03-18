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

    this.sample1 = function() {
        relation =
        {
            variables : ["a","b","c","d"],
            dependencies :
            [
                {
                    left : ["a","b"],
                    right : ["a"]
                },
                {
                    left : ["a","b"],
                    right : ["c", "d"]
                },
                {
                    left : ["b"],
                    right : ["a","c"]
                },
                {
                    left : ["a"],
                    right : ["c"]
                }
            ]
        }
    }

    this.sample2 = function() {
        relation =
        {
            variables : ["A","B","C","D","E","F"],
            dependencies :
            [
                {
                    left : ["A"],
                    right : ["B"]
                },
                {
                    left : ["A"],
                    right : ["C"]
                },
                {
                    left : ["B"],
                    right : ["C"]
                },
                {
                    left : ["B"],
                    right : ["D"]
                },
                {
                    left : ["D"],
                    right : ["B"]
                },
                {
                    left : ["A","B","E"],
                    right : ["F"]
                }
            ]
        }
    }

    this.test = function(sampleID) {
        if (sampleID == 1) {
            this.sample1();
        } else if (sampleID == 2) {
            this.sample2();
        }
        canvasDraw.draw(relation);
    }
}


