module.exports = {
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'env': {
        'es6': true,
        'browser': true,
        'node': true,
        'amd': true,
        'jquery': true,
        'jasmine': true
    },
    'extends': 'eslint:recommended',
    'plugins': [
        'jasmine'
    ],
    'rules': {
        'no-unused-vars': 'off',
        // enable additional rules
        'indent': ['off', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],

        // override configuration set by extending "eslint:recommended"
        'no-empty': 'warn',
        'no-cond-assign': ['error', 'always'],

        // disable rules from base configurations
        'for-direction': 'off',
    }
};
