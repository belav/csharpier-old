import { PrintType } from "../helpers";
import { concat, group, hardline, indent, join, softline, line, doubleHardline } from "../builders";

export const print: PrintType = (path, options, print) => {
    // TODO see call-arguments in the prettier source code
    // we can use conditionalGroup and willBreak to figure out things

    return join(concat([",", line]), path.map(print, "argument"));
};
