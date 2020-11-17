import { PrintType } from "../helpers";
import { concat, group, hardline, indent, join, softline, line, doubleHardline } from "../builders";

export const print: PrintType = (path, options, print) => {
    return indent(concat([softline, join(concat([",", line]), path.map(print, "argument"))]));
};
