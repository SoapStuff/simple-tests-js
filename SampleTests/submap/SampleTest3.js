const Assert = require("assert");
var answer = 0;
var list = [];
require("../../util/testRunner").run({
        init: function () {
            answer = 1;
        },
        beforeEach: function() {
            list = [];
        },
        afterEach: function() {
            console.log("test succeeded");
        },
        finished: function() {
            answer = 0;
        },
        test1: function () {
            list.push(1);
            Assert.equal(answer,list.length);
        },
        test2: function () {
            list.push(1);
            Assert.equal(answer,list.length);
        }
    },"SampleTest3");