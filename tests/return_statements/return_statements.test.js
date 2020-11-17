const runTest = require("../runTest");

// TODO Sharplab.io can help, the return_statement is fine, it has something to do with the expression
test("Long method call formats properly", () => {
    runTest(__dirname, "LongMethodCall");
})
