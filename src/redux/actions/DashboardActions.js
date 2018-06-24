import { DEFAULT_API_URL } from '../../configurations';
import axios from 'axios/index';

const DASHBOARD_SIGNIN_URL = DEFAULT_API_URL + "/dashboard/signin/";

export function toggleNavbar() {
    return {
        type: 'TOGGLE_NAVBAR',
    }
}

export function setQuizToken(token, history) {
    return dispatch => {
      fetch(
        DASHBOARD_SIGNIN_URL,
        {
          method : 'POST',
          body : JSON.stringify({token : token})
        }
      ).then(resp => {
        return resp.json();
      }).then(data => {
        console.log(data)
        if (!data) {
          dispatch({
            type: 'BAD_QUIZ_TOKEN'
          });
        } else {
          dispatch({
            type: 'SET_QUIZ_TOKEN',
            payload: token
          });
          history.push('/dashboard');
        }
      }).catch(err => {
        dispatch({
          type: 'MISSING_QUIZ_TOKEN'
        });
      })
    }
}
