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
  render() {
    return (
      <Switch>
        <Route path="/search" component={ Search } />
        <Route
          path="/album/:id"
          render={ (propsRouter) => <Album { ...propsRouter } /> }
        />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/profile" component={ Profile } />
        <Route exact path="/" render={ (propsRouter) => <Login { ...propsRouter } /> } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
