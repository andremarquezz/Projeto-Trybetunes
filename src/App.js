import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      buttonDisabled: true,
      loading: false,
    };
  }

  validateButton = () => {
    const { loginName } = this.state;
    const minNum = 3;
    if (loginName.length >= minNum) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      () => ({
        [name]: value,
      }),
      () => this.validateButton(),
    );
  };

  render() {
    return (
      <Switch>
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/profile" component={ Profile } />
        <Route
          exact
          path="/"
          render={ (propsRouter) => (
            <Login
              { ...this.state }
              { ...propsRouter }
              eventOnChange={ this.onInputChange }
            />
          ) }
        />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
