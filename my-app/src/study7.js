/**
 * Created by admin on 2017/9/6.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Lifting State Up 提升状态&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * 经常的,个别的组件需要反映相同的变化数据.我们建议将共享状态提升到最接近的共同祖先
 */

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};


//转换成摄氏温度
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

//转换成华氏温度
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

/*
 * 转换
 * temperature 字符串 温度
 * convert function 转换方法
 */
function tryConvert(temperature, convert) {
    //输入的温度转换成数字类型
    const input = parseFloat(temperature);
    //判断能否转换成数字,不能就返回空字符串
    if (Number.isNaN(input)) {
        return '';
    }
    //输出的温度,转换
    const output = convert(input);
    //乘以1000,四舍五入在除以1000
    const rounded = Math.round(output * 1000) / 1000;
    //返回字符串
    return rounded.toString();
}


function BoilingVerdict(props) {
    //温度大于100,可以把水煮沸
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

// 温度输入
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        // this.state = {temperature: ''};
    }

    handleChange(e) {
        //由父元组件Calculator组件通过prop属性提供提供
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        //替换local state
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            //fieldset 元素可将表单内的相关元素分组,<fieldset> 标签将表单内容的一部分打包，生成一组相关表单的字段。
            //当一组表单元素放到 <fieldset> 标签内时，浏览器会以特殊方式来显示它们，它们可能有特殊的边界、3D 效果，或者甚至可创建一个子表单来处理这些元素。
            <fieldset>
                {/*所有浏览器都支持 <legend> 标签
                 legend 元素为 fieldset 元素定义标题（caption）。
                 */}
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                {/*当Input输入的时候调用onchange方法,这个onchange方法调用的是在Calculator组件中调用该组件,通过prop传过来的方法*/}
                <input value={temperature}
                       onChange={this.handleChange} />
            </fieldset>
        );
    }
}

//计算器,通过在表单中输入的数字来计算水温,然后显示结果
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        //绑定点击事件
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        //在本地state存储,这里的state是我们从Inputs提高上来的状态
        this.state = {
            temperature: '',
            scale: 'c'
        };
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        //赋值
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        //转换摄氏温度
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        //转换成华氏温度
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                {/*这个子组件渲染以前,父组件Calculator已经指定摄氏温度TemperatureInput的 onTemperatureChange 是父组件handleCelsiusChange方法*/}
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
}




/*
 * 在React中,共享state是很成熟的根据需要通过把他移动到组件的最近的共同祖先,这个技术叫做提高state ,我们将会从TemperatureInput 移动本地的state,并且把他移动到Calculator
 *
 * 如果Calculator 拥有共享的state,它成为了两个输入的当前温度的“真相之源”,它可以指示它们都有一致的值。由于这两个元素的props 都来自相同的父计算器组件，所以两个输入将始终保持同步。
 */

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);

/*
 * 经验教训；
 * 对于任何在React 应用程序中发生变化的数据，都应该有一个“真实的来源”。通常情况下,state 首先添加到需要它进行呈现的组件中。然后，如果其他组件也需要它，
 * 你可以把它提升到他们最接近的共同祖先。而不是尝试在不同的组件间同步状态，您应该依赖自顶向下的数据流。
 *
 * 提升状态涉及到编写更多的“样板”代码，而不是双向绑定方法，但作为一个好处，找到并隔离缺陷的工作要少得多。因为任何状态的“生命”都存在于某个组件中，而仅仅是组件本身就可以改变它，
 * 臭虫的表面积大大减少了。此外，您还可以实现任何自定义逻辑来拒绝或转换用户输入。
 *
 * 如果某些东西可以从任何props或state中得到，它可能不应该是在state中。其他输入的值总是可以从render()方法中计算出来
 * 这使我们可以在不丢失用户输入精度的情况下清除或应用于其他字段。
 *
 * 当您在UI中看到错误时，可以使用React Developer工具检查道具并向上移动树，直到找到负责更新状态的组件。这可以让您跟踪bug的来源:
 */