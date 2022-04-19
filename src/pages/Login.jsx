import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  userLogin = async () => {
    const { loginName, history } = this.props;
    this.setState({ loading: true });
    await createUser({ name: `${loginName}` });
    history.push('/search');
  };

  render() {
    const { loginName, eventOnChange, buttonDisabled, loading } = this.props;
    // se loading retorna loading
    return (
      <div data-testid="page-login">
        {loading ? (
          <Loading />
        ) : (
          <>
            <p>Login</p>
            <label htmlFor="loginName">
              Digite seu nome:
              <input
                name="loginName"
                type="text"
                data-testid="login-name-input"
                onChange={ eventOnChange }
                value={ loginName }
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ buttonDisabled }
              onClick={ this.userLogin }
            >
              Entrar
            </button>
          </>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  loginName: PropTypes.string.isRequired,
  // PropTypes.shape({history : PropTypes.object.isRequired,}),
  eventOnChange: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Login;
