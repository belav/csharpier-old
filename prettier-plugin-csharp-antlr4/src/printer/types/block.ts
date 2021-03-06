import { concat, hardline, indent } from "../builders";
import { printDanglingComments } from "../comments";
import { findAnyProperty, PrintType } from "../helpers";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    const docs = [];

    docs.push("{");

    const statementList = findAnyProperty(node, "statement_list");

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
};
