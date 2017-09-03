const path = require("path").join(__dirname, "");
const results = {
    passed: 0,
    failed: 0,
    failedTests: []
};
module.exports.getResults = function() {
    return results;
};
module.exports.run = function (tests,file) {
    //TODO Better way to remove the double slashes? Also check if this is a problem everywhere.

    var passed = 0;
    var failed = 0;
    var failedTests = [];

    for (var k in tests) {
        if (tests.hasOwnProperty(k))
            if (typeof tests[k] === "function") {
                try {
                    tests[k]();
                    passed++;
                    results.passed++;
                } catch (error) {
                    var testResult = {
                        file: file,
                        test: k,
                        message: error.toString(),
                        stack: error.stack
                    };
                    failedTests.push(testResult);
                    results.failedTests.push(testResult);
                    failed++;
                    results.failed++;
                }
            }
    }
    printResults(passed,failed,failedTests,file);
};

function printResults(passed,failed,failedTests,file) {
    var string = "======== " + file + " ========";
    console.log(string);
    console.log("Passed Tests: " + passed);
    console.log("Failed Tests: " + failed);
    if(failed > 0) console.log("Failed Tests: " +"\n");
    for(var i = 0; i < failedTests.length; i++) {
        console.log(" Test: " + failedTests[i].test);
        console.log(" Message: " + failedTests[i].message);
        console.log(" Stack trace: " + failedTests[i].stack +"\n");
    }
    // I just want things to look pretty :)
    console.log(string.replace(/\D/g,"=").replace(/\d/g,"=") +"\n");
}