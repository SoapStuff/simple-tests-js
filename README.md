# simple-tests-js
A small test framework for running automated and parametrized tests.
## Install
```
npm install simple-tests-js --save-dev
```
## How to use

#### Writing a test file
```javascript
// The default nodejs assert library.
const Assert = require("assert");
require("simple-tests-js").run({
        init: function () {
            // This is called once at the start of executing this file.
        },
        beforeEach: function() {
            // This function is called for each test
        },
        afterEach: function() {
            // This function is called after each test
        },
        finished: function() {
          // This function is called when all tests are finished.
        },
        test1: function () {
            // Write here your test code.
            Assert.equal(object1,object2);
        },
        test2: function () {
            // Write here your test code
            throw new Error("This test failed")
        },
        test3: {
            test: function () {
                    Assert.equal(arguments[0] + arguments[1], arguments[2])
                },
            parameters: [[1, 2, 3], [2, 3, 5], [2, 3, 6]]
        },
        test4: {
            test: function (a, b, aPlusB) {
                 Assert.equal(a + b, aPlusB)
            },
            parameters: [[1, 2, 3], [2, 3, 5], [2, 3, 6]]
        }
    },"MyTestName");
```

#### Running all test file in this folder and sub folders.
```javascript
require("simple-tests-js").runTests(__dirname);
```

#### Results
```
======== SampleTest1 ========
Passed Tests: 4
Failed Tests: 1
Failed Tests: 

 Test: test3
 Message: Test Failed with parameters:[2,3,6] AssertionError: 5 == 6
 Stack trace: AssertionError: 5 == 6
    at test ...

=============================
-
======== SampleTest2 ========
Passed Tests: 1
Failed Tests: 1
Failed Tests: 

 Test: test4
 Message: Error: Fail
 Stack trace: Error: Fail
    at test4 ....

=============================
-
======== SampleTest3 ========
Passed Tests: 2
Failed Tests: 0
=============================
-
======== TEST RESULTS ========
Passed Tests: 7
Failed Tests: 2
==============================
-
Process finished with exit code 0
```

#### Folder structure
```
_runTests.js
test1.js
test2.js
/tests3
    test3_1.js
    test3_2.js
```