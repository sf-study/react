/**
 * Created by admin on 2017/9/1.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//将表达式嵌入JSX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function formatName(user) {
//   return user.firstName + ' ' + user.lastName;
// }
//
// function getGreeting(user) {
//   if (user) {
//     return <h1>Hello, {formatName(user)}!</h1>;
//   }
//   return <h1>Hello, Stranger.</h1>;
// }
//
// const user = {
//   firstName: 'xinxin',
//   lastName: 'li',
//   avatarUrl:''
// };
//
// const element = getGreeting(user);

// 设置属性
// const element = <div tabIndex="0"></div>;

// 使用花括号在属性中嵌入js表达式
// const element = <img src={user.avatarUrl}></img>;

/*
 * 当在属性中嵌入JavaScript表达式时，不要将引号括在大括号内,否则，JSX将把属性视为字符串字面意思而不是表达式

 * 警告
 * 因为JSX更接近于JavaScript而不是HTML, React DOM使用camelCase属性命名约定而不是HTML属性名
 */

// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );

//Rendering Elements 渲染元素//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * 有人可能会混淆元素与更广为人知的“组件”概念

 * 根据我们目前的知识，更新UI的惟一方法是创建一个新元素，并将其传递给ReactDOM.render()
 */

//  function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(
//     element,
//     document.getElementById('root2')
//   );
// }

// setInterval(tick, 1000);

//Components and Props 组件和属性////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * 定义组件最简单的方法是编写一个JavaScript函数
 * 这个函数是一个有效的反应组件，因为它接受一个带有数据的单一“道具”对象参数，并返回一个反应元素。
 * 我们称这些组件为“功能性”，因为它们实际上是JavaScript函数
 * 如下
 */
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

/*
 * 当React看到代表用户定义组件的元素时，它将JSX属性传递给该组件作为单个对象。我们称这个物体为“props”。
 *
 */

const element = <Welcome name="Sara" />;
// ReactDOM.render(
//     element,
//     document.getElementById('root')
// );

/*
 * 总是用大写字母开始组件名称
 */

function App() {
    return (
        <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

function Avatar(props) {
    return (
        <img className="Avatar"
             src={props.user.avatarUrl}
             alt={props.user.name}
        />
    );
}

function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}

function Comment(props) {
    return (
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}

/*
 * 首先，提取组件似乎是一种繁重的工作，但是拥有一个可重用组件的调色板在更大的应用程序中是有回报的。
 * 一个好的经验法则是，如果你的UI的一部分被多次使用(按钮、面板、头像)，
 * 或者在它自己的(应用程序、FeedStory、评论)中足够复杂，那么它是一个可重用组件的好候选者。
 */

/*
 * Props是只读的
 */