import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.user();
  }

  user = async () => {
    this.setState({ loading: true });
    const data = await getUser();
    const { name } = data;
    this.setState({
      name,
      loading: false,
    });
  };

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : <h2 data-testid="header-user-name">{name}</h2>}
      </header>
    );
  }
}

export default Header;
