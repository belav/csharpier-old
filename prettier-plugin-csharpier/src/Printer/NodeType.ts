export interface NodeType<T = string> {
    nodeType: T;
}

export interface ClassDeclaration extends NodeType<"ClassDeclaration"> {
    modifiers: { value: string, text: string }[];
    identifier: {
        text: string;
    },
    members: NodeType[],
}
