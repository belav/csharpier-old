// @ts-ignore
import { spawnSync } from "child_process";
import * as fs from "fs";

// TODO this is probably wrong
function loc(prop: any) {
    return function (node: any) {
        return node[prop];
    };
}

function parseText(text: string) {
    const executionResult = spawnSync("dotnet",["exec", "..\\Parser\\bin\\Debug\\netcoreapp2.2\\Parser.dll", text]);
    const error = executionResult.stderr.toString();
    if (error) {
        console.log(error);
        throw new Error(error);
    }

    return executionResult;
}

function parseCSharp(text: string) {
    console.time("parse");

    const executionResult = parseText(text);

    const res = executionResult.stdout.toString();
    fs.writeFileSync("test.json", res, "utf8")
    const ast = JSON.parse(res);

    console.timeEnd("parse");

    return ast;
}

const defaultExport = {
    parse: parseCSharp,
    astFormat: "cs",
    // hasPragma
    locStart: loc("start"),
    locEnd: loc("end"),
    // preprocess
};

export default defaultExport;
