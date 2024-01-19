module.exports = {
    // Configuration for JavaScript files
    extends: ["dpa-infocom/react-typescript"],
    rules: {
        "no-restricted-imports": [
            "error",
            {
                patterns: ["../"],
            },
        ],
    },
    ignorePatterns: [
        "./package.json",
        "./package-lock.json",
        "dist",
        ".eslintrc.cjs",
        "*.astro",
        "playwright.config.ts",
        "tests-examples",
        "tests",
    ],
    overrides: [
        // Configuration for astro files
        {
            // Define the configuration for `.astro` file.
            files: ["*.astro"],
            // Allows Astro components to be parsed.
            parser: "astro-eslint-parser",
            // Parse the script in `.astro` as TypeScript by adding the following configuration.
            // It's the setting you need when using TypeScript.
            parserOptions: {
                parser: "@typescript-eslint/parser",
                extraFileExtensions: [".astro"],
                tsconfigRootDir: __dirname,
            },
            rules: {
                // override/add rules settings here, such as:
                // "astro/no-set-html-directive": "error"
            },
        },
        // Configuration for mjs files
        {
            files: ["**/*.mjs"],
            parserOptions: {
                sourceType: "module",
                ecmaVersion: 2015,
                tsconfigRootDir: __dirname,
            },
            extends: ["plugin:prettier/recommended"],
            rules: {
                "import/no-extraneous-dependencies": "off", // mjs is only used by Astro for configuration, false positive
                "import/no-unresolved": "off", // Also false positive with mjs file
            },
        },
        // Configuration for TypeScript files
        {
            env: {
                node: true,
                browser: true,
                es2021: true,
            },
            files: ["**/*.ts", "**/*.tsx"],
            extends: ["dpa-infocom/react-typescript"],
            plugins: ["@typescript-eslint", "react", "react-hooks", "import"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaVersion: "latest",
                project: "./tsconfig.json",
                sourceType: "module",
                tsconfigRootDir: __dirname,
            },
        },
        // Configuration for Astro
        {
            files: ["**/*.astro"],
            plugins: [
                "@typescript-eslint",
                "react",
                "unused-imports",
                "tailwindcss",
                "simple-import-sort",
            ],
            extends: [
                "plugin:tailwindcss/recommended",
                "airbnb-typescript",
                "plugin:prettier/recommended",
            ],
            parser: "astro-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
                project: "./tsconfig.json",
                extraFileExtensions: [".astro"],
                tsconfigRootDir: __dirname,
            },
            rules: {
                "import/extensions": [
                    "error",
                    "ignorePackages",
                    {
                        js: "never",
                        jsx: "never",
                        ts: "never",
                        tsx: "never",
                        "": "never",
                    },
                ], // Avoid missing file extension errors in .astro files
                "import/no-unresolved": [
                    "error",
                    {
                        ignore: ["@/*"],
                    },
                ], // Disable no-unresolved rule for .astro files
                "react/jsx-filename-extension": [1, { extensions: [".astro"] }], // Accept jsx in astro files
                "react/destructuring-assignment": "off", // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
                "react/require-default-props": "off", // Allow non-defined react props as undefined
                "react/jsx-props-no-spreading": "off", // _app.tsx uses spread operator and also, react-hook-form
                "@typescript-eslint/comma-dangle": "off", // Avoid conflict rule between Eslint and Prettier
                "@typescript-eslint/consistent-type-imports": "error", // Ensure `import type` is used when it's necessary
                "import/prefer-default-export": "off", // Named export is easier to refactor automatically
                "tailwindcss/classnames-order": [
                    "warn",
                    {
                        officialSorting: true,
                    },
                ], // Follow the same ordering as the official plugin `prettier-plugin-tailwindcss`
                "simple-import-sort/imports": "error", // Import configuration for `eslint-plugin-simple-import-sort`
                "simple-import-sort/exports": "error", // Export configuration for `eslint-plugin-simple-import-sort`
                "@typescript-eslint/no-unused-vars": "off",
                "unused-imports/no-unused-imports": "error",
                "unused-imports/no-unused-vars": [
                    "error",
                    { argsIgnorePattern: "^_" },
                ],
            },
            globals: {
                Astro: "readonly",
            },
        },
    ],
};
