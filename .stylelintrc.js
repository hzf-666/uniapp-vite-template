/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-03-29 13:43:53
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-25 22:07:02
 */
module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  plugins: [],
  overrides: [
    {
      files: ['**/*.{html,vue}'],
      customSyntax: 'postcss-html'
    },
  ],
  rules: {
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)((-|_)+[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab(-/_)case',
      },
    ],
    'selector-id-pattern': [
      '^([a-z][a-z0-9]*)([A-Z]+[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be lowerCamelCase',
      },
    ],
    'scss/dollar-variable-pattern': [
      '^([a-z][a-z0-9]*)(([A-Z]+|-)[a-z0-9]+)*$',
      {
        message: 'Expected variable to be lowerCamelCase or kebab-case',
      },
    ],
    'no-empty-source': null,
    'scss/at-import-partial-extension': null,
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['export', 'deep'],
    }],
    'unit-no-unknown': [true, {
      ignoreUnits: ['rpx'],
    }],
    'selector-type-no-unknown': [true, {
      ignoreTypes: ['page'],
    }],
  }
};
