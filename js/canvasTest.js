function beginTestCanvas(){
    var test = 
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
        message : "",
        annotation : ""
    };

    canvasDraw.draw(test);

}