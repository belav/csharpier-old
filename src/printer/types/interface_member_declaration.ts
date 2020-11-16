import { concat, group, hardline, indent, line, softline } from "../builders";
import { getAny, isSymbol, PrintType } from "../helpers";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    const docs = [];

    console.log(node);

    // TODO figure out what NodeType really is!
    // @ts-ignore
    const isNew = node.children.find(node => isSymbol(node, "new"));
    // @ts-ignore
    const isEvent = node.children.find(node => isSymbol(node, "event"));
    // @ts-ignore
    const isUnsafe = node.children.find(node => isSymbol(node, "unsafe"));
    const identifierDocs = path.call(print, "identifier", 0);
    const attributes = getAny(node, "attributes");
    const type = getAny(node, "type") ?? "";
    const interfaceAccessors = getAny(node, "interface_accessors");
    const formalParameterList = getAny(node, "formal_parameter_list");

    if (attributes) {
        docs.push(path.call(print, attributes, 0), hardline);
    }

    const declarationPart = [];

    if (isNew) {
        declarationPart.push("new", " ");
    }

    if (isEvent) {
        declarationPart.push("event", " ");
        declarationPart.push(path.call(print, type, 0), line, identifierDocs, ";");
    } else {
        if (isUnsafe) {
            declarationPart.push("unsafe", " ");
        }

        if (interfaceAccessors) {
            declarationPart.push(path.call(print, type, 0), line);

            if (identifierDocs) {
                declarationPart.push(identifierDocs, line);
            } else if (formalParameterList) {
                declarationPart.push("this", "[");
                declarationPart.push(indent(concat([softline, path.call(print, formalParameterList, 0)])));
                declarationPart.push("]", line);
            }

            declarationPart.push(
                group(concat(["{", indent(concat([line, path.call(print, interfaceAccessors, 0)])), line, "}"])),
            );
        } else {
            const typeParameterList = getAny(node, "type_parameter_list");
            const typeParameterConstraintsClauses = getAny(node, "type_parameter_constraints_clauses");

            declarationPart.push(type ? path.call(print, type, 0) : "void", " ");

            declarationPart.push(identifierDocs);

            if (typeParameterList) {
                declarationPart.push(path.call(print, typeParameterList, 0));
            }

            declarationPart.push("(");

            if (formalParameterList) {
                declarationPart.push(indent(concat([softline, path.call(print, formalParameterList, 0)])), softline);
            }

            declarationPart.push(")");

            if (typeParameterConstraintsClauses) {
                declarationPart.push(indent(concat([line, path.call(print, typeParameterConstraintsClauses, 0)])));
            }

            declarationPart.push(";");
        }
    }

    docs.push(group(concat(declarationPart)));

    return group(concat(docs));
};
