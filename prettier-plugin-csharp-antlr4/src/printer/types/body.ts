import { doc } from "prettier";
import { findAnyProperty, PrintType } from "../helpers";
import concat = doc.builders.concat;
import line = doc.builders.line;

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    const block = findAnyProperty(node, "block");

    if (block) {
        return concat([line, path.call(print, block, 0)]);
    }

    return ";";
};
