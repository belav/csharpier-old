import { Doc } from "prettier";
import { printDanglingComments } from "../comments";
import { findAllProperties, findAnyProperty, printCommaList, PrintType } from "../helpers";
import { concat, group, hardline, indent, join, softline, line, doubleHardline } from "../builders";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    const groupedDeclarations = findAnyProperty(node, "class_member_declarations", "namespace_member_declarations");

    const lineSeparatedDeclarations = findAllProperties(
        node,
        "interface_member_declaration",
        "struct_member_declaration",
    );

    const commaSeparatedDeclarations = findAllProperties(node, "enum_member_declaration");
    const externAliasDirectives = findAnyProperty(node, "extern_alias_directives");
    const usingDirectives = findAnyProperty(node, "using_directives");

    const hasDeclarations =
        lineSeparatedDeclarations.length ||
        commaSeparatedDeclarations.length ||
        groupedDeclarations ||
        externAliasDirectives ||
        usingDirectives;

    const docs: Doc[] = ["{"];

    docs.push(printDanglingComments(path, options));

    if (hasDeclarations) {
        const declarationParts = [];

        if (externAliasDirectives) {
            declarationParts.push(path.call(print, externAliasDirectives, 0));
        }

        if (usingDirectives) {
            declarationParts.push(path.call(print, usingDirectives, 0));
        }

        if (groupedDeclarations) {
            declarationParts.push(path.call(print, groupedDeclarations, 0));
        }

        if (lineSeparatedDeclarations.length) {
            // @ts-ignore
            declarationParts.push(...path.map(print, lineSeparatedDeclarations));
        }

        if (commaSeparatedDeclarations.length) {
            // @ts-ignore
            declarationParts.push(printCommaList(path.map(print, commaSeparatedDeclarations)));
        }

        docs.push(indent(concat([hardline, join(doubleHardline, declarationParts)])));
        docs.push(hardline);
    } else {
        docs.push(line);
    }
    docs.push("}");

    return group(concat(docs));
};
