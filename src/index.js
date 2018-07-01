import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {Route, Switch} from 'react-router';
import {ConnectedRouter, routerMiddleware, routerReducer} from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import thunk from "redux-thunk";

import DisplayScore from './components/scoreboard/DisplayScore';
import Login from "./pages/Login";
import NotFound from "./pages/404";

import './css/main.scss';

import {DashboardNavbarReducer, DashboardReducer} from "./redux/reducers/DashboardReducers";
import {GroupReducer, QuizReducer} from "./redux/reducers/QuizReducers";
import {ModalReducer} from "./redux/reducers/ModalReducers";
import {ScoreboardReducer} from "./redux/reducers/ScoreboardReducers";
import Dashboard from "./pages/Dashboard";

const history = createHistory();

// we'll worry about redux later I just set this up so that way I can set up the redux router
export const store = createStore(
    combineReducers({
        routing: routerReducer,
        dashboardNavbar: DashboardNavbarReducer,
        dashboard: DashboardReducer,
        quizGroups: GroupReducer,
        quiz: QuizReducer,
        modal: ModalReducer,
        scoreboard: ScoreboardReducer
    }), applyMiddleware(thunk, routerMiddleware(history), promiseMiddleware)
);


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/displayscore" component={DisplayScore}/>
                <Route exact path="/" component={Login}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route component={NotFound}/> {/*404 Route*/}
            </Switch>
        </ConnectedRouter>
    </Provider> , document.getElementById('root'));
registerServiceWorker();
