import { doc } from "prettier";
import { getAny, PrintType } from "../helpers";
import concat = doc.builders.concat;
import line = doc.builders.line;

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    const block = getAny(node, "block");

    if (block) {
        return concat([line, path.call(print, block, 0)]);
    }

    return ";";
};
