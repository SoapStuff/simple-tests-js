require("../util/testRunner").run({
    test3: function () {
    },
    test4: function () {
        throw new Error("Fail")
    }
},"SampleTest2");