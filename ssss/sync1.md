##Props in JSX 属性

您可以通过使用{ }将任何JavaScript表达式作为属性传递

```javascript
<MyComponent foo={1 + 2 + 3 + 4} />
```

使用for循环和if语句

```javascript
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return <div>{props.number} is an {description} number</div>;
}
```

###String Literals字符串常量

你可以传递一个字符串常量作为属性,下面两个是相等的

```javascript
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```

###属性默认为true

```javascript
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

###扩展属性

如果你又一个object,作为属性,并且想把他传递给JSX,你可以使用{...}作为一个扩展的操作符来传递他

```javascript
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

扩展操作符在你构建通用的容器的时候是很有用的.然而，它们也可以使您的代码变得混乱，因为它可以很容易地将大量无关的道具传递给那些不关心它们的组件。我们建议您少使用此语法。

##Children in JSX

在包含打开标签和结束标签的JSX表达式中，这些标签之间的内容作为特殊的属性传递: props.children. 有几种不同的方式通过children:

###String Literals

您可以在打开和结束标签之间设置一个字符串,然后props.children将会是这个字符串.这对于许多内置的HTML元素非常有用。例如:

```javascript
<MyComponent>Hello world!</MyComponent>
```

这是有效的JSX,MyComponent组件的props.children将会是字符转"Hello world!",HTML是保有的,你可以这样写JSX就像你这样写HTML:

```html
<div>This is valid HTML &amp; JSX at the same time.</div>
```

JSX在开始和结束一行时删除空白。它还删除空白行。删除标签旁边的新行;在字符串中间出现的新行被压缩成一个空格。所以这些都呈现相同的东西:

###JSX Children

您可以提供更多的JSX元素作为子元素。这对于显示嵌套组件非常有用:

```jsx harmony
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
```

您可以将不同类型的孩子混合在一起，这样您就可以使用字符串文字和JSX孩子一起使用。这是JSX类似HTML的另一种方式，因此这是有效的JSX和有效的HTML:

```html
<div>
  Here is a list:
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

一个React组件不能返回多个React元素，但是一个JSX表达式可以有多个子元素，因此如果您想要一个组件来呈现多个东西，您可以将它封装在这样的一个div中。如上

###JavaScript表达式的孩子

您可以通过在{}内包围它来传递任何JavaScript表达式。例如，这些表达式是等价的:

```jsx harmony
<MyComponent>foo</MyComponent>

<MyComponent>{'foo'}</MyComponent>
```

这通常有助于呈现任意长度的JSX表达式列表。例如，它呈现一个HTML列表:

```javascript
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
```

JavaScript表达式可以与其他类型的孩子混合使用。这通常用于替代字符串模板:

```javascript
function Hello(props) {
  return <div>Hello {props.addressee}!</div>;
}
```

###函数作为孩子

通常情况下，在JSX中插入的JavaScript表达式将计算为一个字符串，一个React元素，或者是这些东西的列表。然而,props.children 就像其他的属性一样可以传递任何形式的数据，不只是React的种类知道如何渲染。例如,如果你有一个自定义组件，你可以用一个回调作为props.children

```jsx harmony
// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

传递给定制组件的孩子可以是任何东西，只要该组件将它们转换成某种React ，就可以在呈现之前理解。这种用法并不常见，但如果您想要扩展JSX的能力，就可以使用它。

###Booleans, Null, and Undefined Are Ignored

false, null, undefined, and true有效的孩子.他们只是不渲染。这些JSX表达式将呈现相同的内容:

```jsx harmony
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

这对于有条件的呈现React 元素非常有用。如果showHeader是正确的，这个JSX只呈现< Header / >。

```jsx harmony
<div>
  {showHeader && <Header />}
  <Content />
</div>
```

需要注意的是，一些“falsy”的值，比如0号，仍然会被React渲染.例如，这段代码不会像您预期的那样运行，因为当props.messages是一个空数组的时候将会打印一个0:

```jsx harmony
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>
```

要解决这个问题，请确保表达式在之前和& &总是布尔:

```jsx harmony
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
```

相反的,如果你想要一个值，比如false,true,null，或者undefined，来出现在输出中，你必须先把它转换成字符串:

```jsx harmony
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
```