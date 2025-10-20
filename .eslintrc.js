module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: { jsx: true },
		project: "./tsconfig.json",
	},
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true,
	},
	plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:react-hooks/recommended",
		"plugin:prettier/recommended",
	],
	settings: { react: { version: "detect" } },
	rules: {
		"prettier/prettier": "error",
		"react/prop-types": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
	},
	ignorePatterns: ["dist/", "node_modules/"],
};
