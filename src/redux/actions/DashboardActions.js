import {push} from 'react-router-redux';
import axios from 'axios/index';

import {DEFAULT_API_URL} from "../../configurations";

export function toggleNavbar() {
    return {
        type: 'TOGGLE_NAVBAR',
    }
}

export function setQuizToken(token) {
    return dispatch => {
      axios.get(DEFAULT_API_URL + token).then((data) => {
        if (data.data.length === 0) {
          dispatch({
            type: 'BAD_QUIZ_TOKEN'
          });
        } else {
          dispatch({
            type: 'SET_QUIZ_TOKEN',
            payload: token
          });
          dispatch(push('#/dashboard'));
        }
      }, (err) => {
        dispatch({
          type: 'MISSING_QUIZ_TOKEN'
        });
      });
    }
}
