/**
 * Created by admin on 2017/9/4.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Conditional Rendering 条件渲染&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
////////////////////////////////////////////////////////////////////////////////////////////////////


/*
 * 在React中,你可以创建特有的封装你需要的行为的组件,然后，根据应用程序的状态，只能呈现其中的一些。
 * 在React工作中，条件呈现与JavaScript中的条件工作相同。
 */

function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

// ReactDOM.render(
//     // Try changing to isLoggedIn={true}:
//     <Greeting isLoggedIn={false} />,
//     document.getElementById('root')
// );

/*
 * Element Variables
 * 元素变量
 * 你可以使用变量来存储元素,可以帮助你有条件的渲染组件的某个部分,并且其余的输出不变
 */

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        let button = null;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

// ReactDOM.render(
//     <LoginControl />,
//     document.getElementById('root')
// );

/*
 * 内联If与逻辑&操作符
 * 您可以将任何表达式嵌入到JSX中，用花括号将它们包装起来。
 *
 * 还要记住，当条件变得太复杂时，可能是提取组件的好时机
 */

function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
            <h2>
                You have {unreadMessages.length} unread messages.
            </h2>
            }
        </div>
    );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
// ReactDOM.render(
//     <Mailbox unreadMessages={messages} />,
//     document.getElementById('root')
// );

/*
 * 防止组件呈现
 *
 * 在极少数情况下，您可能希望组件隐藏自己，即使它是由另一个组件呈现的。返回null而不是它的渲染输出。
 * 从组件的呈现方法返回null不会影响组件的生命周期方法的触发。
 * 例如，componentWillUpdate和componentDidUpdate仍然被调用。
 */

function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }

    return (
        <div className="warning">
            Warning!
        </div>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: true}
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);