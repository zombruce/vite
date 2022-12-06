module.exports = {
    root: true, // 此项是用来告诉eslint找当前配置文件不能往父级查找
    env: {
        // 预定义的全局变量，这里是浏览器环境
        browser: true,
        node: true,
        commonjs: true,
        es6: true
    },
    globals: {
        defineEmits: 'readonly',
        defineProps: 'readonly'
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: ['vue'],
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier'
    ],
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.vue'],
            rules: {
                'no-undef': 'off'
            }
        },
        {
            files: ['vite.config.ts'],
            rules: {
                'camelcase': 'off'
            }
        }
    ],
    rules: {
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 禁用 debugger
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 禁用 console
        'no-bitwise': 'off', // 禁用按位运算符
        'no-tabs': 'off', // 禁用 tab
        'array-element-newline': ['error', 'consistent'], // 强制数组元素间出现换行
        indent: ['off', 4], // 强制使用一致的缩进
        // 缩进默认使用4个空格
        '@typescript-eslint/indent': 'off',
        quotes: ['error', 'single'], // 强制使用一致的反勾号、双引号或单引号
        'comma-dangle': ['error', 'never'], // 要求或禁止末尾逗号
        'object-curly-spacing': ['error', 'always'], // 强制在大括号中使用一致的空格
        'max-len': ['error', 220], // 强制一行的最大长度
        'no-new': 'off', // 禁止使用 new 以避免产生副作用
        'linebreak-style': 'off', // 强制使用一致的换行风格
        'import/extensions': 'off', // 确保在导入路径中统一使用文件扩展名
        'eol-last': 'off', // 要求或禁止文件末尾存在空行
        'no-shadow': 'off', // 禁止变量声明与外层作用域的变量同名
        'no-unused-vars': 'off', // 禁止出现未使用过的变量
        'import/no-cycle': 'off', // 禁止一个模块导入一个有依赖路径的模块回到自己身上
        'array-bracket-spacing': ['error', 'never'], // 是否允许非空数组里面有多余的空格
        'arrow-parens': 'off', // 要求箭头函数的参数使用圆括号
        'block-spacing': ['error', 'always'], // =>的前/后括号
        'accessor-pairs': 'off', // 在对象中使用getter/setter
        'block-scoped-var': 'off', // 块语句中使用var
        // 'brace-style': ['warn', '1tabs'], // 大括号风格
        'callback-return': 'off', // 避免多次调用回调什么的
        camelcase: 'error', // 强制驼峰法命名
        semi: ['error', 'never'], // 要求或禁止使用分号代替 ASI
        eqeqeq: 'error', // 要求使用 === 和 !==
        'no-param-reassign': 'off', // 禁止对 function 的参数进行重新赋值
        'import/prefer-default-export': 'off', // 如果模块只输入一个名字，则倾向于默认输出
        'no-use-before-define': 'off', // 禁止在变量定义之前使用它们，则倾向于默认输出
        'no-continue': 'off', // 禁用 continue 语句
        'prefer-destructuring': 'off', // 优先使用数组和对象解构
        'no-plusplus': 'off', // 禁用一元操作符 ++ 和 --
        'prefer-const': 'warn', // 要求使用 const 声明那些声明后不再被修改的变量
        'global-require': 'off', // 要求 require() 出现在顶层模块作用域中
        'no-prototype-builtins': 'off', // 禁止直接调用 Object.prototypes 的内置属性
        'consistent-return': 'off', // 要求 return 语句要么总是指定返回的值，要么不指定
        'one-var-declaration-per-line': 'off', // 要求或禁止在变量声明周围换行
        'one-var': 'off', // 强制函数中的变量要么一起声明要么分开声明
        'import/named': 'off', // 确保命名导入与远程文件中的命名导出相对应
        'object-curly-newline': 'off', // 强制大括号内换行符的一致性
        'default-case': 'error', // 要求 switch 语句中有 default 分支,switch语句最后必须有default
        'no-trailing-spaces': 'off', // 禁用行尾空格
        'func-names': 'off', // 要求或禁止使用命名的 function 表达式
        radix: 'off', // 强制在 parseInt() 使用基数参数
        'no-unused-expressions': 'off', // 禁止出现未使用过的表达式
        'no-underscore-dangle': 'off', // 禁止标识符中有悬空下划线
        'no-nested-ternary': 'off', // 禁用嵌套的三元表达式
        'no-restricted-syntax': 'off', // 禁用特定的语法
        'no-await-in-loop': 'off', // 禁止在循环中出现 await
        'import/no-extraneous-dependencies': 'off', // 禁止使用外部包
        'import/no-unresolved': 'off', // 确保导入指向一个可以解析的文件/模块
        'template-curly-spacing': ['off', 'always'], // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
        '@typescript-eslint/no-var-requires': 'off', // 除import语句外，禁止使用require语句
        '@typescript-eslint/no-empty-function': 'off', // 不允许空函数
        '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
        'guard-for-in': 'off', // 要求 for-in 循环中有一个 if 语句
        'class-methods-use-this': 'off', // 强制类方法使用 this
        'vue/html-indent': ['off', 4], // 在<template>中强制一致缩进
        'vue/html-self-closing': 'off', // 执行自闭合的风格
        'vue/singleline-html-element-content-newline': 'off', // 要求单行元素的内容前后有一个换行符
        'vue/comment-directive': 'off',
        'vue/v-on-event-hyphenation': 'off',
        // 'vue/no-unused-components': 'off',
        'comma-spacing': 'off', // 逗号前后的空格
        'comma-style': ['error', 'last'], // 逗号风格，换行时在行首还是行尾
        complexity: ['off', 11], // 循环复杂度
        'computed-property-spacing': ['off', 'never'], // 是否允许计算后的键名什么的
        curly: ['error', 'all'], // 必须使用 if(){} 中的{}
        'dot-location': 'off', // 对象访问符的位置，换行的时候在行首还是行尾
        'dot-notation': ['off', { allowKeywords: true }], // 避免不必要的方括号
        'new-cap': 'error', // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
        'new-parens': 'error', // new时必须加小括号
        'newline-after-var': 'off', // 变量声明后是否需要空一行
        'no-alert': 'off', // 禁止使用alert confirm prompt
        'no-catch-shadow': 'off', // 禁止catch子句参数与外部作用域变量同名
        'no-class-assign': 'error', // 禁止给类赋值
        'no-cond-assign': 'error', // 禁止在条件表达式中使用赋值语句
        'no-const-assign': 'error', // 禁止修改const声明的变量
        'no-constant-condition': 'error', // 禁止在条件中使用常量表达式 if(true) if('warn')
        '@typescript-eslint/no-unused-vars': ['off'],
        '@typescript-eslint/no-non-null-assertion': 'off',
        'vue/no-v-html': 'off', // 防止XSS注入的话，建议使用npm install vue-dompurify-html --save
        'vue/multi-word-component-names': 'off',
        'vue/no-useless-template-attributes': 'off'
    }
}
