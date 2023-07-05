/** @type {import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */

const config = {
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  plugins: [
    require('@trivago/prettier-plugin-sort-imports'),
    require('prettier-plugin-tailwindcss'),
  ],
  importOrder: ['^@/(.*)$', '^@components/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}

module.exports = config
