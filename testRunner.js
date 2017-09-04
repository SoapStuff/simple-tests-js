const path = require("path").join(__dirname, "");
const results = {
    passed: 0,
    failed: 0,
    failedTests: []
};
module.exports.getResults = function() {
    return results;
};
/**
 * Execute the tests
 * @param tests
 * @param file
 */
module.exports.run = function (tests,file) {
    var passed = 0;
    var failed = 0;
    var failedTests = [];

    for (var k in tests) {
        if (tests.hasOwnProperty(k)) {
            // Run the test
            if (typeof tests[k] === "function") {
                try {
                    tests[k]();
                    succeed()
                } catch (error) {
                    fail(error,error.toString());
                }
            }
            // Run parametrized test
            if (typeof tests[k] === "object") {
                if (tests[k].parameters && tests[k].test) {
                    for(var i = 0; i < tests[k].parameters.length; i++) {
                        try {
                            tests[k].test(tests[k].parameters[i]);
                            succeed()
                        }
                        catch (error) {
                            fail(error,"Test Failed with parameters:"+JSON.stringify(tests[k].parameters[i]) + " " + error.toString());
                        }
                    }
                } else {
                    throw new Error("A parametrized test should be in the format: {test: (function), parameters: (Array(Array(parameters))");
                }
            }
        }
    }
    printResults(passed,failed,failedTests,file);

    //Inner function
    function fail(error,message) {
        var testResult = {
            file: file,
            test: k,
            message: message,
            stack: error.stack
        };
        failedTests.push(testResult);
        results.failedTests.push(testResult);
        failed++;
        results.failed++;
    }

    function succeed(){
        passed++;
        results.passed++;
    }
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