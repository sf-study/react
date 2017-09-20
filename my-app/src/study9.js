/**
 * Created by admin on 2017/9/11.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Thinking in React &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * 从模仿开始
 */



//但是你怎么知道应该是什么呢?仅仅使用相同的技术来决定是否应该创建一个新的函数或对象。一个这样的技术是单一责任原则，也就是说，一个组件最好只做一件事。如果它最终成长，它应该被分解成更小的子组件。

//显示每个类别的标题
class ProductCategoryRow extends React.Component {
    render() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
}

//为每个产品显示一行
class ProductRow extends React.Component {
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

//根据用户输入显示和筛选数据集合
/*
 * 表头并不是他自己的组件.我们把他作为ProductTable的一部分,因为它是呈现数据收集的一部分，这是ProductTable的责任
 * 如果这个表头变的复杂,有自己的ProductTableHeader 组件是必要的
 */
class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
        console.log(this.props.inStockOnly)
        this.props.products.forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}


// 接收所有用户输入

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    handleInStockInputChange(e) {
        this.props.onInStockInput(e.target.checked);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockInputChange}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}


// 包含示例的全部内容
class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleInStockInput = this.handleInStockInput.bind(this);
    }

    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockInput(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextInput={this.handleFilterTextInput}
                    onInStockInput={this.handleInStockInput}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
);

/*
 * 将UI分解为组件层次结构
 *
 * 您要做的第一件事是在模拟的每个组件(和子组件)周围绘制框，并给它们命名。
 *
 * 一个这样的技术是单一责任原则，也就是说，一个组件最好只做一件事。如果它最终成长，它应该被分解成更小的子组件。
 *
 * 由于您经常向用户显示JSON数据模型，您将发现如果您的模型构建正确，
 */

/*
 * 最简单的方法是构建一个版本，它接受您的数据模型，并呈现UI，但没有交互性。最好是将这些过程解耦，因为构建静态版本需要大量的输入和思考，添加交互性需要大量的思考而不是大量的打字。
 *
 * 要构建一个静态版本的应用程序，它可以呈现您的数据模型,您需要构建组件来重用其他组件，并使用属性传递数据。属性是一种将数据从父母传递给孩子的方法。如果你熟悉状态的概念,不要使用状态来构建这个静态版本。状态只保留于交互性，即随时间变化的数据。因为本例是一个静态版本的应用，你不需要它。
 *
 * 您可以构建自顶向下或自底向上。也就是说，您可以从在层次结构中构建更高的组件开始(即从FilterableProductTable开始)，或者在它的底层构建组件(ProductRow)。在更简单的示例中，通常更容易进行自顶向下，在更大的项目上，更容易自底向上，并在构建时编写测试。
 *
 * 在这个步骤的最后，您将拥有一个可重用组件库，它可以呈现您的数据模型。组件只会有render()方法，因为这是您的应用程序的静态版本。层次结构顶部的组件(FilterableProductTable)将把您的数据模型作为一个支柱。如果您对底层数据模型进行了更改，然后再一次调用ReactDOM.render()，UI会更新,容易看到您的 UI 更新的在哪里要更改以来有没有什么复杂下去。的单向数据流(也称为单向绑定)使一切都保持模块化和快速。
 */

/*
 * 在React中有两种类型的“模型”数据:props and state.
 */

/*
 * 步骤3:识别UI状态的最小(但完整的)表示
 *
 * 为了使UI具有交互性，您需要能够触发对底层数据模型的更改。React 让状态变得简单。
 *
 * 要正确地构建你的应用程序，你首先需要考虑你的应用程序需要的最小的可变状态集。这里的关键是:不要重复你自己。找出应用程序需要的状态的绝对最小表示，并计算所需的其他一切。例如，如果你正在构建一个TODO列表，只需要保持一个数组的TODO项;不要为计数保留一个单独的状态变量。相反,当您想要呈现TODO计数时，只需使用TODO条目数组的长度。
 *
 * 在我们的示例应用程序中考虑所有的数据片段。我们有:
 * 产品的原始列表
 * 用户输入的搜索文本
 * 复选框的值
 * 过滤后的产品列表
 *
 * 我们来看看每一个，找出哪个是状态。简单地问三个关于每一个数据的问题:
 * 它是通过属性传递给父母的吗?如果是这样，它可能不是state。
 * 它会随时间变化吗?如果是这样，它可能不是state。
 * 你能基于其他的状态或组件的属性来计算它吗?如果是这样，它就不是状态。
 *
 * 最初的产品列表作为属性传入，所以这不是状态。搜索文本和复选框似乎是状态，因为它们随时间而变化，无法从任何东西中计算出来。最后，过滤后的产品列表不是状态，因为它可以通过将原始产品列表与搜索文本和复选框的值相结合来计算。
 *
 * 最后，我们的状态是:
 * 用户输入的搜索文本
 * 复选框的值
 */

/*
 * 步骤4:确定你的state应该生活在哪里
 *
 * 我们已经确定了最小的app状态集是什么。接下来，我们需要识别哪个组件发生了突变，或者拥有这个状态。
 *
 * 记住:React 是所有关于单向数据流的组件层次结构。可能不清楚哪个组件应该拥有哪个状态。对于新手来说，这通常是最具挑战性的部分，因此，按照以下步骤来计算:
 *
 * 应用程序中的每个状态:
 * 识别基于该状态的每个组件。
 * 找到一个共同的所有者组件(在层次结构中需要状态的所有组件之上的一个组件)。
 * 在层级中，公共所有者或其他更高的组件应该拥有该状态。
 * 如果你找不到一个有意义的组件，那么创建一个新组件，仅仅是为了保存状态，并将其添加到公共所有者组件之上的层次结构中的某个地方。
 *
 * 让我们为我们的应用程序运行这个策略:
 * 基于状态和SearchBar的ProductTable需要对ProductTable进行筛选，以显示搜索文本并检查状态。
 * 公共所有者组件是FilterableProductTable
 * 从概念上讲，过滤文本和检查值在FilterableProductTable中是有意义的
 */

/*
 * 步骤5:添加反向数据流
 *
 *
 */