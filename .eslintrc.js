/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-03-29 17:18:52
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-21 19:13:52
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    'html',
    'vue'
  ],
  globals: {
  },
  settings: {
    'html/indent': '+2',
    'html/report-bad-indent': 'error',
  },
  rules: {
    'vue/html-indent': ['error', 2, { // <template>代码中的缩进
      baseIndent: 1
    }],
    'vue/max-attributes-per-line': ['error', { // 强制执行模板中每行的多个属性
      singleline: 4,
      multiline: {
        max: 1,
      }
    }],
    'vue/singleline-html-element-content-newline': 'off', // 在单行元素的内容前后强制换行
    'vue/multiline-html-element-content-newline': 'error', // 在多行元素的内容前后强制换行
    'vue/name-property-casing': ['error', 'PascalCase'], // 在name为一致性目的强制执行属性大小写的样式
    'vue/html-closing-bracket-newline': 'error', // 在标签的右括号之前强制换行（或不换行）
    'vue/no-unused-components': 'warn', // 报告模板中尚未使用的组件
    'vue/no-multiple-template-root': 'off', // 不允许向模板添加多个根节点
    'vue/no-mutating-props': 'off', // 禁止组件 props 的突变
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为多字
    indent: ['error', 2, { // js 代码缩进
      SwitchCase: 1,
      VariableDeclarator: { var: 1, let: 1, const: 1 }
    }],
    'no-console': 'off', // 不能有 console
    'no-debugger': 'off', // 不能有 debugger
    'no-undef': 'off', // 是否不使用undefined
    'no-empty': 'warn', // 是否允许空块语句，可添加注释取消提示
    'no-constant-condition': 'warn', // if，for，while，或do...while语句，?: 三元表达；不允许将条件设为常量
    'no-unused-vars': ['warn', { // 没有使用到的变量
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: true,
    }],
    'arrow-spacing': ['error', { // 箭头函数的箭头（=>）之前/之后标准化间距样式
      before: true,
      after: true,
    }],
    'block-spacing': ['error', 'always'], // 在打开的块令牌内和同一行上的下一个令牌内强制执行一致的间距
    'brace-style': ['error', '1tbs', { // 为块执行一致的括号样式
      allowSingleLine: false,
    }],
    'comma-spacing': ['error', { // 在变量声明，数组文字，对象文字，函数参数和序列中的逗号前后加上一致的间距
      before: false,
      after: true,
    }],
    'comma-style': ['error', 'last'], // 在数组字面量、对象字面量和变量声明中强制使用一致的逗号样式
    'dot-location': ['error', 'property'], // 强制执行成员表达式中的换行符一致性
    'eol-last': ['error', 'always'], // 在非空文件的末尾至少执行一个换行符（或不存在）
    'key-spacing': ['error', { // 强制在对象字面量属性中的键和值之间保持一致的间距
      beforeColon: false,
      afterColon: true,
    }],
    'keyword-spacing': ['error', { // 强制执行围绕关键字和关键字标记的一致空格
      before: true,
      after: true,
    }],
    'new-cap': ['error', { // 要求构造函数名以大写字母开头，某些内置标识符可免除此规则
      newIsCap: true,
      capIsNew: false,
    }],
    'new-parens': 'error', // 在使用new关键字调用不带参数的构造函数时需要括号，以便提高代码清晰度
    'no-array-constructor': 'error', // 不允许使用Array构造函数
    'no-caller': 'error', // 不允许使用arguments.caller和arguments.callee
    'no-eval': 'error', // 禁止使用eval()函数来防止潜在的危险，不必要的和慢速的代码
    'no-empty-pattern': 'error', // 标记解构结构对象和数组中的任何空模式
    'no-empty-character-class': 'warn', // 不允许在正则表达式中使用空字符类
    'no-extend-native': 'error', // 不允许直接修改内建对象的原型
    'no-extra-parens': 'off', // 仅在必要时限制使用括号
    'no-floating-decimal': 'error', // 消除浮点小数点，并在数值有小数点但在其之前或之后缺少数字时发出警告
    'no-implied-eval': 'error', // 消除隐含eval()通过使用setTimeout()，setInterval()或execScript()
    'no-label-var': 'error', // 通过禁止创建与范围内的变量共享名称的标签的不良做法来创建更清晰的代码
    'no-lone-blocks': 'error', // 消除脚本顶层或其他块中不必要的和可能混淆的块
    'no-multi-spaces': 'error', // 禁止在逻辑表达式，条件表达式，声明，数组元素，对象属性，序列和函数参数周围使用多个空格
    'no-multi-str': 'error', // 防止使用多行字符串
    'no-multiple-empty-lines': [2, { // 减少阅读代码时所需的滚动，它会在超过最大空行数量时发出警告
      max: 2,
    }],
    'no-new-object': 'error', // 不允许使用Object构造函数
    'no-new-require': 'error', // 消除new require表达的使用
    'no-new-wrappers': 'error', // 杜绝使用String，Number以及Boolean与new操作
    'no-obj-calls': 'error', // 不允许调用Math，JSON和Reflect对象作为函数
    'no-return-assign': ['error', 'except-parens'], // 消除return陈述中的任务
    'no-sequences': 'error', // 禁止使用逗号运算符，但以下情况除外：在for语句的初始化或更新部分，如果表达式序列显式包含在圆括号中
    'no-spaced-func': 'error', // 不允许函数标识符与其应用程序之间的间距
    'no-sparse-arrays': 'off', // 不允许稀疏数组文字，它们在逗号前没有元素的地方有“孔”
    'no-trailing-spaces': 'error', // 不允许在行尾添加尾随空白
    'no-unexpected-multiline': 'error', // 不允许混淆多行表达式
    'no-unmodified-loop-condition': 'error', // 查找循环条件内的引用，然后检查这些引用的变量是否在循环中被修改
    'no-unneeded-ternary': 'error', // 当存在更简单的选择时，此规则不允许三元运算符
    'no-unsafe-finally': 'error', // 不允许return，throw，break，和continue里面的语句finally块
    'no-useless-call': 'error', // 不允许使用Function.prototype.call()
    'no-useless-computed-key': 'error', // 禁止不必要地使用计算属性键
    'no-useless-constructor': 'error', // 可以在不改变类的工作方式的情况下安全地移除的类构造函数
    'no-whitespace-before-property': 'error', // 不允许在对象和属性之间留出空白
    'one-var': ['off', { // 强制每个函数（ for var）或块（for letand const）范围内的变量一起或单独声明
      uninitialized: 'always',
      initialized: 'always'
    }],
    'operator-linebreak': ['error', 'after', { // 实施一致的换行样式
      overrides: {
        '?': 'before',
        ':': 'before',
      },
    }],
    'padded-blocks': 'off', // 在块内强制执行一致的空行填充
    quotes: ['error', 'single', { // 强制一致使用反引号，双引号或单引号
      avoidEscape: true,
      allowTemplateLiterals: false,
    }],
    'quote-props': ['error', 'as-needed'], // 对象字面值属性名称在有些情况下必须使用引号
    semi: ['error', 'always'], // 强制使用分号
    'semi-spacing': ['error', { // 强制分号间隔
      before: false,
      after: true,
    }],
    'space-before-blocks': ['error', 'always'], // 强化块之前的间距一致性，它只适用于不以新行开始的块
    'space-before-function-paren': ['error', 'never'], // 在函数括号之前强制执行一致的间距
    'space-in-parens': ['error', 'never'], // 强制直接在括号内进行间隔的一致性
    'space-infix-ops': 'error', // 确保运算符周围有空间
    'space-unary-ops': ['error', { // 确保一元运算符周围有空间
      words: true,
      nonwords: false,
    }],
    'spaced-comment': ['error', 'always'], // 注释开始后，此规则将强制间距的一致性//或/*
    'template-curly-spacing': ['error', 'always'], // 保持模板文字内部空间的一致性
    yoda: ['error', 'never'], // 强制执行一种将变量与文字值进行比较的一致条件样式
    'prefer-const': 'error', // 标记使用let关键字声明的变量，但在初始分配后从未重新分配变量
    'object-curly-spacing': ['error', 'always', { // 在对象文字的大括号内执行一致的间距，解构赋值和导入/导出说明符
      objectsInObjects: false,
    }],
    'array-bracket-spacing': ['error', 'never'], // 在数组括号内强制实现一致的间距
  }
};
