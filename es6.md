简单介绍一下es6中要用到的语法

#import

```markdown
import React, { Component } from 'react';
```

用 export default 语句导出的方法，我们直接定义其变量名称，这样的方法每个文件只能导出一个:

```jsx harmony
// myFunction.js
export default function() {
  console.log('This is default function!');
}
// index.js
import myFunction from 'myFunction';
```

仅用 export 导出的方法，在使用时，则需要把它们包含在大括号里：

```jsx harmony
// myAnotherFunction.js
export const foo = 'bar';
export function bar() {
  console.log('foo');
}
// index.js
import { foo, bar } from 'myAnotherFunction';
```

#const

```jsx harmony
const title = <h1>React Learning</h1>
```

const 关键字在 ES6 语法中，被用来声明常量。不过这并不表示声明的常量中数据不可变。在 ES6 中，const 声明的其实是一个只读的指针，也即是指针的位置不能改变，但其指向的值事实上是可以操作的

# class

ES6 当中，我们可以通过 class 关键字继承 React组件 的原型来创建组件。

在使用 props 或 state 的组件中，我们都会看到一个名为 constructor 的方法，这个方法中一般都会调用一个叫做 super 的关键字。这里的 super 其实是为了调用其继承父类的构造函数，由此将子类的 this 初始化，这样我们才能够在后面的代码中调用 this.props 或者 this.state

# 箭头函数

