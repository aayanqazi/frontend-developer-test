import Action from './../actions/index';

export default class OrderMiddleware {
    static order() {
        return (dispatch) => {
            dispatch(Action.order());
            OrderMiddleware.getList(dispatch, );
        };
    }

    static getList(dispatch) {
        fetch('http://localhost:3002/parcels')
            .then(arr => arr.json())
            .then(data => {
                if (data.error) {
                    dispatch(Action.orderFailed(data));
                } else {
                    dispatch(Action.orderSuccess(data));
                }
            })
            .catch(err => dispatch(Action.orderFailed(err)));
    }
}
