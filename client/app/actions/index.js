import * as types from './types';

export default class Action {
    static login(data) {
        return {
            type: types.LOGIN,
            data
        };
    }

    static loginSuccess(res) {
        return {
            type: types.LOGINSUCCESS,
            payload: res
        };
    }

    static loginFailed(res) {
        return {
            type: types.LOGINFAILED,
            payload: res
        };
    }

    static order() {
        return {
            type: types.ORDER
        };
    }

    static orderSuccess(res) {
        return {
            type: types.ORDERSUCCESS,
            payload: res.order
        };
    }

    static orderFailed(res) {
        return {
            type: types.ORDERFAILED,
            payload: res
        };
    }
}
