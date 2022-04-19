import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      // buttonDisabled: true,
      loading: false,
    };
  }

  // validateButton = () => {
  //   const { loginName } = this.state;
  //   const minNum = 3;
  //   if (loginName.length >= minNum) {
  //     this.setState({
  //       buttonDisabled: false,
  //     });
  //   } else {
  //     this.setState({
  //       buttonDisabled: true,
  //     });
  //   }
  // };

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
          </>
        )}
      </div>
    );
  }
}

// Login.propTypes = {
//   loginName: PropTypes.string.isRequired,
//   // PropTypes.shape({history : PropTypes.object.isRequired,}),
//   eventOnChange: PropTypes.func.isRequired,
//   buttonDisabled: PropTypes.bool.isRequired,
//   loading: PropTypes.bool.isRequired,
// };

export default Login;
