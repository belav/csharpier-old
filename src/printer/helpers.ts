import { Doc, FastPath, ParserOptions } from "prettier";

interface NodeType {
    nodeType: string,
    start: number,
    end: number,
    lineStart: number,
    lineEnd: number,
    value?: string,
    embedded_statement?: any,
}

export type PrintType = (
    path: FastPath<NodeType>,
    options: ParserOptions<NodeType>,
    print: (path: FastPath<NodeType>) => Doc,
) => Doc;

export function isSymbol(node: NodeType, symbol: string) {
    return isType(node, "terminal") && node.value === symbol;
}

export function isType(node: NodeType, type: string) {
    return node && node.nodeType === type;
}

export function getAll(node: NodeType, ...types: string[]) {
    return types.filter(type => node[type]);
}

export function getAny(node: NodeType, ...types: string[]) {
    return types.find(type => node[type]);
}
