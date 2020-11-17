// @ts-nocheck

import { CommonTokenStream, InputStream } from "antlr4";
import { ErrorListener } from "antlr4/error";
import * as CSharpLexer from "./csharp/CSharpLexer";
import * as CSharpParser from "./csharp/CSharpParser";
import { snakeCase } from "lodash";

class ThrowingErrorListener extends ErrorListener {
    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        const error = new SyntaxError(msg + " (" + line + ":" + column + ")");
        error.loc = {
            start: {
                line,
                column,
            },
        };
        throw error;
    }
}

function parseCSharp(text) {
    console.time("parse");
    const errorListener = new ThrowingErrorListener();
    const chars = new InputStream(text);
    const lexer = new CSharpLexer.CSharpLexer(chars);
    lexer.removeErrorListeners();
    lexer.addErrorListener(errorListener);

    const tokens = new CommonTokenStream(lexer);
    const parser = new CSharpParser.CSharpParser(tokens);
    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);

    const compilationUnit = parser.compilation_unit();
    const result = simplifyTree(compilationUnit);
    result.comments = tokens.tokens
        .filter(
            token =>
                token.channel == CSharpLexer.CSharpLexer.COMMENTS_CHANNEL ||
                token.channel == CSharpLexer.CSharpLexer.DIRECTIVE,
        )
        .map(token => buildComment(token));
    console.timeEnd("parse");
    return result;
}

function getNodeTypeFromChannel(token) {
    switch (token.channel) {
        case CSharpLexer.CSharpLexer.COMMENTS_CHANNEL:
            return "comment";
        case CSharpLexer.CSharpLexer.DIRECTIVE:
            return "directive";
    }
    return "unknown";
}

function buildComment(token) {
    return {
        nodeType: getNodeTypeFromChannel(token),
        start: token.start,
        end: token.stop,
        lineStart: token.line,
        lineEnd: token.line,
        value: token.text,
    };
}

const nodeNameRegex = /Context$|NodeImpl$/;

function simplifyTree(node) {
    const nodeType = snakeCase(node.constructor.name.replace(nodeNameRegex, ""));

    if (!node.children) {
        if (node.symbol) {
            return {
                nodeType,
                start: node.symbol.start,
                end: node.symbol.stop,
                lineStart: node.symbol.line,
                lineEnd: node.symbol.line,
                value: node.symbol.text,
            };
        }
    }

    const children = {};
    const orderedChildren = [];

    for (let child of node.children) {
        child = simplifyTree(child);
        if (!children[child.nodeType]) {
            children[child.nodeType] = [];
        }
        children[child.nodeType].push(child);
        orderedChildren.push(child);
    }

    return {
        ...children,
        children: orderedChildren,
        nodeType,
        start: node.start.start,
        end: node.stop.stop,
        lineStart: node.start.line,
        lineEnd: node.stop.line,
    };
}

function loc(prop) {
    return function (node) {
        return node[prop];
    };
}

const defaultExport = {
    parse: parseCSharp,
    astFormat: "cs",
    locStart: loc("start"),
    locEnd: loc("end"),
};

export default defaultExport;
