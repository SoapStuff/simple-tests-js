var passed = 0;
var failed = 0;
var failedTests = [];
/**
 * Execute the tests and logs the results.
 * @param tests - An object with al the tests.
 * @param file - The file the tests is run from.
 */
module.exports.run = function (tests,file) {
    new TestRunner(tests,file).run();
};
/**
 * Get amount of passed tests.
 * @return {number} - The amount of passed Tests.
 */
module.exports.getPassed = function() {
    return passed;
};
/**
 * Get amount of failed tests.
 * @return {number}
 */
module.exports.getFailed = function() {
    return failed;
};
/**
 * Get a list of all failed tests.
 * @return {Array}
 */
module.exports.getFailedTests = function() {
    return failedTests
};

/**
 * Creates a TestRunner class.
 * @param tests - A object with all the tests.
 * @param {string} file - The name of the file where it is run from.
 * @constructor
 */
function TestRunner(tests,file) {
    this.tests = tests;
    this.file = file;
    this.passed = 0;
    this.failed = 0;
    this.failedTests = [];
    //TODO validate tests & file.
}

TestRunner.prototype.constructor = TestRunner;
/**
 * Executes the tests.
 */
TestRunner.prototype.run = function() {
    for(var key in this.tests) {
        if (this.tests.hasOwnProperty(key)) {
            switch (typeof this.tests[key]) {
                case "function": this.executeTest(this.tests[key],key.toString()); break;
                case "object": this.executeParamTest(this.tests[key],key.toString()); break;
            }
        }
    }
    this.printResults();
};
/**
 * Executes a test.
 * @param test - The test to execute.
 * @param testName - The name of the test.
 */
TestRunner.prototype.executeTest = function(test,testName) {
    try {
        test();
        this.succeedTest()
    } catch (error) {
        this.failTest(error,error.toString(),testName);
    }
};
/**
 * Executes an Parametrized test.
 * @param test - The test to execute.
 * @param testName - The name of the test.
 */
TestRunner.prototype.executeParamTest = function(test,testName) {
    if (test.parameters && test.test) {
        for(var i = 0; i < test.parameters.length; i++) {
            try {
                test.test.apply(null, test.parameters[i]);
                this.succeedTest()
            }
            catch (error) {
                this.failTest(error, "Test Failed with parameters:" + JSON.stringify(test.parameters[i]).cyan + " " + error.toString(), testName);
            }
        }
    }
};
/**
 * Fails a test.
 * @param error - The error that is produced when the tests failed.
 * @param message - An message on why the test failed.
 * @param testName - The name of the test.
 */
TestRunner.prototype.failTest = function(error,message,testName) {
    this.failed++;
    failed++;
    var testResult = {
        file: this.file,
        test: testName,
        message: message,
        stack: error.stack
    };
    this.failedTests.push(testResult);
    failedTests.push(testResult);
};
/**
 * Succeeds an test.
 */
TestRunner.prototype.succeedTest = function() {
    this.passed++;
    passed++;
};
/**
 * Prints the results of all the tests.
 */
TestRunner.prototype.printResults = function() {
    var string = "======== ".yellow + this.file.underline.white + " ========".yellow;
    console.log(string);
    console.log(("Passed Tests: " + this.passed).green);
    console.log(("Failed Tests: " + this.failed).red);
    if(this.failed > 0) console.log("Failed Tests: " +"\n");
    for(var i = 0; i < this.failedTests.length; i++) {
        console.log(" Test: ".yellow + this.failedTests[i].test);
        console.log(" Message: ".yellow + this.failedTests[i].message);
        console.log(" Stack trace: ".yellow  + this.failedTests[i].stack + "\n");
    }
    // I just want things to look pretty :)
    console.log((string.replace(/\D/g,"=").replace(/\d/g,"=") +"\n").yellow);
};