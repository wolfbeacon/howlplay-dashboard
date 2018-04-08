import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {Route, Switch} from 'react-router';
import {routerReducer} from 'react-router-redux';

import DisplayScore from './components/scoreboard/DisplayScore';
import Login from "./pages/Login";
import NotFound from "./pages/404";

import './css/main.scss';

import {DashboardNavbarReducer} from "./redux/reducers/DashboardReducers";
import {GroupReducer, QuizReducer} from "./redux/reducers/QuizReducers";
import {ModalReducer} from "./redux/reducers/ModalReducers";
import Dashboard from "./pages/Dashboard";
import {HashRouter} from "react-router-dom";

// we'll worry about redux later I just set this up so that way I can set up the redux router
const store = createStore(
    combineReducers({
        routing: routerReducer,
        dashboardNavbar: DashboardNavbarReducer,
        quizGroups: GroupReducer,
        quiz: QuizReducer,
        modal: ModalReducer
    })
);

const history = createHistory();


ReactDOM.render(
    <Provider store={store}>
        <HashRouter history={history}>
            <Switch>
                <Route exact path="/displayscore" component={DisplayScore}/>
                <Route exact path="/" component={Login}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route component={NotFound}/> {/*404 Route*/}
            </Switch>
        </HashRouter>
    </Provider> , document.getElementById('root'));
registerServiceWorker();
