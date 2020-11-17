import { Doc, FastPath, ParserOptions } from "prettier";
import { concat, join, line } from "./builders";
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

export function getDescendant(node: NodeType, path: string) {
    const pathAccessorRegex = /^([a-zA-Z_]+)(\[([0-9])\])?$/;
    const pathParts = path.split(".");

    let currentNode = node as any;

    for (const pathPart of pathParts) {
        const match = pathAccessorRegex.exec(pathPart);

        if (!match) {
            throw new Error(`Incorrect descendant path: ${path}`);
        }

        const rank = Number(match[3]) || 0;
        const name = match[1];

        if (!currentNode[name] || !currentNode[name][rank]) {
            return null;
        }

        currentNode = currentNode[name][rank];
    }

    return currentNode;
}

export function printCommaList(list: any) {
    return join(concat([",", line]), list);
}
