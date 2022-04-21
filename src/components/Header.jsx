import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import styles from './Header.module.css';

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
          <>
            <div className={ styles.containerName }>
              <h2 data-testid="header-user-name">{name}</h2>
            </div>
            <nav className={ styles.navBar }>
              <Link to="/search" data-testid="link-to-search" className={ styles.links }>
                Search
              </Link>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className={ styles.links }
              >
                Favorites
              </Link>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className={ styles.links }
              >
                Profile
              </Link>
            </nav>
          </>
        )}
      </header>
    );
  }
}

export default Header;
