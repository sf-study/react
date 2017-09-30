/**
 * Created by admin on 2017/9/29.
 */
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class Home extends React.Component {
    render () {
        return (
            <div>
                <header>
                    <h1>Welcome</h1>
                </header>

                <main>
                    <Link to="/user/add">添加用户</Link>
                </main>
            </div>
        );
    }
}

export default Home;