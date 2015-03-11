function beginTestNFAnimation() {
    var test = //not in 2NF
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

    //nf = new NFTester();
    //nf.TwoNFTest(test);

    var test2 = //in 2NF
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

    nf = new NFTester(test2);
    //nf.TwoNFTest();

    cf = new ClosureFinder(test2);
    console.log(cf.getClosure(['a']));
    //console.log(cf.getClosure(['b']));
    //console.log(cf.getClosure(['c','b']));
}

function beginTestAnimation() {
    var test1 = 
    {
        variables : ["a","name"],
        dependencies :
        [
            {
                left : ["a","b"],
                right : ["c","d"]
            } //ab -> cd
        ],
        closure :
        [
            {
                left : ["a","b"],
                right : ["a","b","c","d"]
            } //ab+ = abcd
        ],
        message : "Step 1",
        annotation : "This is step 1"
    };

    var test2 = 
    {
        variables : ["a","b","c","d","e"],
        dependencies :
        [
            {
                left : ["a","b"],
                right : ["c","d"]
            },
            {
                left : ["a","b"],
                right : ["a","b","c","d"]
            }
        ],
        closure :
        [
        ],
        message : "Step 2",
        annotation : "This is step 2"
    };

    var stateList = [];
    stateList.push(test1);
    stateList.push(test2);

    animationWidget.startAnimation(stateList);
}



