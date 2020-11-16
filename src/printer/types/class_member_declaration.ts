import { concat, group, hardline, join, line } from "../builders";
import { getAny, PrintType } from "../helpers";
import {
    printMethodDeclarationBody,
    printMethodDeclarationSignatureBase,
    printMethodDeclarationSignatureConstraints,
    printTypedMemberDeclarationBody,
    printTypedMemberDeclarationSignature,
} from "../index";

export const print: PrintType = (path, options, print) => {
    const node = path.getValue();
    const attributes = getAny(node, "attributes");
    const allMemberModifiers = getAny(node, "all_member_modifiers");
    const commonMemberDeclaration = getAny(node, "common_member_declaration");
    const destructorDefinition = getAny(node, "destructor_definition");
    const type = getAny(node, "type");

    const attributesPart = [];
    const signaturePart = [];
    const bodyPart = [];

    if (attributes) {
        attributesPart.push(group(concat([path.call(print, "attributes", 0), hardline])));
    }

    if (allMemberModifiers) {
        signaturePart.push(path.call(print, allMemberModifiers, 0), " ");
    }

    if (commonMemberDeclaration) {
        // @ts-ignore
        const declaration = getAny(node[commonMemberDeclaration][0], "method_declaration", "typed_member_declaration");

        if (declaration === "method_declaration") {
            // It's always void (otherwise it's a typed_member_declaration).
            signaturePart.push(
                "void",
                " ",
                path.call(
                    () => printMethodDeclarationSignatureBase(path, options, print),
                    commonMemberDeclaration,
                    0,
                    declaration,
                    0,
                ),
                path.call(
                    () => printMethodDeclarationSignatureConstraints(path, options, print),
                    commonMemberDeclaration,
                    0,
                    declaration,
                    0,
                ),
            );
            bodyPart.push(
                path.call(
                    () => printMethodDeclarationBody(path, options, print),
                    commonMemberDeclaration,
                    0,
                    declaration,
                    0,
                ),
            );
        } else if (declaration === "typed_member_declaration") {
            signaturePart.push(
                path.call(
                    () => printTypedMemberDeclarationSignature(path, options, print),
                    commonMemberDeclaration,
                    0,
                    declaration,
                    0,
                ),
            );
            bodyPart.push(
                path.call(
                    () => printTypedMemberDeclarationBody(path, options, print),
                    commonMemberDeclaration,
                    0,
                    declaration,
                    0,
                ),
            );
        } else {
            signaturePart.push(path.call(print, commonMemberDeclaration, 0));
        }
    } else if (destructorDefinition) {
        signaturePart.push(path.call(print, destructorDefinition, 0));
    } else if (type) {
        signaturePart.push("fixed", line, path.call(print, type, 0));
        bodyPart.push(line, join(line, path.map(print, "fixed_size_buffer_declarator")), ";");
    }

    return group(concat([group(concat(attributesPart)), group(concat(signaturePart)), group(concat(bodyPart))]));
};
