var colors = require("colors");
module.exports.runTests = function(path) {
    var testRunner = require("./util/testRunner");
    require("fs").readdirSync(path).forEach(function(file) {
        //TODO add Tests suffix requirement?
        require(path + '/' + file);
    });
    console.log("======== ".yellow + "TEST RESULTS".underline.white +  " ========".yellow);
    console.log(("Passed Tests: " + testRunner.getPassed()).green);
    console.log(("Failed Tests: " + testRunner.getFailed()).red);
    console.log("==============================".yellow);
};

/**
 * Execute the tests and logs the results.
 * @param tests - An object with al the tests.
 * @param file - The file the tests is run from.
 */
module.exports.run = function(tests,file) {
    require("./util/testRunner").run(tests,file)
};