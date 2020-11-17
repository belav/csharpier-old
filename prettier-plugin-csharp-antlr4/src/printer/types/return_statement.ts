import { concat, group } from "../builders";
import { findAnyProperty, PrintType } from "../helpers";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    const expression = findAnyProperty(node, "expression");
    const printedTerminal = path.call(print, "terminal", 0);
    const printedExpression = expression ? concat([" ", path.call(print, "expression", 0), ";"]) : ";";
    return group(concat([printedTerminal, printedExpression]));
};
