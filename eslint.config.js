import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
	{
		ignores: [
			"dist/**",
			"node_modules/**",
			"bin/**",
			"build/**",
			"*.sublime-project",
			"*.sublime-workspace",
			".angular/**", // Ideal para tu app de noticias
		],
	},
	{
		files: ["**/*.{js,mjs,cjs}"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest,
			},
		},
		rules: {
			"no-empty-function": "error",
			"no-var": "error",
			"object-shorthand": ["error", "always"],
			"no-dupe-keys": "error",
			"prefer-const": "warn",
			eqeqeq: ["error", "always"],
			"no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
			"no-undef": "error",
			curly: "error", // Fuerza el uso de llaves en ifs, evita errores lógicos
		},
	},
	eslintConfigPrettier,
]);
