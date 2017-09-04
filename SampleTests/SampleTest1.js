const Assert = require("assert");
require("../testRunner").run({
    test1: function () {

    },
    test2: function () {

    },
    test3: {
        test: function(parameters) {
            Assert.equal(parameters[0]+parameters[1],parameters[2])
        },
        parameters: [[1,2,3],[2,3,5],[2,3,6]]
    }
},"SampleTest1");