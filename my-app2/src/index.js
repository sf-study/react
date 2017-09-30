/**
 * Created by admin on 2017/9/29.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import UserAddPage from './pages/UserAdd';
import HomePage from './pages/Home';

ReactDOM.render((
    <Router>
        <div>
            <Route path="/" component={HomePage}/>
            <Route path="/user/add" component={UserAddPage}/>
        </div>
    </Router>
), document.getElementById('app'));