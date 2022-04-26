import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      songsFavorite: [{}],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const apiFavoriteSongs = await getFavoriteSongs();
    this.setState(
      {
        songsFavorite: apiFavoriteSongs,
      },
      () => {
        this.setState({
          loading: false,
        });
      },
    );
  };

  render() {
    const { loading, songsFavorite } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : <MusicCard songs={ songsFavorite } />}
      </div>
    );
  }
}

export default Favorites;
