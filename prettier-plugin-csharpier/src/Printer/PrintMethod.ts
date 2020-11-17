import { Doc, FastPath, ParserOptions } from "prettier";
import { NodeType } from "./NodeType";

export type PrintMethod<T = NodeType> = (
    path: FastPath<T>,
    options: ParserOptions<T>,
    print: (path: FastPath<T>) => Doc,
) => Doc;
