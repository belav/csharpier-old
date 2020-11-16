const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

function doTest(directory, name) {
    const code = fs.readFileSync(path.resolve(directory, name + ".cs"), "utf8");

    const expected = fs.readFileSync(path.resolve(directory, name + ".expected.cs"), "utf8");

    const actualCode = prettier.format(code, {
        parser: "cs",
        plugins: ["."],
    });

    fs.writeFileSync(path.resolve(directory, name + ".actual.cs"), actualCode, "utf8");

    expect(actualCode).toBe(expected);
}

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(o => o.isDirectory())
        .map(o => o.name)

getDirectories(__dirname).forEach(directory => {
    const directoryPath = path.resolve(__dirname, directory);
    fs.readdirSync(directoryPath).forEach(file => {
        if (file.endsWith(".actual.cs") || file.endsWith(".expected.cs")) {
            return;
        }

        test(file, () => {
            doTest(directoryPath, file.replace(".cs", ""));
        })
    })
})
