import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const login = (state = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: []
}, action) => {
    switch (action.type) {
        case types.LOGIN:
            return { ...state, isLoading: true };
        case types.LOGINSUCCESS:
            return { ...state, isLoading: false, isError: false, isSuccess: true, data: action.payload };
        case types.LOGINFAILED:
            return { ...state, isLoading: false, isError: true, isSuccess: false, data: action.payload };
        default:
            return state;
    }
};

const order = (state = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    order: []
}, action) => {
    switch (action.type) {
        case types.ORDER:
            return { ...state, isLoading: true };
        case types.ORDERSUCCESS:
            return { ...state, isLoading: false, isError: false, isSuccess: true, order: action.payload };
        case types.ORDERFAILED:
            return { ...state, isLoading: false, isError: true, isSuccess: false, order: action.payload };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    login,
    order,
    routing
});

export default rootReducer;
