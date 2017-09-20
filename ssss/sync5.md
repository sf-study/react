#优化性能

在内部，React使用一些聪明的技术来最小化更新UI所需的开销。对于许多应用程序来说，使用React 将导致快速的用户界面，而不需要做大量的工作来优化性能。然而，有几种方法可以加速你的React应用。

##使用生产构建

如果你在你的React应用程序中对性能问题进行了基准测试或体验，那么确保你正在测试的是小型的产品构建。

默认情况下，React包括许多有用的警告。这些警告在开发中非常有用。但是，它们的React更大，更慢，所以在部署应用程序时，应该确保使用生产版本。

如果您不确定构建过程是否正确设置，您可以通过安装React Developer工具来检查它。如果你访问一个在生产模式下有React的网站，这个图标将有一个黑暗的背景:

如果你访问一个在开发模式下有反应的网站，图标将有一个红色的背景:

当你在你的应用程序上工作时，你会使用开发模式，当你把你的应用程序部署到用户上时，你会使用它的生产模式。

你可以为下面的产品找到构建你的应用程序的指令。

###Create React App

如果您的项目是用Create React应用程序构建的，那么运行:

```markdown
npm run build
```

这将在项目的build/文件夹中创建应用程序的生产构建。

请记住，这只在部署到生产之前是必需的。对于正常的开发，使用npm start.

###一列纵队构建

我们提供了生产准备版本的React 和React DOM作为单个文件:

```html
<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
```

记住，只有以. min.的文件才适合生产。

###Brunch

对于最高效的Brunch制作，安装uglify-js-brunch

```markdown
npm install --save-dev uglify-js-brunch
```

然后，创建一个生产构建，add the -p flag to the build command:

```markdown
brunch build -p
```

请记住，您只需要在生产构建过程中这样做。You shouldn't pass -p flag or apply this plugin in development because it will hide useful React warnings, and make the builds much slower.

###Browserify

对于最高效的Browserify生产构建，安装一些插件:

```markdown
npm install --save-dev bundle-collapser envify uglify-js uglifyify 
```

要创建一个生产构建，请确保您添加了这些转换(订单事项):

+ envify转换确保了正确的构建环境，使它成为全局的(- g)。

+ uglifyify转换消除了开发导入。也让它成为全局的(- g)。

+ bundle -折叠ser插件用数字替换长模块id。

+ 最后，生成的包被用管道连接到uglify - js中(读取原因)。

请记住，您只需要在生产构建过程中这样做。您不应该在开发中应用这些插件，因为它们将隐藏有用的响应警告，并使构建更加缓慢。

###Rollup

对于最有效的Rollup生产构建，安装一些插件:

```markdown
npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-uglify 
```

要创建生产构建，请确保您添加了这些插件(订单事项):

+ 替换插件确保设置了正确的构建环境。

+ commonjs插件提供了在Rollup中对commonjs的支持。

+ uglify插件压缩和修改最终包。

请记住，您只需要在生产构建过程中这样做。你不应该将uglify插件或替换插件应用于开发中的“生产”价值，因为它们会隐藏有用的反应警告，并使构建更加缓慢。

###webpack

对于最高效的webpack生产构建，请确保在您的产品配置中包含这些插件:

##用Chrome性能选项卡分析组件

在开发模式中，您可以在支持的浏览器中使用性能工具可视化组件的安装、更新和卸载。例如:

To do this in Chrome:

1. Load your app with ?react_perf in the query string (for example, http://localhost:3000/?react_perf).

2. Open the Chrome DevTools Performance tab and press Record.

3. 执行您想要配置的操作。不要超过20秒，否则Chrome可能会挂起。

4. Stop recording.

5. React 事件将按用户定时标签分组。

请注意，这些数字是相对的，因此组件将在生产中更快地呈现。不过，这应该可以帮助您意识到，当不相关的UI被错误更新时，以及UI更新的深度和频率。

目前，Chrome、Edge和IE是支持该功能的唯一浏览器，但我们使用标准的用户计时API，因此我们希望有更多的浏览器来支持它。

##避免和解

React构建并维护所呈现的UI的内部表示。它包括从组件返回的React元素。这种表示方法可以避免创建DOM节点并访问现有的节点，因为这可能比JavaScript对象上的操作要慢。有时它被称为“虚拟DOM”，但它的作用方式与本机相同。

当一个组件的属性或状态发生变化时，通过将新返回的元素与先前呈现的元素进行比较，React决定是否需要实际的DOM更新。当它们不相等时，React将更新DOM。

在某些情况下，你的组件可以通过覆盖整个生命周期功能shouldComponentUpdate来加速所有这些，在重新呈现过程开始之前触发。这个函数的默认实现返回true，然后执行更新:

```jsx harmony
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

如果你知道在某些情况下你的组件不需要更新，你可以从shouldComponentUpdate返回false，要跳过整个渲染过程，包括在这个组件和下面调用render()。

##shouldComponentUpdate In Action

下面是组件的子树。对于每一个人,SCU只是shouldComponentUpdate的返回值,vDOMEq 只是所呈现的React 元素是否相等。圆形的颜色表示组件是否需要协调。

#Examples

如果你的组件唯一改变的方式是props.color或者state.count的值改变的时候,你可以用shouldComponentUpdate检查:

```jsx harmony
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

在这段代码中,shouldComponentUpdate 检查一下props.color or state.count有没有改变,如果这些值不变，组件不更新。如果你的组件变得更复杂，您可以使用类似的模式在所有的属性和状态字段之间进行“浅比较”，以确定组件是否应该更新。这个模式很常见，它提供了一个助手来使用这个逻辑——只从React.PureComponent中继承。所以这段代码是一种更简单的方法来实现同样的事情:

```jsx harmony
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

大多数时候,你可以使用React.PureComponent而不是自己写shouldComponentUpdate. 它只做了一个肤浅的比较，所以你不能用它，如果属性或状态发生了突变，一个浅的比较会错。

这可能是更复杂的数据结构的问题。例如,假设你想要一个ListOfWords 组件呈现一个以逗号分隔的单词列表，和一个父组件WordAdder 让你点击一个按钮来添加一个单词到列表。这段代码不能正确地工作:

```jsx harmony
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This section is bad style and causes a bug
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
```

问题是PureComponent 将this.props.words旧值与新值进行简单的比较.由于此代码在WordAdder组件的handleClick方法会对words 数组进行突变,this.props.words的旧值与新值单词会比较相等，尽管数组中的实际单词已经发生了变化。ListOfWords 即使它有了应该呈现的新单词，也不会更新。

##不突变数据的能力

避免这个问题最简单的方法是避免使用作为属性或状态的突变值。例如,handleClick方法可以用concat重写为:

```jsx harmony
handleClick() {
  this.setState(prevState => ({
    words: prevState.words.concat(['marklar'])
  }));
}
```

ES6对于数组提供一个传播的语法这可以使它变得更简单。如果您使用的是Create React应用程序，默认情况下此语法是可用的。

```jsx harmony
handleClick() {
  this.setState(prevState => ({
    words: [...prevState.words, 'marklar'],
  }));
};
```

您还可以重写代码，以类似的方式使对象发生变异以避免发生突变。例如,假设有一个对象叫colormap 我们想要写一个方法改变colormap.right为blue。我们可以写:

```jsx harmony
function updateColorMap(colormap) {
  colormap.right = 'blue';
}
```

要在不改变原始对象的情况下编写它，我们可以使用 Object.assign 方法:

```jsx harmony
function updateColorMap(colormap) {
  return Object.assign({}, colormap, {right: 'blue'});
}
```

updateColorMap 现在返回一个新对象，而不是去改变旧的。Object.assign在ES6中，需要一个polyfill。

有一个JavaScript提议，可以添加对象扩展属性，以便更容易地更新对象，而不需要修改:

```jsx harmony
function updateColorMap(colormap) {
  return {...colormap, right: 'blue'};
}
```

如果你使用的是Create React App，Object.assign 和对象扩展语法默认情况下是可用的。

##使用不可变的数据结构

Immutable.js 另一个解决这个问题的方法。它提供了通过结构共享工作的不可变的、持久的集合:

+ Immutable: 一旦创建，集合不能在另一个时间点被改变。

+ Persistent:可以从以前的集合和集合(如set)创建新的集合。在创建新集合后，原始集合仍然有效。

+ Structural Sharing:新的集合是使用尽可能多的与原始集合相同的结构创建的，将复制减少到最小以提高性能。

不变性使跟踪变得便宜。更改总是会导致一个新对象，因此我们只需要检查对象的引用是否已经更改。例如，在这种常规的 JavaScript 代码：

```js
const x = { foo: 'bar' };
const y = x;
y.foo = 'baz';
x === y; // true
```

虽然y已经修改过,因为它是和x相同的对象，这种比较返回true。你可以用immutable.js来编写类似的代码。

```js
const SomeRecord = Immutable.Record({ foo: null });
const x = new SomeRecord({ foo: 'bar' });
const y = x.set('foo', 'baz');
const z = x.set('foo', 'bar');
x === y; // false
x === z; // true
```

在这种情况下。当变异x时，重新返回一个新的引用，我们可以使用参考工作检查(x = y)来做《y值存储在不同的原始值存储在x。

另外两个可以帮助使用不可变数据的库是无缝的、不可变的、不可变的。

不可变数据结构为您提供了一种跟踪对象变化的廉价方法，这就是我们所需要实现的shouldComponentUpdate。这通常可以为您提供良好的性能提升。