#React Without JSX

JSX不是使用React的必要条件。当您不想在构建环境中设置编译时，使用没有JSX的React尤其方便。

每一个JSX元素仅仅是调用React.createElement(component, props, ...children)的语法糖.所以使用JSX可以做的任何事情也可以用简单的JavaScript完成。

For example, this code written with JSX:

```jsx harmony
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

ReactDOM.render(
  <Hello toWhat="World" />,
  document.getElementById('root')
);
```

can be compiled to this code that does not use JSX:

```jsx harmony
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

组件可以作为字符串提供，或者作为一个React.Component的子集,或者无状态组件的普通函数。

如果你厌倦了编写React.createElement,一个常见的模式是指定一个速记:

```jsx harmony
const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);
```

如果你使用这个简写形式React.createElement,在没有JSX的情况下，使用React 几乎是很方便的。

或者，您还可以参考社区项目，例如，以一个简洁的语法为基础的反应超脚本和超脚本助手。