export interface NodeType<T = string> {
    nodeType: T,
    start: number,
    end: number,
    lineStart: number,
    lineEnd: number,
    value?: string,
}

export interface IfStatement extends NodeType<"if_statement"> {
    embedded_statement: EmbeddedStatement[];
}

export interface EmbeddedStatement extends NodeType<"embedded_statement"> {
    block: NodeType[];
    children: NodeType[];
    if_statement?: NodeType;
}
