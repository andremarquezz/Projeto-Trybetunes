import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../images/logo.svg';
import styles from './Login.module.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      loading: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  userLogin = async () => {
    const { history } = this.props;
    const { loginName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: `${loginName}` });
    this.setState({ loading: false });
    history.push('/search');
  };

  render() {
    const minNum = 3;
    const { loginName, loading } = this.state;
    return (
      <div data-testid="page-login" className={ styles.container }>
        {loading ? (
          <Loading />
        ) : (
          <>
            <img src={ logo } alt="logo TrybeTunes" />
            <form>
              <label htmlFor="loginName">
                <input
                  autoComplete="off"
                  placeholder="Digite seu nome aqui"
                  name="loginName"
                  type="text"
                  data-testid="login-name-input"
                  onChange={ this.onInputChange }
                  value={ loginName }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ loginName.length < minNum }
                onClick={ this.userLogin }
              >
                Entrar
              </button>
            </form>
          </>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
