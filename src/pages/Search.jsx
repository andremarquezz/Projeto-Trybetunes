import React, { Component } from 'react';
import CardAlbum from '../components/CardAlbum';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import styles from './Search.module.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameSearch: '',
      valueSearch: '',
      loading: false,
      foundAlbum: false,
      data: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  searchAlbums = async (nameSearch) => {
    this.setState(
      {
        loading: true,
        valueSearch: nameSearch,
      },
      async () => {
        const data = await searchAlbumsAPI(nameSearch);
        this.setState({
          nameSearch: '',
          loading: false,
          data,
          foundAlbum: data.length !== 0,
        });
      },
    );
  };

  render() {
    const { nameSearch, loading, foundAlbum, data, valueSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <form className={ styles.container }>
            <input
              name="nameSearch"
              type="text"
              placeholder="Nome do Artista ou Banda"
              data-testid="search-artist-input"
              value={ nameSearch }
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ nameSearch.length < 2 }
              onClick={ () => this.searchAlbums(nameSearch) }
            >
              Pesquisar
            </button>
            {foundAlbum ? (
              <CardAlbum data={ data } nameSearch={ valueSearch } />
            ) : (
              <p>Nenhum álbum foi encontrado</p>
            )}
          </form>
        )}
      </div>
    );
  }
}

export default Search;
