/**
 * Created by admin on 2017/9/28.
 */
//  引入三个组件BrowserRouter, Route, Link，这3个组件都是react组件，react-router设计的非常好，它不是通过配置啊绑定啊这种语法来使用，而是直接可以像使用其他react组件一样，我们为其传入props参数来使用。
const { BrowserRouter, Route, Link } = ReactRouterDOM
const BasicExample = () => (
    // 把BrowserRouter放到最外层，给应用添加路由功能的容器组件.之后我们可以直接在应用里面添加Link组件，
    <BrowserRouter>
        <div>
            <ul>
                {/*Link组件的to属性就是对应到相应的路由地址的，每一个路由的path属性也是对应着路由地址，这个和上面的Link如果相同的话，点击对应的Link就可以跳转的对应的路由当中，每个路由还对应着一个component属性，这就是当地址跳转到对应的路由时会被渲染出来显示的组件了。*/}
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>
            <hr/>
            {/*使用route来添加正式的路由了*/}
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/topics" component={Topics}/>
        </div>
    </BrowserRouter>
)
const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)
const About = () => (
    <div>
        <h2>About</h2>
    </div>
)
const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>
        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
)
const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)
ReactDOM.render(<BasicExample />, document.getElementById('root'))