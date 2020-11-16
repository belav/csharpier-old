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

// TODO possibly refactor, if passing a single property there is no need to call this
export function findAllProperties(node: NodeType, ...properties: string[]) {
    // @ts-ignore
    return properties.filter(type => node[type]);
}

// TODO possibly refactor, if passing a single property there is no need to call this
export function findAnyProperty(node: NodeType, ...properties: string[]) {
    // @ts-ignore
    return properties.find(type => node[type]);
}
