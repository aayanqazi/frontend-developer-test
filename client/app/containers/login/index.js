import React from 'react';
import { login, loginTitle, loginInput, loginButton } from '../../styles/login.scss';
import { connect } from 'react-redux';
import AuthMiddleware from '../../middleware/login';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        role: 'biker'
    }

    componentWillReceiveProps(newProps) {
        if (newProps.login.data.data && newProps.login.data.data.role === 'manager') {
            this.props.history.push('/manager');
        }
    }

    onSubmit = (ev) => {
        ev.preventDefault();
        this.props.onLogin({
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        });
    }

    render() {
        return (
            <form className={login} onSubmit={this.onSubmit}>
                <h1 className={loginTitle}>Delivery Service Company</h1>
                <input
                    onChange={(event) => this.setState({ username: event.target.value })}
                    type="email"
                    value={this.state.username}
                    className={loginInput}
                    placeholder="Email Adress"
                    autoFocus
                    required />
                <input
                    onChange={(event) => this.setState({ password: event.target.value })}
                    type="password"
                    value={this.state.password}
                    className={loginInput}
                    placeholder="Password"
                    required />
                <p>Role:</p>
                <select onChange={event => this.setState({ role: event.target.value })}
                    value={this.state.role}
                >
                    <option value="biker">
                        Biker
                    </option>
                    <option value="manager">
                        Manager
                    </option>
                </select>
                {
                    this.props.login.isError &&
                    <p style={{ color: 'red' }}>{this.props.login.data.error}</p>
                }
                <input type="submit" value="Lets Go" className={loginButton} />
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: credentials => dispatch(AuthMiddleware.login(credentials))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
