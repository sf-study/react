/**
 * Created by admin on 2017/9/5.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Forms 表单&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * Controlled Components
 * 在HTML中，表单元素如< input >，< textarea >，< select >通常维护自己的状态，并基于用户输入更新它。在React中，可变状态通常保存在组件的状态属性中，并且只与setState()进行更新。
 * 我们可以将两者结合起来，使 React state成为“真理的单一来源”。然后，呈现表单的React 组件还控制在随后的用户输入中发生的情况。以这种方式对其值进行控制的输入表单元素称为“受控组件”。
 */

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// ReactDOM.render(
//     <NameForm />,
//     document.getElementById('root')
// );

/*
 * 因为value属性设置在我们的表单元素上，所以显示的值将永远是这个,
 *
 * 对于受控组件，每个状态突变都会有一个相关的处理函数,这使得修改或验证用户输入变得简单明了.
 */

/*
 * textarea
 *
 * 在React中，一个< textarea >使用一个value 属性。这样，使用< textarea >的表单可以非常类似于使用单行输入的表单:
 */

class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Please write an essay about your favorite DOM element.'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// ReactDOM.render(
//     <EssayForm />,
//     document.getElementById('root')
// );

/*
 * select
 *
 * 在根标签上设置value属性,设置默认的选中,如下:
 */

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coconut'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite La Croix flavor:
                    {/*在根标签上设置value属性,设置默认的选中*/}
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// ReactDOM.render(
//     <FlavorForm />,
//     document.getElementById('root')
// );

/*
 * 处理多个输入
 *
 * 当您需要处理多个受控的输入元素时，你可以将名称属性添加到每个元素，并让选择怎样做基于 event.target.name 的值的处理程序函数。
 */

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        );
    }
}

ReactDOM.render(
    <Reservation />,
    document.getElementById('root')
);

/*
 * 替代控制组件
 *
 * 使用受控组件有时会很乏味,因为您需要为每一种方法编写一个事件处理程序，从而通过一个React 组件来改变和输送所有的输入状态。
 * 当你把一个已经存在的代码库转换为React时，这会变得特别烦人。或将React 应用程序与非React 库集成。
 * 在这些情况下,你可能想要检查不受控制的组件，用于实现输入表单的另一种技术
 */