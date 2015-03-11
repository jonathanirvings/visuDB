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
}