const logger = require("colours-logger");

var passed = 0;
var failed = 0;
var failedTests = [];
/**
 * Execute the tests and logs the results.
 * @param tests - An object with al the tests.
 * @param file - The file the tests is run from.
 */
module.exports.run = function (tests, file) {
    new TestRunner(tests, file).run();
};
/**
 * Get amount of passed tests.
 * @return {number} - The amount of passed Tests.
 */
module.exports.getPassed = function () {
    return passed;
};
/**
 * Get amount of failed tests.
 * @return {number}
 */
module.exports.getFailed = function () {
    return failed;
};
/**
 * Get a list of all failed tests.
 * @return {Array}
 */
module.exports.getFailedTests = function () {
    return failedTests
};

/**
 * Creates a TestRunner class.
 * @param tests - A object with all the tests.
 * @param {string} file - The name of the file where it is run from.
 * @constructor
 */
function TestRunner(tests, file) {
    this.tests = tests;
    this.file = file;
    this.passed = 0;
    this.failed = 0;
    this.failedTests = [];
    //TODO validate tests & file.
}

TestRunner.prototype.constructor = TestRunner;

/**
 * Tests whether a key is reserved for a special action (before
 * @param {string} key
 * @returns {boolean} reserved.
 */
function reserved(key) {
    var reserved = {
        init : true,
        beforeEach: true,
        afterEach: true,
        finished: true
    };
    return reserved[key] === true;
}

/**
 * Executes the tests.
 */
TestRunner.prototype.run = function () {
    if (this.tests.init && typeof this.tests.init === "function") {
        this.tests.init();
    }

    for (var key in this.tests) {
        if (this.tests.hasOwnProperty(key)) {
            if (!reserved(key)) {
                if (this.tests.beforeEach && typeof this.tests.beforeEach === "function") {
                    this.tests.beforeEach();
                }
                switch (typeof this.tests[key]) {
                    case "function":
                        this.executeTest(this.tests[key], key.toString());
                        break;
                    case "object":
                        this.executeParamTest(this.tests[key], key.toString());
                        break;
                }
                if (this.tests.afterEach && typeof this.tests.afterEach === "function") {
                    this.tests.afterEach();
                }
            }
        }
    }
    if (this.tests.finished && typeof this.tests.finished === "function") {
        this.tests.finished();
    }
    this.printResults();
};

/**
 * Executes a test.
 * @param test - The test to execute.
 * @param testName - The name of the test.
 */
TestRunner.prototype.executeTest = function (test, testName) {
    try {
        test();
        this.succeedTest();
    } catch (error) {
        this.failTest(error, error.toString(), testName);
    }
};

/**
 * Executes an Parametrized test.
 * @param test - The test to execute.
 * @param testName - The name of the test.
 */
TestRunner.prototype.executeParamTest = function (test, testName) {
    if (test.parameters && test.test) {
        for (var i = 0; i < test.parameters.length; i++) {
            try {
                test.test.apply(null, test.parameters[i]);
                this.succeedTest()
            }
            catch (error) {
                this.failTest(error, "Test Failed with parameters:@{cyan}" + JSON.stringify(test.parameters[i]) + "@{reset} " + error.toString(), testName);
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
TestRunner.prototype.failTest = function (error, message, testName) {
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
TestRunner.prototype.succeedTest = function () {
    this.passed++;
    passed++;
};
/**
 * Prints the results of all the tests.
 */
TestRunner.prototype.printResults = function () {
    var string = "@{yellow}======== @{white,underline}" + this.file + " @{yellow,!underline}========";
    logger.log(string);
    logger.log("@{green}Passed Tests: " + this.passed);
    logger.log("@{red}Failed Tests: " + this.failed);
    if (this.failed > 0) logger.log("@{gray}Failed Tests: " + "\n");
    for (var i = 0; i < this.failedTests.length; i++) {
        logger.log("@{yellow} Test: @{reset}" + this.failedTests[i].test);
        logger.log("@{yellow} Message: @{reset}" + this.failedTests[i].message);
        logger.log("@{yellow} Stack trace: @{reset}" + this.failedTests[i].stack + "\n");
    }
    // I just want things to look pretty :)
    logger.log("@{yellow}" + (string.replace(/\D/g, "=").replace(/\d/g, "=") + "\n"));
};