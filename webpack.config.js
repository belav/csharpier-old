module.exports = {
    entry: {
        "my-lib": "./src/index.ts",
        "my-lib.min": "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "_bundles"),
        filename: "[name].js",
        libraryTarget: "umd",
        library: "MyLib",
        umdNamedDefine: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    devtool: "source-map",
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/,
                query: {
                    declaration: false,
                },
            },
        ],
    },
};
