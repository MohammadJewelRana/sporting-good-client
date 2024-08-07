module.exports = {
  root: true,
  env: { browser: true, es2023: true,node:true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}


// module.exports = {
//   root: true,
//   env: { browser: true, es2023: true, node: true },
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:react-hooks/recommended',
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs'],
//   parser: '@typescript-eslint/parser',
//   plugins: ['react-refresh', '@typescript-eslint'],
//   rules: {
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],

//     // Added Rules
//     '@typescript-eslint/no-unused-vars': [
//       'warn',
//       { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
//     ],
//     '@typescript-eslint/explicit-module-boundary-types': 'off', // Turn off explicit return types for functions
//     '@typescript-eslint/no-explicit-any': 'warn', // Warn when using 'any' type
//     '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'], // Enforce consistent use of type definitions
//     'react/jsx-uses-react': 'off', // Disable the need to import React in JSX files (since React 17+)
//     'react/react-in-jsx-scope': 'off', // React in scope for JSX is no longer necessary
//     'no-console': 'warn', // Warn on console.log usage
//     'no-debugger': 'warn', // Warn on debugger usage
//     'no-trailing-spaces': 'warn', // Warn on trailing spaces in code
//     'semi': ['warn', 'always'], // Enforce semicolons at the end of statements
//   },
// };
