const { indent, softline, group, concat, line, hardline } = require("prettier").doc.builders;

function print(path, options, print) {
    const node = path.getValue();
    const expression = path.call(print, "expression", 0);
    const ifBodies = path.map(print, "embedded_statement");
    const hasElse = ifBodies.length > 1;
    const ifHasBraces = !!node["embedded_statement"][0]["block"];
    const elseHasBraces = hasElse && !!node["embedded_statement"][1]["block"];
    const hasElseIf = hasElse && !!node["embedded_statement"][1]["if_statement"];

    const docs = ["if", " ", "(", group(concat([indent(group(concat([softline, expression]))), softline])), ")"];

    if (ifHasBraces) {
        docs.push(hardline, ifBodies[0]);
    } else {
        docs.push(indent(group(concat([hasElse ? hardline : line, ifBodies[0]]))));
    }

    if (hasElse) {
        docs.push(hardline, "else");

        if (elseHasBraces || hasElseIf) {
            docs.push(hasElseIf ? " " : hardline, ifBodies[1]);
        } else {
            docs.push(indent(group(concat([hardline, ifBodies[1]]))));
        }
    }

    return group(concat(docs));
}

module.exports = print;
