import { Doc } from "prettier";
import { isSymbol, PrintType } from "../helpers";
import { concat, group, hardline, indent, join, softline, line } from "../builders";

export const print: PrintType = (path, options, print) => {
    const pathParts = [];

    let currentPathPart: Doc[] = [];

    path.each(path => {
        const node = path.getValue();
        if (isSymbol(node, ".")) {
            pathParts.push(currentPathPart);
            currentPathPart = [];
        } else {
            // @ts-ignore
            currentPathPart.push(print(path, options, print));
        }
    }, "children");

    pathParts.push(currentPathPart);

    return join(".", pathParts.map(concat));
};
