import { findAnyProperty, PrintType } from "../helpers";
import { concat, group, hardline, indent, join, softline, line } from "../builders";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    const forInitializer = findAnyProperty(node, "for_initializer");
    const expression = findAnyProperty(node, "expression");
    const forIterator = findAnyProperty(node, "for_iterator");

    return group(
        concat([
            group(
                concat([
                    "for",
                    " ",
                    "(",
                    indent(
                        group(
                            concat([
                                softline,
                                join(
                                    concat([";", line]),
                                    [forInitializer, expression, forIterator].map(e =>
                                        e ? path.call(print, e, 0) : "",
                                    ),
                                ),
                            ]),
                        ),
                    ),
                    softline,
                    ")",
                ]),
            ),
            line,
            path.call(print, "embedded_statement", 0),
        ]),
    );
};
