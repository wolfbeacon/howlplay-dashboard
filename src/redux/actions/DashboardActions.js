import * as axios from 'axios';
import {push} from "react-router-redux";

const DASHBOARD_SIGNIN_URL = "/dashboard/signin/";


export function toggleNavbar() {
    return {
        type: 'TOGGLE_NAVBAR',
    }
}


export function login(token) {
    return async (dispatch) => {
        const data = await axios.post(DASHBOARD_SIGNIN_URL, {token : token}, {
            headers : {
                'Content-Type' : 'application/json',
            },
        });

        dispatch({
            type: 'LOGIN',
            payload: data
        });

        if (!data.error) {
            dispatch(push('/dashboard'));
        }

    }


}
