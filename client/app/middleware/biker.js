import Action from './../actions/index';

export default class BikerMiddleware {
    static getData(credentials) {
        return (dispatch) => {
            dispatch(Action.biker());
            BikerMiddleware.getList(credentials, dispatch);
        };
    }

    static getList(credentials, dispatch) {
        fetch('http://localhost:3002/myData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
            .then(arr => arr.json())
            .then(data => {
                if (data.error) {
                    dispatch(Action.bikerFailed(data));
                } else {
                    dispatch(Action.bikerSuccess(data));
                }
            })
            .catch(err => dispatch(Action.bikerFailed(err)));
    }
}
