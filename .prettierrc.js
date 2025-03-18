module.exports = {
  jsxBracketSameLine: true,
  trailingComma: 'none',
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  endOfLine: 'auto',
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
  importOrder: [
    '^@mui/(.*)$',
    '^components/(.*)$',
    '^design/(.*)$',
    '^utils/(.*)$',
    '^[./]'
  ],
  plugins: ['@trivago/prettier-plugin-sort-imports']
};
