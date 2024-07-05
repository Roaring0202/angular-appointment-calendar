module.exports = {
    root: true,
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: ['./tsconfig.json'],
                createDefaultProgram: true,
            },
            extends: [
                'plugin:@angular-eslint/recommended',
                'airbnb-typescript/base',
            ],
            rules: {

            },
        },
    ],
};

