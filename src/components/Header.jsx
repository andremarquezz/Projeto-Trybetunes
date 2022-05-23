import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
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
    const data = await getUser();
    const { name } = data;
    this.setState({
      name,
      loading: true,
    });
  };

  render() {
    const { name, loading } = this.state;
    return (
      <header>
        {loading && (
          <>
            <div className={ styles.containerName }>
              <h2>{name}</h2>
            </div>
            <nav className={ styles.navBar }>
              <Link to="/search" className={ styles.links }>
                Search
              </Link>
              <Link
                to="/favorites"
                className={ styles.links }
              >
                Favorites
              </Link>
              <Link
                to="/profile"
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
