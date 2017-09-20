#和解

React提供了一个声明性API，这样您就不必担心每次更新会发生什么变化。这使得编写应用程序变得容易得多，但这在React中如何实现可能并不明显。本文解释了我们在React的“diffing”算法中所做的选择，这样组件更新就可以预测了，同时对于高性能应用来说也足够快。

##Motivation

当您使用React时，在一个时间点上，您可以想到render()函数，创建一个反应元素树。下一个状态或属性更新，render()将返回不同的React元素树。React然后需要弄清楚如何有效地更新UI以匹配最近的树。

对于这个算法问题，有一些通用的解决方案，可以生成最小数量的操作来将一棵树转换成另一棵树。然而，在O(n3)的顺序中，艺术算法的状态是复杂的，其中n是树中的元素个数。

如果我们在React中使用这个，显示1000个元素需要10亿次比较。这太贵了。相反，React实现了基于两个假设的启发式O(n)算法:

1. 不同类型的两个元素会产生不同的树。

2. 开发人员可以提示哪些子元素可以在不同的呈现中以关键的属性来稳定。

实际上，这些假设对于几乎所有实际用例都是有效的。

##dif算法

当dif两棵树,React首先比较两个根元素。根据根元素的类型，行为是不同的。

###不同类型的元素

每当根元素有不同的类型时，React将推倒旧树，从头开始建造新树。

当推倒一棵树时，旧的DOM节点被破坏了。组件实例接受componentWillUnmount(). 当构建一个新的树,新的DOM节点被插入到DOM中,组件实例接受componentWillMount()然后componentDidMount().任何与就的树相关的state都消失了

root下面的任何组件同样取得unmounted 并且他的state被破坏

```html
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```

###相同类型的DOM元素

当比较两个相同类型的DOM元素,React观察两者的属性,保持相同的底层DOM节点，仅仅更新改变的属性

```html
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

style也一样:

```html
<div style={{color: 'red', fontWeight: 'bold'}} />

<div style={{color: 'green', fontWeight: 'bold'}} />
```

处理DOM节点后，响应然后递归给子节点。

###相同类型的组件元素

当一个组件更新的时候,实例保持不变,因此，在呈现过程中维护状态。React更新底层的组件的属性来匹配新的元素,然后在底层的实例调用componentWillReceiveProps()和componentWillUpdate()

下一步,在前一个结果和新的结果上调用render()方法和diff算法

###递归对孩子

默认的,当在一个DOM节点上递归子元素, 每当有改变时候React仅仅遍历此时的子元素的列表和生成一个突变

例如,当在子元素的结尾添加一个元素,这两棵树之间的转换很好:

```html
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

如果你天真地执行它，在开始时插入一个元素会有更糟糕的性能。例如，这两棵树之间的转换工作很差:

```html
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

反应会使每个孩子产生突变，而并没有意识到可以保持其中两个子元素,这种效率低下可能是个问题。

###Keys

为了解决这一问题，反应支持一个key属性。当子元素有keys,React使用key来匹配原始子元素和后来的子元素,例如,添加一个key到一个低效的例子,可以有效的转变

```html
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

Now React knows that the element with key '2014' is the new one, and the elements with the keys '2015' and '2016' have just moved.

在实践中，找到key通常并不难。你将要显示的元素可能已经有一个唯一的ID，所以键可以来自你的数据:

```html
<li key={item.id}>{item.name}</li>
```

When that's not the case, you can add a new ID property to your model or hash some parts of the content to generate a key. The key only has to be unique among its siblings, not globally unique.

As a last resort, you can pass item's index in the array as a key. This can work well if the items are never reordered, but reorders will be slow.

###Tradeoffs

重要的是要记住，和解算法是一个实现细节。React可以在每一个动作上重新运行整个应用程序;最终的结果是一样的。我们经常改进启发式，以使公共用例更快。

在当前的实现中，您可以表示一个子树已经被移动到它的兄弟姐妹中，但你不能说它已经转移到别的地方了。该算法将重新运行整个子树。

因为React依赖于启发式，如果它们背后的假设没有得到满足，性能就会受到影响。

1. 该算法不会尝试匹配不同组件类型的子树。如果你看到你自己在两个有非常相似输出的分量类型之间交替，你可能想把它做成同样的类型。实际上，我们还没有发现这是一个问题。

2. 键应该是稳定的，可预测的，并且是唯一的。不稳定的键(如math . random()所生成的)会导致许多组件实例和DOM节点不必要地重新创建，这将导致子组件的性能下降和丢失状态。