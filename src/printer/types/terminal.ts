import { PrintType } from "../helpers";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    return node.value as string;
};
