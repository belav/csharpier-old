function isSymbol(node, symbol) {
    return isType(node, "terminal") && node.value === symbol;
}

function isType(node, type) {
    return node && node.nodeType === type;
}

function getAll(node, types) {
    if (typeof types === "string") {
        return node[types] ? [types] : [];
    }
    return types.filter(type => node[type]);
}

function getAny(node, types) {
    if (typeof types === "string") {
        return node[types] ? types : undefined;
    }
    return types.find(type => node[type]);
}

module.exports = {
    isSymbol,
    isType,
    getAll,
    getAny, 
}
