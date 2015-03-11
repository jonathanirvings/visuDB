var BernsteinAlgorithm = function(_relation) {
    var relation = _relation;

    var ThreeNFCheck = function() {
        var nf = new NFTester(relation);
        var ThreeNF = nf.ThreeNFCheck();
        return ThreeNF;
    }

    this.beginAlgorithm = function() {
        stateList = [];

        if ()
    }
}