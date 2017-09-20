/**
 * Created by admin on 2017/9/6.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Composition vs Inheritance 组合和继承 &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * React  有一个强大的组合模型,我们建议使用组合模型代替继承来重用组件之间的代码
 *
 *
 */

/*
 * Containment 包含
 *
 * 一些组件不知道自己的子组件提前了,在组件中这个是特别常见的,例如侧边栏或者对话框代表一般的盒子
 *
 * 我们建议使用特殊子组件属性的组件,直接传递子元素到该组件的输出
 */

function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

//其他组件通过嵌套JSX来传递任意的子元素:但是这并不常见
function WelcomeDialog() {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
            </p>
        </FancyBorder>
    );
}

//有时您可能需要一个组件中的多个“漏洞”。在这种情况下，你可以提出自己的习惯，而不是使用子元素
function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

function App() {
    return (
        <SplitPane
            left={
                <Contacts />
            }
            right={
                <Chat />
            } />
    );
}

/*
 * Specialization 特殊化
 *
 * 有时我们认为组件是其他组件的“特殊情况”。例如，我们可能会说“欢迎”是一个特殊的对话框。
 *
 * 这也是通过组合实现的，其中一个更“特殊”的组件呈现了一个更“通用”的组件，并通过属性来配置它
 */

function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
        </FancyBorder>
    );
}

function WelcomeDialog2() {
    return (
        <Dialog
            title="Welcome"
            message="Thank you for visiting our spacecraft!" />
    );
}

//对于定义为类的组件，组合也同样适用

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''};
    }

    render() {
        return (
            <Dialog title="Mars Exploration Program"
                    message="How should we refer to you?">
                <input value={this.state.login}
                       onChange={this.handleChange} />
                <button onClick={this.handleSignUp}>
                    Sign Me Up!
                </button>
            </Dialog>
        );
    }

    handleChange(e) {
        this.setState({login: e.target.value});
    }

    handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
    }
}

/*
 * 继承呢?
 *
 * 我们还没有发现任何用例，我们建议创建组件继承层次结构。
 *
 * 属性和组合给您所有的灵活性，您需要以明确和安全的方式自定义组件的外观和行为,请记住，组件可以接受任意的属性，包括原始值、React 元素或函数。
 *
 * 如果您想在组件之间重用非ui功能，我们建议将其提取到一个单独的JavaScript模块中。组件可以导入它并使用该函数、对象或类，而不扩展它。
 */