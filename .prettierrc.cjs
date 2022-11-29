module.exports = {
    // 一行的字符数，如果超过会进行换行，默认为80
    printWidth: 120,
    // 一个tab代表几个空格数，默认为80
    tabWidth: 4,
    // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
    useTabs: false,
    // 字符串是否使用单引号，默认为false，使用双引号
    singleQuote: true,
    // 行位是否使用分号，默认为true
    semi: false,
    // 是否使用尾逗号，有三个可选值"<none|es5|all>"
    trailingComma: 'none',
    // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
    bracketSpacing: true,
    // 代码的解析引擎，默认为babylon，与babel相同
    // parser: 'babylon',
    // 未尾分号
    trailingComma: 'none',
    jsxBracketSameLine: false,
    jsxSingleQuote: false,
    arrowParens: 'always',
    insertPragma: false,
    requirePragma: false,
    proseWrap: 'never',
    htmlWhitespaceSensitivity: 'ignore',
    quoteProps: 'as-needed',
    vueIndentScriptAndStyle: true,
    endOfLine: 'auto',
    // 不让prettier使用eslint的代码格式进行校验
    eslintIntegration: false,
    // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
    ignorePath: '.prettierignore',
    // 不让prettier使用stylelint的代码格式进行校验
    stylelintIntegration: false,
    tslintIntegration: false,
    cursorOffset: -1
}
