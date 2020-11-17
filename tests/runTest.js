const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

// TODO just use two files, instead of three

function runTest(directory, name) {
    const codePath = path.resolve(directory, name + ".cs");
    const code = fs.readFileSync(codePath, "utf8");

    const expectedPath = codePath.replace(".cs", ".expected.cs");

    if (!fs.existsSync(expectedPath)) {
        fs.writeFileSync(expectedPath, code, "utf8");
    }

    const expected = fs.readFileSync(expectedPath, "utf8");

    const actualCode = prettier.format(code, {
        parser: "cs",
        plugins: ["."],
        endOfLine: "auto",
    });

    fs.writeFileSync(codePath.replace(".cs", ".actual.cs"), actualCode, "utf8");

    expect(actualCode).toBe(expected);
}

module.exports = runTest;
