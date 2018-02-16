const fs = require("fs");
const logger = require("colours-logger");

var runTests = function (path) {
    fs.readdirSync(path).forEach(function (file) {
        var stat = fs.statSync(path + '/' + file);
        if (stat.isFile()) {
            require(path + '/' + file);
        } else if (stat.isDirectory()) {
            runTests(path + '/' + file);
        }
    });
};

module.exports.runTests = function (path) {
    var testRunner = require("./util/testRunner");
    runTests(path);
    logger.log("@{yellow}======== @{underline,white}TEST RESULTS @{yellow,!underline}========");
    logger.log("@{green}Passed Tests: " + testRunner.getPassed());
    logger.log("@{red}Failed Tests: " + testRunner.getFailed());
    logger.log("@{yellow}==============================");
};

/**
 * Execute the tests and logs the results.
 * @param tests - An object with al the tests.
 * @param file - The file the tests is run from.
 */
module.exports.run = function (tests, file) {
    require("./util/testRunner").run(tests, file);
};