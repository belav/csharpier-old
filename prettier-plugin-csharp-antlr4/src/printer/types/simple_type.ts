import { PrintType } from "../helpers";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue() as any;

    // TODO findAnyProperty?
    for (const typeType of [
        "predefined_type",
        "simple_type",
        "numeric_type",
        "integral_type",
        "floating_point_type",
        "terminal",
    ]) {
        if (node[typeType]) {
            return path.call(print, typeType, 0);
        }
    }

    return "bool";
};
