import { Doc, doc, util } from "prettier";

const { concat, join, hardline, trim, indent, dedentToRoot } = doc.builders;

export function printComment(path: any, options: any) {
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

export function printDanglingComments(path: any, options: any) {
    const parts: Doc[] = [];
    const node = path.getValue();

    if (!node || !node.comments) {
        return "";
    }

    // @ts-ignore
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

function isLastComment(path: any) {
    const stack = path.stack;
    const comments = stack[stack.length - 3];
    const currentComment = stack[stack.length - 1];
    return comments && comments[comments.length - 1] === currentComment;
}
