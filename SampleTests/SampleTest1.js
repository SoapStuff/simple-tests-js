const Assert = require("assert");
require("../util/testRunner").run({
    test1: function () {

    },
    test2: function () {

    },
    test3: {
        test: function () {
            Assert.equal(arguments[0] + arguments[1], arguments[2])
        },
        parameters: [[1, 2, 3], [2, 3, 5], [2, 3, 6]]
    }
}, "SampleTest1");