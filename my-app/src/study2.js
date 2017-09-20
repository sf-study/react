/**
 * Created by admin on 2017/9/4.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////
// State and Lifecycle&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * State 类似于props，但它是私有的，由组件完全控制。
 * 我们之前提到过，定义为classes的组件有一些额外的特性。本地state 就是这样:只提供给classes的特性。
 */

//将函数转换为类
// 1.创建一个ES6的class,并且继承React.Component
class Clock extends React.Component {
    //构造函数,初始化 this.state
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }


    //组件安装之后执行-这些方法被称为生命周期的钩子
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    //组件卸载之前执行
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    // 2.添加一个单个的叫做render()的方法
    render() {
        // 3.返回html元素的结构
        return (
            <div>
                <h1>Hello, world!</h1>
                {/* 4.this.props*/}
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);

/*
 Clock 时钟现在被定义为一个类而不是一个函数
 这使我们可以使用其他特性，例如本地状态和生命周期钩子
 */

/*
 给Class添加本地State
 类组件应该始终使用props调用基构造函数
 */

/*
 * 给Class添加生命周期方法
 * 每当Class第一次呈现到DOM时，我们就需要设置一个计时器。这被称为“mounting(安装)” React。
 * 我们还想清除计时器，每当Class产生的DOM被删除。这被称为“unmounting卸载”
 * 当组件挂载和卸载时，我们可以声明组件类上的特殊方法来运行一些代码:
 *
 * this.props是由React自身建立,this.state有一个特殊的意义,如果你需要存储一些不被用于视觉输出的内容,你可以自由的手动在class上添加额外的字段
 * 如果在render()中不使用某些东西,它就不应该在state中
 * 我们将会在componentWillUnmount()方法的生命周期钩子拆掉timer
 *
 * 最后我们将会执行tick()方法,它每秒都会运行一次
 * 他将会使用this.setState(),计划更新到组件本地的状态
 */

/*
 * 回顾运行
 * 1.当<Clock />被传递到ReactDOM.render(),React 调用Clock 组件的构造函数,因为调用Clock组件需要展示当前时间,他使用一个obj初始化this.state包含当前时间
 * 稍后我们会更新这个状态
 * 2.然后React调用Clock组件的render()方法,这个方法是React知道应该在屏幕上展示的内容,然后React更新DOM来匹配Clock组件的渲染输出
 * 3.当Clock的输出已经被插入到DOM中,React调用componentDidMount()生命周期钩子,在这个方法里面,Clock组件请求浏览器来简历一个计时器,每秒调用一次tick()方法
 * 4.每秒钟浏览器调用tick()方法.在这个方法里面,Clock组件通过使用一个包含当前时间对象调用setState()方法安排一个UI更新
 * 感谢setState()的调用,React知道state已经被更新,然后再一次调用render()方法,来知道应该在屏幕上展示什么
 * 这个时候,render()方法里面的this.state.date将会变化,然后渲染删除将会包含更新的时间.React就这这样子更新DOM
 * 5.如果Clock组件要被从DOM中移除,React会调用componentWillUnmount(),然后计时器就会被停止
 */

/*
 * 正确使用State
 *
 * about setState()
 * 1.不要直接修改State,要使用setState()方法
 * 你只能在构造函数中分配this.state
 * 2.状态更新可能是异步的
 * React可以批量处理多个setState()的调用
 * 因为this.props和this.state可能被异步更新,你不能使用他们的值来计算下一次的更新
 * 为了清除这种,使用第二种方法:setState()接受一个function而不是一个对象,这个function 将会接受的第一个参数是来自上一个state,和当前时间的props作为第二个参数
 * this.setState((prevState, props) => ({
 counter: prevState.counter + props.increment
 }));
 或者
 // Correct
 this.setState(function(prevState, props) {
 return {
 counter: prevState.counter + props.increment
 };
 });
 * 3.状态更新合并
 * 当你调用setState(),React会合并你提供的对象到当前的state
 *
 * 这个合并是浅合并
 */

/*
 * 数据流
 * 父组件和子组件都无法知道某个组件是有状态的还是无状态的,它们不应该关心它是定义为函数还是类
 * 这就是为什么状态通常被称为本地或封装的原因。除了拥有并设置它的组件之外，其他组件无法访问它。
 * 一个组件可以选择将其state 作为其子组件的props 来传递:
 */
