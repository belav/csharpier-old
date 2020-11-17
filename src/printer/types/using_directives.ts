import * as _ from "lodash";
import { findAnyProperty, isType, PrintType } from "../helpers";
import { concat, group, hardline, indent, join, softline, line, doubleHardline } from "../builders";
// @ts-ignore
import * as alphanumerical from "is-alphanumerical";

export const print: PrintType = (path, options, print) => {
// Broken with preprocessor directives.
    const node = path.getValue();

    if (hasPreprocessorDirectives(node)) {
        return join(hardline, path.map(print, "children"));
    }

    // @ts-ignore
    const getUsingPath = parts => {
        if (typeof parts === "string" && parts !== "using" && parts != "static" && alphanumerical(parts)) {
            return parts;
        } else if (parts.type === "group" || parts.type === "indent") {
            return getUsingPath(parts.contents);
        } else if (parts.type === "concat") {
            return parts.parts.map(getUsingPath).join("");
        } else {
            return "";
        }
    };

    const sortUsingDirectives = (docs: any) => {
        for (const doc of docs) {
            doc.usingPath = getUsingPath(doc);
        }

        const [systems, others] = _.map(
            _.partition(docs, doc => doc.usingPath.startsWith("System")),
            docs => _.sortBy(docs, ["usingPath"]),
        );

        return systems.concat(others);
    };

    const namespaces = findAnyProperty(node, "using_namespace_directive");
    const aliases = findAnyProperty(node, "using_alias_directive");
    const statics = findAnyProperty(node, "using_static_directive");

    const docs = [namespaces, aliases, statics]
        .filter(usings => usings)
        // @ts-ignore
        .map(usings => join(hardline, sortUsingDirectives(path.map(print, usings))));

    return join(doubleHardline, docs);
};

function hasPreprocessorDirectives(node: any) {
    return (
        (node.comments && node.comments.find((child: any) => isType(child, "directive"))) ||
        (node.children && node.children.find(hasPreprocessorDirectives))
    );
}
