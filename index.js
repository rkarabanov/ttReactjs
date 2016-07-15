import React from 'react'
import {render} from 'react-dom'
import App from './modules/App'
import {Router, Route, IndexRoute, hashHistory,browserHistory} from 'react-router'
import About from './modules/About'
import Reg from './modules/Registr'
render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
            <Route path="/about" component={About}/>
            <Route path="/registration" component={Reg}/>

    </Router>
), document.getElementById('app'));