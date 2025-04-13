import { defineConfig } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: fixupConfigRules(compat.extends("react-app", "../.eslintrc.yml")),

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "no-console": ["error", {
            allow: ["info", "error", "warn"],
        }],

        "@typescript-eslint/no-restricted-imports": ["error", {
            patterns: [{
                group: [
                    "@ideanick/backend/**",
                    "!@ideanick/backend/**/",
                    "!@ideanick/backend/**/input",
                    "!@ideanick/backend/src/utils/can",
                ],

                allowTypeImports: true,
                message: "Only types and input schemas are allowed to be imported from backend workspace",
            }],
        }],
    },
}, {
    files: ["**/vite.config.ts"],

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: "./tsconfig.node.json",
        },
    },
}]);