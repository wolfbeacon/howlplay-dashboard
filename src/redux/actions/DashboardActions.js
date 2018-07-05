import * as axios from 'axios';
axios.defaults.withCredentials = true;

const DASHBOARD_SIGNIN_URL = "/dashboard/signin/";


export function toggleNavbar() {
    return {
        type: 'TOGGLE_NAVBAR',
    }
}

export function missingToken(history) {
  return dispatch => {
    history.push('/');
    dispatch({type: 'MISSING_QUIZ_TOKEN'});
  }
}

export function login(token, history) {
    const promise = axios.post(DASHBOARD_SIGNIN_URL, {token : token}, {
        headers : {
            'Content-Type' : 'application/json',
        },
        withCredentials: true
    });
    history.push('/dashboard');
    return {
        type: 'LOGIN',
        payload: promise
    };

}
