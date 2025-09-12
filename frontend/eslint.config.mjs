import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		plugins: {
			prettier: prettierPlugin,
			"simple-import-sort": simpleImportSort,
			import: importPlugin,
		},
		rules: {
			"prettier/prettier": [
				"error",
				{
					singleQuote: false,
					semi: true,
					trailingComma: "es5",
					printWidth: 100,
				},
			],
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
			"import/first": "error",
			"import/newline-after-import": "error",
			"import/no-duplicates": "error",
		},
	},
	{
		ignores: [
			"node_modules/**",
			".next/**",
			"out/**",
			"dist/**",
			"build/**",
			"coverage/**",
			".git/**",
			".vscode/**",
			".idea/**",
			"*.log",
			"*.tmp",
			"*.temp",
			"*.sublime-workspace",
			"*.sublime-project",
			".env",
			".env.*.local",
		],
	},
];

export default eslintConfig;
