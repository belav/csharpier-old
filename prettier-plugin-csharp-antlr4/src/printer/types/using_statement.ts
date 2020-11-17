import { Doc } from "prettier";
import { concat, group, hardline, indent, join, softline } from "../builders";
import { findAllProperties, findAnyProperty, getDescendant, PrintType } from "../helpers";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    const capturedExpressions = findAllProperties(
        node,
        "expression",
        "resource_acquisition",
        "pointer_type",
        "fixed_pointer_declarators",
    );
    const embeddedStatement = getDescendant(node, "embedded_statement");
    const hasBraces = !!findAnyProperty(embeddedStatement, "block");

    const docs: Doc[] = [
        group(
            concat([
                path.call(print, "terminal", 0),
                " ",
                "(",
                group(
                    concat([
                        indent(
                            group(
                                concat([
                                    softline,
                                    join(
                                        " ",
                                        capturedExpressions.map(expression => path.call(print, expression, 0)),
                                    ),
                                ]),
                            ),
                        ),
                        softline,
                    ]),
                ),
                ")",
            ]),
        ),
    ];

    const onlyContainsACapturingStatement =
        !hasBraces && !!findAnyProperty(embeddedStatement, "using_statement", "fixed_statement", "lock_statement");

    const statementDocs = path.call(print, "embedded_statement", 0);

    if (hasBraces || onlyContainsACapturingStatement) {
        docs.push(hardline, statementDocs);
    } else {
        docs.push(indent(group(concat([hardline, statementDocs]))));
    }

    return group(concat(docs));
};
