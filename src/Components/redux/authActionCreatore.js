import axios from 'axios'
import * as actionTypes from './Actiontype'

export const authSuccess = (token, userid) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userid
        }
    }
}
export const authFailed = (value) => {

    return {
        type: actionTypes.AUTH_FAILED,
        payload: value
    }
}

export const auth = (em, pass, mode) => dispatch => {
    dispatch(authLoading(true));
    const authData = {
        email: em,
        password: pass,
        returnSecureToken: true
    }

    let authUrl = null;
    if (mode === "Sign Up") {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    }
    else {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    const API_KEY = "AIzaSyAXbHbgRorW9C0AQti8kVR0F6IX7ZJb4AY";
    axios.post(authUrl + API_KEY, authData)
        .then(response => {
            dispatch(authLoading(false));
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
        })
        .catch(err => {
            dispatch(authLoading(false));
            dispatch(authFailed(err.response.data.error.message));
        })

}
export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    }
    else {
        const expirationtime = new Date(localStorage.getItem('expirationTime'));
        if (expirationtime <= new Date) {
            dispatch(logout());
        }
        else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }

}
export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {

        type: actionTypes.AUTH_LOGOUT,
    }
}
export const authLoading = (value) => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: value
    }
}