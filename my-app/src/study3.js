/**
 * Created by admin on 2017/9/4.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Handling Events 处理事件&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * 处理带有反应元素的事件非常类似于处理DOM元素上的事件。有一些句法上的差异:
 * 1.React 事件以camelCase命名，而不是小写
 * 2.使用JSX将函数传递为事件处理程序，而不是字符串。
 *
 * 在React中不能 return false 以防止默认行为发生响应。您必须明确地调用preventDefault。
 */

function ActionLink() {
    function handleClick(e) {
        // 不能写成 return false,必须调用 e.preventDefault()
        e.preventDefault();
        console.log('The link was clicked.');
    }

    return (
        <a href="#" onClick={handleClick}>
            Click me
        </a>
    );
}

/*
 * e是一个合成事件。React 根据W3C规范定义这些合成事件，
 */

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

// ReactDOM.render(
//     <Toggle />,
//     document.getElementById('root')
// );

/*
 * 你必须注意在JSX的回调中this的意义.在JavaScript中，类方法不受默认约束。如果你忘了绑定这个。handleClick并将其传递给onClick，当函数实际上被调用时，它将没有定义。
 *
 * 如果调用bind惹恼了你，你可以有两种方法来解决这个问题。如果您正在使用实验性的属性初始化语法，您可以使用属性初始化器来正确地绑定回调:
 */

class LoggingButton extends React.Component {
    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.
    handleClick = () => {
        console.log('this is:', this);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Click me
            </button>
        );
    }
}

//如果您没有使用属性初始化语法，则可以在回调中使用一个箭头函数:
class LoggingButton2 extends React.Component {
    handleClick() {
        console.log('this is:', this);
    }

    render() {
        // This syntax ensures `this` is bound within handleClick
        return (
            <button onClick={(e) => this.handleClick(e)}>
                Click me
            </button>
        );
    }
}


ReactDOM.render(
    <LoggingButton2 />,
    document.getElementById('root')
);

