#Web Components

React和web组件是为解决不同的问题而构建的,web组件为可重复使用的组件提供强大的封装,虽然React提供一个声明库保持DOM与数据同步。这两个目标是互补的。作为开发人员，您可以在Web组件中自由使用React，或者使用Web组件，或者两者兼而有之。

#Using Web Components in React

```jsx harmony
class HelloMessage extends React.Component {
  render() {
    return <div>Hello <x-search>{this.props.name}</x-search>!</div>;
  }
}
```

**If you are using third-party Web Components, the best solution is to write a React component that behaves as a wrapper for your Web Component.Events emitted by a Web Component may not properly propagate(传播) through a React render tree. You will need to manually(手动的) attach event handlers to handle these events within your React components.**

一个常见的困惑是,Web组件使用class而不是className。

```jsx harmony
function BrickFlipbox() {
  return (
    <brick-flipbox class="demo">
      <div>front</div>
      <div>back</div>
    </brick-flipbox>
  );
}
```

#Using React in your Web Components

```jsx harmony
const proto = Object.create(HTMLElement.prototype, {
  attachedCallback: {
    value: function() {
      const mountPoint = document.createElement('span');
      this.createShadowRoot().appendChild(mountPoint);

      const name = this.getAttribute('name');
      const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
      ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
    }
  }
});
document.registerElement('x-search', {prototype: proto});
```