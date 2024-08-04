import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'

export default [
    { files: ['**/*.{js,mjs,cjs,jsx}'] },
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            eqeqeq: 'error',
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            'arrow-spacing': ['error', { before: true, after: true }],
            'no-console': 'off',
            'no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_', // because sometimes you have to not use a var.
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        ignores: ['dist/**', 'build/**'],
    },
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
        },
    },
]
