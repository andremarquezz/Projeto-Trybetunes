import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameSearch: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    const { nameSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
