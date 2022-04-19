import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

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
        {loading ? (
          <Loading />
        ) : (
          <h2 data-testid="header-user-name" className="nameUser">
            {name}
          </h2>
        )}
        <nav className="nav-bar">
          <Link to="/search" data-testid="link-to-search">
            Search
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favorites
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
