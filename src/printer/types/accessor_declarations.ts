import { Doc } from "prettier";
import { findAnyProperty, PrintType } from "../helpers";
import { concat, group, hardline, indent, join, softline, line } from "../builders";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    const attributes = findAnyProperty(node, "attributes");
    const accessorModifier = findAnyProperty(node, "accessor_modifier");
    const accessorBody = findAnyProperty(node, "accessor_body", "block") ?? "";
    const accessorOperator = path.call(print, "terminal", 0) as string;

    const docs: Doc[] = [];

    if (attributes) {
        docs.push(path.call(print, attributes, 0), line);
    }

    if (accessorModifier) {
        docs.push(path.call(print, accessorModifier, 0), line);
    }

    docs.push(accessorOperator);

    if (accessorBody == "block") {
        docs.push(line);
    }

    docs.push(path.call(print, accessorBody, 0));

    const counterAccessorDeclarations = {
        get: "set_accessor_declaration",
        set: "get_accessor_declaration",
        add: "remove_accessor_declaration",
        remove: "add_accessor_declaration",
    } as any;

    if (counterAccessorDeclarations[accessorOperator]) {
        const counterAccessorDeclaration = findAnyProperty(node, counterAccessorDeclarations[accessorOperator]);

        if (counterAccessorDeclaration) {
            docs.push(line, path.call(print, counterAccessorDeclaration, 0));
        }
    }

    return group(concat(docs));
};
