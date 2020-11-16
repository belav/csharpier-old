const { printDanglingComments } = require("./comments");
const { getAny } = require("./helpers");

const { indent, concat, hardline, line, softline } = require("prettier").doc.builders;

function print(path, options, print) {
    const node = path.getValue();
    const docs = [];

    docs.push("{");

    const statementList = getAny(node, "statement_list");

    if (statementList) {
        docs.push(indent(concat([hardline, path.call(print, statementList, 0)])));
    }

    const danglingComments = printDanglingComments(path, options);
    if (danglingComments) {
        docs.push(danglingComments);
    }

    if (docs.length === 1) {
        docs.push("}");
    } else {
        docs.push(hardline, "}");
    }

    return concat(docs);
}

module.exports = print;
