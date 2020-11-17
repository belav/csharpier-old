const runTest = require("../runTest");

test("lock statement doesn't lose body", () => {
    runTest(__dirname, "LockStatement");
});
test("empty class", () => {
    runTest(__dirname, "EmptyClass");
});

