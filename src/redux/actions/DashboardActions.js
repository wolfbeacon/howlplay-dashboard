import { DEFAULT_API_URL } from '../../configurations';

const DASHBOARD_SIGNIN_URL = DEFAULT_API_URL + "/dashboard/signin/";

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

export function setQuizToken(token, history) {
    return dispatch => {
      fetch(
        DASHBOARD_SIGNIN_URL,
        {
          method : 'POST',
          body : JSON.stringify({token : token}),
          headers : {
            'Content-Type' : 'application/json',
          },
          credentials: 'include',
          mode : 'cors'
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
