const runTest = require("../runTest");

test("Long method keeps return type and method name on same line", () => {
    runTest(__dirname, "LongMethod");
});

test("Long interface method keeps return type and method name on same line", () => {
    runTest(__dirname, "InterfaceLongMethod");
});
