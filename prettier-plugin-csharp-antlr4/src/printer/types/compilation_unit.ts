import { findAnyProperty, PrintType } from "../helpers";
import { concat, doubleHardline, group, hardline, indent, join, softline, line } from "../builders";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    const parts = [];

    const externAliasDirectives = findAnyProperty(node, "extern_alias_directives");
    const usingDirectives = findAnyProperty(node, "using_directives");
    const globalAttributeSections = findAnyProperty(node, "global_attribute_section");
    const namespaceMemberDeclarations = findAnyProperty(node, "namespace_member_declarations");

    if (externAliasDirectives) {
        parts.push(path.call(print, externAliasDirectives, 0));
    }

    if (usingDirectives) {
        parts.push(path.call(print, usingDirectives, 0));
    }

    if (globalAttributeSections) {
        parts.push(join(hardline, path.map(print, globalAttributeSections)));
    }

    if (namespaceMemberDeclarations) {
        parts.push(path.call(print, namespaceMemberDeclarations, 0));
    }

    return concat([join(doubleHardline, parts), line]);
};
