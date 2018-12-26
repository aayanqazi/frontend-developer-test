import Action from './../actions/index';
import axios from 'axios';

export default class OrderMiddleware {
    static order() {
        return (dispatch) => {
            dispatch(Action.order());
            OrderMiddleware.getList(dispatch);
        };
    }

    static getList(dispatch) {
        axios.get('http://localhost:3002/parcels')
            .then(val => {
                dispatch(Action.orderSuccess(val.data));
            })
            .catch(err => dispatch(Action.orderFailed(err)));
    }
}
