// TODO anys + ts-ignore

export function isSymbol(node: any, symbol: any) {
    return isType(node, "terminal") && node.value === symbol;
}

export function isType(node: any, type: any) {
    return node && node.nodeType === type;
}

export function getAll(node: any, types: any) {
    if (typeof types === "string") {
        return node[types] ? [types] : [];
    }
    // @ts-ignore
    return types.filter(type => node[type]);
}

export function getAny(node: any, types: any) {
    if (typeof types === "string") {
        return node[types] ? types : undefined;
    }
    // @ts-ignore
    return types.find(type => node[type]);
}
