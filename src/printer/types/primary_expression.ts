import { PrintType } from "../helpers";
import { concat, group, hardline, indent, join, softline, line, doubleHardline } from "../builders";

export const print: PrintType = (path, options, print) => {
    const parts = path.map(print, "children");

    // Partition over ".".
    const [headPart, ...tailParts] = parts.reduce(
        (groups, part) => {
            if (part === ".") {
                groups.push([]);
            }

            // @ts-ignore
            groups[groups.length - 1].push(part);

            return groups;
        },
        [[]],
    );

    if (tailParts.length === 0) {
        return group(concat(headPart));
    }

    return concat([group(concat(headPart)), indent(group(concat([softline, join(softline, tailParts.map(concat))])))]);
};
