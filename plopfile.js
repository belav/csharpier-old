module.exports = function (plop) {
    plop.setGenerator("nodeType", {
        prompts: [
            {
                type: "input",
                name: "name",
                message: "name?",
            },
        ],

        actions: [
            {
                type: "add",
                path: "src/printer/types/{{name}}.ts",
                templateFile: "templates/nodeType.hbs",
            },
        ],
    });
};
