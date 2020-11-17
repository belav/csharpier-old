const runTest = require("../runTest");

test("lock statement doesn't lose body", () => {
    runTest(__dirname, "LockStatement");
});
