#Refs and the DOM

在典型的React数据中，props是父组件与子组件交互的惟一方式。修改一个孩子,你用新的属性重新渲染它。然而，在一些情况下，您需要在典型的数据流之外对一个孩子进行严格的修改。被修改的孩子可能是React组件的一个实例，也可以是DOM元素。对于这两种情况，React提供了一个逃生舱口。

##When to Use Refs

There are a few good use cases for refs:

+ 管理焦点，文本选择，或媒体播放。
+ 触发命令动画。
+ 与第三方DOM库集成。

避免使用refs来声明任何可以做的事情。

例如,通过一个isOpen支持，而不是打开对话框组件的open()和close()方法。

##Don't Overuse Refs

你的第一个倾向可能是在你的应用程序中使用refs“让事情发生”。如果是这样的话，花点时间和更批判性地思考状态应在何处帕拉组件层次结构中。通常情况下，“拥有”这个状态的适当位置就变得很明显了。有关这方面的例子，请参见提升状态指南。

##在DOM元素中添加一个Ref

React 支持您可以附加到任何组件的特殊属性。ref属性采用回调函数，在组件安装或卸载后，回调将立即执行。

当ref属性用于HTML元素时，ref回调接收底层DOM元素作为其参数。例如，该代码使用ref回调来存储对DOM节点的引用:

```jsx harmony
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}
```

当组件挂载时，React将调用带有DOM元素的ref回调，当它卸载时调用它为空。

使用ref回调只是在类上设置属性是访问DOM元素的常见模式。首选的方法是在ref回调中设置属性，比如在上面的例子中。还有一种更短的写法:ref={input => this.textInput = input}.

##将Ref添加到类组件

当将ref属性用于作为类声明的自定义组件时，ref回调接收组件的挂载实例作为其参数。例如，如果我们想要包装上面的CustomTextInput来模拟它在安装后立即被点击:

```jsx harmony
class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    this.textInput.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput
        ref={(input) => { this.textInput = input; }} />
    );
  }
}
```

##Refs and Functional组件

您可能不会在功能组件上使用ref属性因为他们没有实例:

```jsx harmony
function MyFunctionalComponent() {
  return <input />;
}

class Parent extends React.Component {
  render() {
    // This will *not* work!
    return (
      <MyFunctionalComponent
        ref={(input) => { this.textInput = input; }} />
    );
  }
}
```

你应该把组件转换成一个类，如果你需要一个ref，比如你需要声明周期方法或者状态

但是，只要引用DOM元素或类组件，就可以在函数组件内使用ref属性:

```jsx harmony
function CustomTextInput(props) {
  // textInput must be declared here so the ref callback can refer to it
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}
```

##将DOM Refs暴露给父组件

在罕见的情况下，。您可能希望从父组件访问子节点节点。这通常不推荐，因为它打破了组件封装，但它偶尔也能用于触发焦点或测量子DOM节点的大小或位置。

您可以在子组件中添加一个ref，这不是一个理想的解决方案，因为您只会得到一个组件实例而不是一个DOM节点。此外，这不会与功能组件一起工作。

相反，在这种情况下，我们建议给孩子一个特别的属性。这个孩子将使用一个带有任意名称的函数属性(如inputRef)，并将其作为ref属性附加到DOM节点上。这样，父节点通过中间的组件将ref回调传递给子节点节点。

这既适用于类，也适用于功能组件。

```jsx harmony
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

在上面的示例中,Parent通过inputRef属性传递ref回调到CustomTextInput，并且CustomTextInput 传递相同方法作为一个指定的ref属性到< input >,因此，Parent组件的this.inputElement将设置为对应于CustomTextInput中< input >元素的DOM节点。

注意，上面例子中inputRef属性的名称没有特殊的意思.因为它是一个常规的组件属性。无论如何使用ref 属性在< input >是重要的,因为他告诉React将ref附加到其DOM节点。

这个工作虽然CustomTextInput是一个功能组件。不像特殊的ref属性只能为DOM元素和类组件指定，对于像inputRef这样的常规组件，没有限制。

这种模式的另一个好处是它可以对多个组件进行深入的工作。例如,假设Parent不需要DOM节点，但是要渲染Parent(让我们称之为“Grandparent”)的组件需要访问它。然后我们可以让Grandparent指定inputRef到Parent，让Parent把它“转发”到CustomTextInput:

```jsx harmony
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

function Parent(props) {
  return (
    <div>
      My input: <CustomTextInput inputRef={props.inputRef} />
    </div>
  );
}


class Grandparent extends React.Component {
  render() {
    return (
      <Parent
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

ref回调第一次被Grandparent指定.他被作为一个常规属性inputRef传递到Parent ,然后Parent 把他作为一个常规属性传递到CustomTextInput .最后CustomTextInput 读取inputRef 属性并且把这个被传递来的function作为一个ref属性附加到< input >元素.最后Grandparent 的this.inputElement将会被设置到DOM节点相对于CustomTextInput里面的< input >元素

经过全面的考虑,我们建议尽可能不要暴露DOM节点，但这可以是一个有用的逃生出口。注意，这种方法需要向子组件添加一些代码。如果你完全无法控制子组件的实现，您的最后一个选项是使用findDOMNode()，但它是不受鼓励的。

###参遗留API:字符串

如果你之前做过React，您可能熟悉一个较旧的API，其中ref属性是一个字符串，textInput,访问DOM节点this.refs.textInput. 我们反对它，因为弦裁判有一些问题，被认为是遗产,而且很可能在未来的版本中被删除。如果你目前使用this.refs.textInput 访问ref,我们建议使用回调模式。

##警告

如果ref callback被定义为内联函数，它会在更新中被调用两次，首先使用null，然后再使用DOM元素。这是因为每个渲染都创建了一个新的函数实例，React需要清除旧的ref并设置新的。您可以通过将ref回调定义为类中的绑定方法来避免此问题，但请注意在大多数情况下根本无关紧要。