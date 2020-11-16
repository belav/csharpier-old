import { Doc, FastPath, ParserOptions } from "prettier";
import { NodeType } from "./NodeTypes";

export type PrintType<T = NodeType> = (
    path: FastPath<T>,
    options: ParserOptions<T>,
    print: (path: FastPath<T>) => Doc,
) => Doc;

export function isSymbol(node: NodeType, symbol: string) {
    return isType(node, "terminal") && node.value === symbol;
}

export function isType(node: NodeType, type: string) {
    return node && node.nodeType === type;
}

export function getAll(node: NodeType, ...types: string[]) {
    // @ts-ignore
    return types.filter(type => node[type]);
}

export function getAny(node: NodeType, ...types: string[]) {
    // @ts-ignore
    return types.find(type => node[type]);
}
