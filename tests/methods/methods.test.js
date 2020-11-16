const runTest = require("../runTest");

test("Long method keeps return type and method name on same line", () => {
    runTest(__dirname, "LongMethod");
});

test("Long method keeps return type and method name on same line 2", () => {
    runTest(__dirname, "LongMethod2");
});
