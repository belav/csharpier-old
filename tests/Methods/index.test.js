const prettier = require("prettier");
const fs = require("fs");
const path = require("path");

function doTest(name) {
    const code = fs.readFileSync(path.resolve(__dirname, name + ".cs"), "utf8");

    const expected = fs.readFileSync(path.resolve(__dirname, name + ".expected.cs"), "utf8");

    const actualCode = prettier.format(code, {
        parser: "cs",
        plugins: ["."],
    });

    fs.writeFileSync(path.resolve(__dirname, name + ".actual.cs"), actualCode, "utf8");

    expect(actualCode).toBe(expected);
}

for (const stuff of ["LongMethod", "LongMethod2"]) {
    test(stuff, () => {
        doTest(stuff);
    });
}
