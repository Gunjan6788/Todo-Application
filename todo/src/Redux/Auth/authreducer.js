import {
    AUTH_USER
}
from './actionTypes'

const initState = {
    isAuth:false
}

export const authreducer = (state=initState,action) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                isAuth:action.payload
            }

        default:
            return {...state}
    }
}