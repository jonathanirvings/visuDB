function MainButton() {
    var relation = new Object();
    relation.variables = new Array();
    relation.dependencies = new Array();

    this.getRelation = function() {
        return this.relation;
    }

    this.addAttribute = function(attribute) {
        if(relation.variables.length < 10){
            relation.variables.push(attribute);
            canvasDraw.draw(relation);
        } else {
            alert('You can have only up to 10 variables');
        }
    }

    this.addFD = function(_left, _right) {
        newFD = {left : _left, right : _right}
        if(relation.dependencies.length < 10){
            relation.dependencies.push(newFD);
            canvasDraw.draw(relation);
        } else {
            alert('You can have only up to 10 functional dependencies');
        }
    }

    this.findClosure = function(attributes) {
        cs = new ClosureFinder(relation);
        cs.getClosure(attributes);
        canvasDraw.draw(relation);
    }

    this.deleteAttribute = function(attribute) {
        for (var i = 0; i < relation.variables.length; ++i) {
            if (relation.variables[i] == attribute) {
                relation.variables.splice(i,1);
                break;
            }
        }
        for (var i = 0; i < relation.dependencies.length; ++i) {
            if (Utility.isSubset([attribute],relation.dependencies[i].left) || Utility.isSubset([attribute],relation.dependencies[i].right)) {
                relation.dependencies.splice(i,1);
                --i;
            }
        }
        canvasDraw.draw(relation);
    }

    this.deleteDependency = function(dependencyLeft, dependencyRight) {
        for (var i = 0; i < relation.dependencies.length; ++i) {
            if (Utility.isEqual(relation.dependencies[i].left,dependencyLeft) && Utility.isEqual(relation.dependencies[i].right,dependencyRight)) {
                relation.dependencies.splice(i,1);
                break;
            }
        }
        canvasDraw.draw(relation);
    }

    this.deleteAll = function() {
        relation.variables = [];
        relation.dependencies = [];
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

    this.sample3 = function() {
        relation =
        {
            variables : ["A","B","C","D","X1","X2"],
            dependencies :
            [
                {
                    left : ["X1","X2"],
                    right : ["A","D"]
                },
                {
                    left : ["C","D"],
                    right : ["X1","X2"]
                },
                {
                    left : ["A","X1"],
                    right : ["B"]
                },
                {
                    left : ["B","X2"],
                    right : ["C"]
                },
                {
                    left : ["C"],
                    right : ["A"]
                }
            ]
        }
    }
    this.sample4 = function() {
        relation =
        {
            variables : ["A","B","C","D","E","F"],
            dependencies :
            [
                {
                    left : ["A","B"],
                    right : ["C","D","F"]
                },
                {
                    left : ["A"],
                    right : ["C"]
                },
                {
                    left : ["D"],
                    right : ["E"]
                }
            ]
        }
    }

    this.sample5 = function() {
        relation =
        {
            variables : ["A","B","D","E"],
            dependencies :
            [
                {
                    left : ["A","B"],
                    right : ["D","E"]
                },
                {
                    left : ["D"],
                    right : ["E"]
                }
            ]
        }
    }

    this.sample6 = function() {
        relation =
        {
            variables : ["A","B","C","D","E"],
            dependencies :
            [
                {
                    left : ["A","B"],
                    right : ["D","E"]
                },
                {
                    left : ["D"],
                    right : ["E"]
                }
            ]
        }
    }

    this.test = function(sampleID) {
        if (sampleID == 1) {
            this.sample1();
        } else if (sampleID == 2) {
            this.sample2();
        } else if (sampleID == 3) {
            this.sample3();
        } else if (sampleID == 4) {
            this.sample4();
        } else if (sampleID == 5) {
            this.sample5();
        } else if (sampleID == 6) {
            this.sample6();
        }
        canvasDraw.draw(relation);
    }

    this.NFTesterMB = function(testerID) {
        nf = new NFTester(relation);
        stateList = [];
        if (testerID == 2) {
            nf.TwoNFTest(stateList);
        } else if (testerID == 3) {
            nf.ThreeNFTest(stateList);
        } else if (testerID == 5) {
            nf.BCNFTest(stateList);
        }
        animationWidget.startAnimation(stateList);
    }

    this.draw = function(index) {
        animationWidget.load(index);
    }
}


