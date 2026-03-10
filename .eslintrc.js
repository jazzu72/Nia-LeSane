module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react-native/all',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks',
        'react-native'
    ],
    env: {
        'react-native/react-native': true,
        es6: true,
        node: true,
        jest: true
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        // TypeScript - CEO-level quality standards
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': ['error', {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
        }],
        '@typescript-eslint/consistent-type-imports': 'warn',

        // React & React Native
        'react/prop-types': 'off', // Using TypeScript instead
        'react/react-in-jsx-scope': 'off', // Not needed in React Native
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react-native/no-inline-styles': 'warn',
        'react-native/no-color-literals': 'warn',
        'react-native/no-raw-text': 'off', // Can be too restrictive

        // Code Quality
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'prefer-const': 'error',
        'no-var': 'error',
        'eqeqeq': ['error', 'always'],
        'curly': ['error', 'all'],
        'no-throw-literal': 'error',
        'prefer-promise-reject-errors': 'error'
    },
    ignorePatterns: [
        'node_modules/',
        '.expo/',
        'coverage/',
        '*.config.js',
        'babel.config.js'
    ]
};
