const runTest = require("../runTest");

test("Empty if statement keeps braces on same line", () => {
    runTest(__dirname, "EmptyIfStatement");
})
