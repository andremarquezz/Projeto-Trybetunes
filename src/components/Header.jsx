import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  componentDidMount() {
    this.user();
  }

  user = async () => {
    const data = await getUser();
    const { name } = data;
  };

  render() {
    return (
      <header data-testid="header-component">
        <h2>user</h2>
      </header>
    );
  }
}

export default Header;
