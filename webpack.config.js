const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const typesDirectory = path.resolve(__dirname, "src/printer/types");

generateTypesFile = () => {
    let typesFile = "";
    fs.readdirSync(typesDirectory).forEach(typeFile => {
        typesFile += `export { print as ${typeFile.replace(".ts", "")} } from "./types/${typeFile.replace(".ts", "")}"\r\n`;
    })

    const typesFilePath =path.resolve(__dirname, "src/printer/types.ts")

    if (!fs.existsSync(typesFilePath) || fs.readFileSync(typesFilePath, "utf8") !== typesFile) {
        // this may trigger HMR if the file doesn't exist or is being changed.
        fs.writeFileSync(typesFilePath, typesFile);
    }
}

fs.watch(typesDirectory, () => {
    generateTypesFile();
})

generateTypesFile();

module.exports = env => {
    return {
        watch: env && env.watch,
        watchOptions: {
            ignored: /node_modules/
        },
        entry: [
            "./src/index.ts"
        ],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "index.js",
            libraryTarget: "umd",
            library: "csharpier",
            umdNamedDefine: true,
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        devtool: "source-map",
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "./src/csharp",
                        to: "csharp",
                    }
                ]
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: path.resolve(__dirname, "src"),
                    use: ["babel-loader", "awesome-typescript-loader"],
                },
            ],
        },
        target: "node",
        externals: {
            lodash: {
                commonjs: "lodash",
                commonjs2: "lodash",
                amd: "lodash",
                root: "_",
            },
            "./csharp/CSharpLexer": {
                commonjs: "./csharp/CSharpLexer",
                commonjs2: "./csharp/CSharpLexer",
                amd: "./csharp/CSharpLexer",
            },
            "./csharp/CSharpParser": {
                commonjs: "./csharp/CSharpParser",
                commonjs2: "./csharp/CSharpParser",
                amd: "./csharp/CSharpParser",
            },
            "prettier": {
                commonjs: "prettier",
                commonjs2: "prettier",
                amd: "prettier",
            },
            "antlr4": {
                commonjs: "antlr4",
                commonjs2: "antlr4",
                amd: "antlr4",
            },
            "antlr4/error": {
                commonjs: "antlr4/error",
                commonjs2: "antlr4/error",
                amd: "antlr4/error",
            }
        }
    }
};
