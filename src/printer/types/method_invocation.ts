import { findAnyProperty, PrintType } from "../helpers";
import { concat, group, hardline, indent, join, softline, line, doubleHardline } from "../builders";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    const argumentList = findAnyProperty(node, "argument_list");

    // TODO something in here needs to change to deal with argument list
    return group(concat(["(", softline, argumentList ? path.call(print, argumentList, 0) : softline, ")"]));
};
