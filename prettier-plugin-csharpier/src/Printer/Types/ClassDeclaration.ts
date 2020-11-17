import { Doc } from "prettier";
import { ClassDeclaration } from "../NodeType";
import { PrintMethod } from "../PrintMethod";
import { concat, group, hardline, indent, join, softline, line, doubleHardline } from "../Builders";

export const print: PrintMethod<ClassDeclaration> = (path, options, print) => {
    const node = path.getValue();
    const parts: Doc[] = [];
    node.modifiers.forEach(o => parts.push(o.text));
    parts.push("class");
    parts.push(node.identifier.text);

    const hasMembers = node.members.length > 0;
    const braces: Doc[] = [];
    if (hasMembers) {

    } else {
        braces.push(" ", "{", "}")
    }

    return concat([join(" ", parts), ...braces, hardline]);
};
