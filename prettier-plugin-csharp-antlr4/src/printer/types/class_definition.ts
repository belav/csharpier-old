import { findAnyProperty, PrintType } from "../helpers";
import { concat, group, hardline, indent, join, softline, line, doubleHardline } from "../builders";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    const identifier = path.call(print, "identifier", 0);
    const base = findAnyProperty(node, "class_base", "struct_interfaces", "enum_base");
    const body = findAnyProperty(node, "class_body", "struct_body", "enum_body") ?? "";
    const clauses = findAnyProperty(node, "type_parameter_constraints_clauses");
    const head = [path.call(print, "children", 0), line, identifier];

    if (base) {
        head.push(line, path.call(print, base, 0));
    }

    if (clauses) {
        head.push(indent(concat([line, path.call(print, "type_parameter_constraints_clauses", 0)])));
    }

    return group(concat([group(concat(head)), line, path.call(print, body, 0)]));
};
