var passed = 0;
var failed = 0;
var failedTests = [];

module.exports.getResults = function() {
    return results;
};
/**
 * Execute the tests and logs the results.
 * @param tests - An object with al the tests.
 * @param file - The file the tests is run from.
 */
module.exports.run = function (tests,file) {
    new TestRunner(tests,file).run();
};

module.exports.getPassed = function() {
    return passed;
};
module.exports.getFailed = function() {
    return failed;
};
module.exports.getFailedTests = function() {
    return failedTests
};

function TestRunner(tests,file) {
    this.tests = tests;
    this.file = file;
    this.passed = 0;
    this.failed = 0;
    this.failedTests = [];
    //TODO validate tests & file.
}

TestRunner.prototype.constructor = TestRunner;
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
TestRunner.prototype.executeTest = function(test,testName) {
    try {
        test();
        this.succeedTest()
    } catch (error) {
        this.failTest(error,error.toString(),testName);
    }
};
TestRunner.prototype.executeParamTest = function(test,testName) {
    if (test.parameters && test.test) {
        for(var i = 0; i < test.parameters.length; i++) {
            try {
                test.test(test.parameters[i]);
                this.succeedTest()
            }
            catch (error) {
                this.failTest(error,"Test Failed with parameters:"+JSON.stringify(test.parameters[i]) + " " + error.toString(),testName);
            }
        }
    } else {
        console.log("Failed test " + testName + "because of invalid format.");
    }
};
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
TestRunner.prototype.succeedTest = function() {
    this.passed++;
    passed++;
};
TestRunner.prototype.printResults = function() {
    var string = "======== " + this.file + " ========";
    console.log(string);
    console.log("Passed Tests: " + this.passed);
    console.log("Failed Tests: " + this.failed);
    if(this.failed > 0) console.log("Failed Tests: " +"\n");
    for(var i = 0; i < this.failedTests.length; i++) {
        console.log(" Test: " + this.failedTests[i].test);
        console.log(" Message: " + this.failedTests[i].message);
        console.log(" Stack trace: " + this.failedTests[i].stack +"\n");
    }
    // I just want things to look pretty :)
    console.log(string.replace(/\D/g,"=").replace(/\d/g,"=") +"\n");
};