export function toggleNavbar() {
    return {
        type: 'TOGGLE_NAVBAR',
    }
}

export function setQuizToken(token){
    return {
        type: 'SET_QUIZ_TOKEN',
        payload: token
    }
}