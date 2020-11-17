import { Doc } from "prettier";
import { findAnyProperty, PrintType } from "../helpers";
import { concat, group, hardline, indent, join, softline, line, doubleHardline } from "../builders";
import { argument_list } from "../types";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    let stuff: Doc = softline;
    // @ts-ignore
    if (node["argument_list"]) {
        stuff = path.call(print, "argument_list", 0);
    }

    return group(concat(["(", stuff, ")"]));
};
