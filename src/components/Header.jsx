import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    this.user();
  }

  user = async () => {
    const data = await getUser();
    const { name } = data;
    this.setState({
      name,
    });
  };

  render() {
    const { name } = this.state;
    return (
      <header data-testid="header-component">
        <h2>{name}</h2>
      </header>
    );
  }
}

export default Header;
