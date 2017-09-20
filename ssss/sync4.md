#不受控制的组件

在大多数情况下,我们建议使用受控组件来实现表单。在一个控制组件,表单数据由React 组件处理。另一种方法是不受控制的组件，其中表单数据由DOM本身处理。

编写一个不受控制的组件，您可以使用ref从DOM中获取表单值，而不是为每个状态更新编写事件处理程序。

例如，该代码在不受控制的组件中接受单个名称:

```jsx harmony
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

因为一个不受控制的成分在DOM中保持了真理的来源，当使用不受控制的组件时，集成React 和非React 代码有时更容易。如果你想快速而又脏的话，它也可以稍微少一些代码。否则，通常应该使用受控组件。

如果仍然不清楚你应该使用哪种类型的组件，您可能会发现本文的控制与不受控制的输入是有帮助的。

##default values

在React呈现生命周期中，表单元素的值属性将覆盖DOM中的值。对于不受控制的组件，您通常需要响应来指定初始值，但要让后续的更新不受控制。要处理这种情况，您可以指定一个defaultValue属性而不是value。

```jsx harmony
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

