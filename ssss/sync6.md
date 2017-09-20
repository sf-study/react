#React Without ES6

通常，您可以定义一个React 组件作为一个普通的JavaScript类:

```jsx harmony
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

如果你不使用ES6，你可以使用create-react-class模块:

```jsx harmony
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```

ES6类的API类似createReactClass()有些例外

#Declaring Default Props

在组件使用函数和ES6类defaultProps 是被定义为一个属性

```jsx harmony
class Greeting extends React.Component {
  // ...
}

Greeting.defaultProps = {
  name: 'Mary'
};
```

使用createReactClass()  你需要在被传进来的function定义getDefaultProps()

```jsx harmony
var Greeting = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Mary'
    };
  },

  // ...

});
```

#Setting the Initial State

ES6 classes,通过在构造函数设置this.state定义初始的state

```jsx harmony
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  // ...
}
```

createReactClass()  你必须提供一个单独的getInitialState方法,返回初始的state

```jsx harmony
var Counter = createReactClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  // ...
});
```

#Autobinding

在React组件声明为ES6类,方法遵循与常规ES6类相同的语义。这就意味着他不会自动绑定this到实例,你将要在构造函数中显示的使用.bing(this)

```jsx harmony
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // This line is important!
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // Because `this.handleClick` is bound, we can use it as an event handler.
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```

使用createReactClass()方法,是不需要的因为他自己绑定了所有的方法

```jsx harmony
var SayHello = createReactClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },

  handleClick: function() {
    alert(this.state.message);
  },

  render: function() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
});
```

这意味着编写ES6类带有更多的事件处理程序的样板代码，但在大型应用程序中，这种优势略有改善。

如果样板代码对你太没有吸引力，您可以使用Babel启用实验性类属性语法提案:

```jsx harmony
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
  }
  // WARNING: this syntax is experimental!
  // Using an arrow here binds the method:
  handleClick = () => {
    alert(this.state.message);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```

请注意,上面的语法和语法可能改变实验.或者提议可能不会成为语言。

如果你宁愿安全起见，你有几个选择:

+ 在构造函数中绑定方法。

+ Use arrow functions, e.g. onClick={(e) => this.handleClick(e)}.

+ Keep using createReactClass.

#Mixins多态

ES6在没有任何多态支持的情况下启动。当您使用ES6类的反应时，没有对多态的支持。

我们还在代码库中使用多态发现了许多问题，并且不建议在新代码中使用它们。

本节仅供参考。

