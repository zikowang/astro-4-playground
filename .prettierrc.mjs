import * as dpaPrettierConfig from "eslint-config-dpa-infocom/prettier-config.js";

/** @type {import("prettier").Config} */
export default {
    ...dpaPrettierConfig,
    plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-astro"],
    importOrder: [
        "^[.*/]",
        "^(components|constants|hooks|store|layouts|pages|services|styles|types|widgets)/?(.*)$",
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
};
