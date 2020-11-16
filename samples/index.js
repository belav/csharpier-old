const prettier = require("prettier");
const fs = require("fs");
const path = require("path");

fs.readdirSync(__dirname).forEach(file => {
   if (!file.endsWith(".cs") || file.endsWith(".Formatted.cs")) {
       return
   }

    const referenceFile = path.join(__dirname, file);
    const formattedFile = referenceFile.replace(".cs", ".Formatted.cs");

    const referenceCode = fs.readFileSync(referenceFile, "utf8");

    const formattedCode = prettier.format(referenceCode, {
        parser: "cs",
        plugins: ["."],
        endOfLine: "auto",
    });

    fs.writeFileSync(formattedFile, formattedCode, "utf8");
});
