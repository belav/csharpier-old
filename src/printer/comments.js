const { concat, join, hardline, trim, indent, dedentToRoot } = require("prettier").doc.builders;
const util = require("prettier").util;

function printComment(path, options) {
    const node = path.getValue();

    node.printed = true;

    if (node.value.startsWith("//")) {
        return node.value.trimRight();
    } else if (node.value.startsWith("#")) {
        const isPreviousLineEmpty = util.isPreviousLineEmpty(options.originalText, node, options.locStart);
        const isNextLineEmpty = util.isNextLineEmptyAfterIndex(options.originalText, options.locEnd(node) + 1);
        const docs = [];
        if (isPreviousLineEmpty) {
            docs.push(dedentToRoot(hardline));
        }
        docs.push(trim, node.value);
        if (isNextLineEmpty && isLastComment(path)) {
            docs.push(hardline);
        }
        return concat(docs);
    } else {
        return node.value;
    }
}

function printDanglingComments(path, options) {
    const parts = [];
    const node = path.getValue();

    if (!node || !node.comments) {
        return "";
    }

    path.each(commentPath => {
        const comment = commentPath.getValue();

        if (comment && !comment.leading && !comment.trailing) {
            parts.push(printComment(commentPath, options));
        }
    }, "comments");

    if (parts.length === 0) {
        return "";
    }

    return indent(concat([hardline, join(hardline, parts)]));
}

function isLastComment(path) {
    const stack = path.stack;
    const comments = stack[stack.length - 3];
    const currentComment = stack[stack.length - 1];
    return comments && comments[comments.length - 1] === currentComment;
}

module.exports = {
    printComment,
    printDanglingComments,
}
