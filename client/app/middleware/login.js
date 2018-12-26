import loginAction from './../actions/index';

export default class AuthMiddleware {
    static login(credentials) {
        return (dispatch) => {
            dispatch(loginAction.login());
            AuthMiddleware.authenticateUser(dispatch, credentials);
        };
    }

    static authenticateUser(dispatch, credentials) {
        fetch('http://localhost:3002/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials.username,
                password: credentials.password,
                role: credentials.role
            })
        }).then(arr => arr.json())
            .then(data => {
                if (data.error) {
                    dispatch(loginAction.loginFailed(data));
                } else {
                    localStorage.setItem('myData', JSON.stringify(data));
                    dispatch(loginAction.loginSuccess(data));
                }
            })
            .catch(err => dispatch(loginAction.loginFailed(err)));
    }
}
