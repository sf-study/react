/**
 * Created by admin on 2017/9/5.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Lists and Keys 列表和钥匙&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * 呈现多个组件
 *
 */

// const numbers = [1, 2, 3, 4, 5];
// const listItems = numbers.map((number) =>
//     <li>{number}</li>
// );
//
// ReactDOM.render(
//     <ul>{listItems}</ul>,
//     document.getElementById('root')
// );

/*
 * 基本列表组件
 *
 */

// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) =>
//         <li key={number.toString()}>
//             {number}
//         </li>
//     );
//     //使用项目索引作为key
//     const todoItems = todos.map((todo, index) =>
//         // Only do this if items have no stable IDs
//         <li key={index}>
//             {todo.text}
//         </li>
//     );
//     return (
//         <ul>{listItems}</ul>
//     );
// }
// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById('root')
// );

//当您运行此代码时，您将得到一个警告，应该为列表项提供一个键。A "key"是在创建元素列表时需要包含的一个特殊字符串属性。我们将讨论下一节为什么重要。

/*
 * Keys
 * 键有助于识别哪些项目已经更改、添加或删除.应该将键给数组中的元素赋予元素一个稳定的标识:
 *
 * 选择关键字的最佳方法是使用一个字符串，该字符串在其兄弟姐妹中唯一地标识一个列表项。
 * 大多数情况下，您会使用来自数据的id作为键:
 *
 * 当您没有呈现项目的稳定id时，您可以使用项目索引作为最后的手段:如果项目可以重新排序，我们不建议使用索引键，因为那样会很慢
 *
 */

/*
 * 用键提取组件
 *
 * 键只在周围数组的上下文中有意义。
 * 例如，如果您提取了一个ListItem组件，您应该将键保存在数组中的< ListItem / >元素上，而不是ListItem本身的根< li >元素。
 */

// function ListItem(props) {
//     return <li>{props.value}</li>;
// }
//
// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) =>
//         // Correct! Key should be specified inside the array.
//         <ListItem key={number.toString()}
//                   value={number} />
//     );
//     return (
//         <ul>
//             {listItems}
//         </ul>
//     );
// }
//
// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById('root')
// );

/*
 * 键只能在兄弟姐妹中是唯一的
 *
 * 数组中使用的键在其兄弟姐妹中应该是唯一的。然而，他们不需要在全局范围内独一无二。当我们产生两个不同的数组时，我们可以使用相同的键:
 */

function Blog(props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <li key={post.id}>
                    {post.title}
                </li>
            )}
        </ul>
    );
    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );
    // const contentid = posts.map((post) =>
    //     <Post
    //         key={post.id}
    //         id={post.id}
    //         title={post.title} />
    // );
    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    );
}

const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
    <Blog posts={posts} />,
    document.getElementById('root')
);

/*
 * 键可以作为提示，但它们不会传递给组件。如果您在组件中需要相同的值，请将其显式地传递为具有不同名称的 prop:
 */


/*
 * 嵌入在JSX map()
 *
 * JSX允许在花括号中嵌入任何表达式，因此我们可以内联映射()结果:
 *
 * 有时这会导致更清晰的代码，但是这种样式也会被滥用。就像在JavaScript中一样，由您决定是否值得为可读性提取一个变量。请记住，如果map()主体是嵌套的，那么可能是提取组件的好时机。
 */

// function NumberList(props) {
//     const numbers = props.numbers;
//     return (
//         <ul>
//             {numbers.map((number) =>
//                 <ListItem key={number.toString()}
//                           value={number} />
//             )}
//         </ul>
//     );
// }