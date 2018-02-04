import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {Router, Route, Switch} from 'react-router';
import {routerReducer} from 'react-router-redux';

import NotFound from "./pages/404"
import Homepage from './pages/Homepage';
import './css/main.scss';

import {DashboardNavbarReducer} from "./redux/reducers/DashboardReducers";
import {GroupReducer, QuizReducer} from "./redux/reducers/QuizReducers";
import Dashboard from "./pages/Dashboard";

// we'll worry about redux later I just set this up so that way I can set up the redux router
const store = createStore(
    combineReducers({
        routing: routerReducer,
        dashboardNavbar: DashboardNavbarReducer,
        quizGroups: GroupReducer,
        quiz: QuizReducer
    })
);

const history = createHistory();


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route component={NotFound}/> {/*404 Route*/}
            </Switch>
        </Router>
    </Provider> , document.getElementById('root'));
registerServiceWorker();
