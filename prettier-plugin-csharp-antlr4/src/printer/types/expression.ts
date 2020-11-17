import { PrintType } from "../helpers";
import { concat, group, hardline, indent, join, softline, line, doubleHardline } from "../builders";

// TODO this ends up with ugly nested expression stuff, is there some way to simplify that?
export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    return path.call(print, "children", 0);
};
