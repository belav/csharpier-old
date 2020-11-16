const { printDanglingComments } = require("./comments");
const { getAny } = require("./helpers");

const { indent, concat, hardline } = require("prettier").doc.builders;

function print(path, options, print) {
    const node = path.getValue();
    const docs = [];

    docs.push("{");

    const statementList = getAny(node, "statement_list");

    if (statementList) {
        docs.push(indent(concat([hardline, path.call(print, statementList, 0)])));
    }

    docs.push(printDanglingComments(path, options));

    // TODO Decide whether we want a `hardline` or a `line` (which would inline empty blocks like `int F() { }`).
    docs.push(hardline, "}");

    return concat(docs);
}

module.exports = print;
