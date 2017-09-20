#高阶组件

高阶组件(HOS)是React用于可重复使用组件逻辑的一个先进技术,HOSs不是React API,他们是一个从React组合性质浮现的模式

具体的**一个高阶组件是一个携带组件并且返回一个新的组件的方法**

```jsx harmony
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

组件转换属性到UI,高阶组件转换组件到另一个组件

HOSs在第三方React 库是常见的,比如Redux's connect and Relay's createContainer.

#使用HOCs用于横切关注点

我们以前推荐使用mixin来处理横切关注点。从那以后，我们意识到混合在一起会产生更多的麻烦。

组件是React的代码复用的主要单位,有些模式不适合传统组件。

For example, say you have a CommentList component that subscribes to an external data source to render a list of comments:

```jsx harmony
class CommentList extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
```

Later, you write a component for subscribing to a single blog post, which follows a similar pattern:

```jsx harmony
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
```

CommentList and BlogPost aren't identical — they call different methods on DataSource, and they render different output. But much of their implementation is the same:

+ On mount, add a change listener to DataSource.

+ Inside the listener, call setState whenever the data source changes.

+ On unmount, remove the change listener.

You can imagine that in a large app, this same pattern of subscribing to DataSource and calling setState will occur over and over again. We want an abstraction that allows us to define this logic in a single place and share them across many components. This is where higher-order components excel.

我们可以编写一个函数来创建组件， like CommentList and BlogPost,订阅数据源。函数将接受作为其参数之一的子组件接收作为属性的订阅数据。Let's call the function withSubscription:

```jsx harmony
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```

The first parameter is the wrapped component. The second parameter retrieves(检索) the data we're interested(感兴趣) in, given a DataSource and the current props.

When CommentListWithSubscription and BlogPostWithSubscription are rendered, CommentList and BlogPost will be passed a data prop with the most current data retrieved from DataSource:

```jsx harmony
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

Note that an HOC doesn't modify the input component, nor does it use inheritance to copy its behavior. Rather, an HOC composes(混合) the original component by wrapping it in a container component. An HOC is a pure(纯粹的) function with zero side-effects(副作用).

And that's it! The wrapped component receives all the props of the container, along with a new prop, data, which it uses to render its output. The HOC isn't concerned with how or why the data is used, and the wrapped component isn't concerned(关心) with where the data came from.

Because withSubscription is a normal function, you can add as many or as few arguments as you like. For example, you may want to make the name of the data prop configurable, to further(进一步) isolate(孤立) the HOC from the wrapped component. Or you could accept an argument that configures(配置) shouldComponentUpdate, or one that configures the data source. These are all possible because the HOC has full control over how the component is defined.

Like components, the contract(约定) between withSubscription and the wrapped component is entirely(完全的) props-based. This makes it easy to swap(交换) one HOC for a different one, as long as they provide the same props to the wrapped component. This may be useful if you change data-fetching libraries, for example.

# 不要改变原来的成分。使用组合。

Resist(抵制) the temptation(诱惑) to modify a component's prototype (or otherwise mutate(改变) it) inside an HOC.

```js
function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
    console.log('Current props: ', this.props);
    console.log('Next props: ', nextProps);
  };
  // The fact that we're returning the original input is a hint that it has
  // been mutated.
  return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);
```

There are a few problems with this. One is that the input component cannot be reused(重复使用) separately(各自) from the enhanced(加强的) component. More crucially(关键的), if you apply another HOC to EnhancedComponent that also mutates(改变) componentWillReceiveProps, the first HOC's functionality will be overridden!This HOC also won't work with function components, which do not have lifecycle methods.

Mutating HOCs are a leaky(有漏洞的) abstraction(抽象概念)—the consumer must know how they are implemented in order to avoid conflicts with other HOCs.

Instead of mutation, HOCs should use composition, by wrapping the input component in a container component:

```jsx harmony
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

