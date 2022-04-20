import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      songsFavorite: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const FavoriteSongs = await getFavoriteSongs();
    this.setState(
      {
        songsFavorite: FavoriteSongs,
      },
      () => {
        this.setState({
          loading: false,
        });
      },
    );
  };

  removeFavorite = (trackId) => {
    const { songsFavorite } = this.state;
    const teste2 = songsFavorite.filter((song) => song !== trackId);
    this.setState({
      songsFavorite: teste2,
    });
  };

  saveFavorite = async (trackId, { target }) => {
    const { songsFavorite } = this.state;
    const teste = songsFavorite.some((songId) => songId === trackId);
    if (teste) {
      this.removeFavorite(trackId);
    } else {
      this.setState(
        ({ songsFavorite }) => ({
          loading: true,
          songsFavorite: [...songsFavorite, trackId],
        }),
        async () => {
          // //('checked save', target.checked);
          const { songs } = this.props;
          const musicFavorite = songs.find((track) => track.trackName === trackId);
          console.log('musicFavorite', musicFavorite);
          await addSong(musicFavorite);
          console.log(this.state.songsFavorite);
          this.setState({
            loading: false,
          });
        },
      );
    }
  };

  teste3 = (trackName) => {
    const { songsFavorite } = this.state;
    const teste4 = songsFavorite.some((songId) => songId.trackName === trackName);
    // //('checked', teste4);
    // ('trackName', trackName);
    return teste4;
  };

  render() {
    const { loading, songsFavorite } = this.state;
    const { songs } = this.props;
    // ('songsFavorite', songsFavorite);
    return (
      <d>
        {loading ? (
          <Loading />
        ) : (
          songs.map(({ trackName, previewUrl, trackId }) => (
            <div key={ trackId }>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
              </audio>
              <label htmlFor="checkbox">
                <input
                  type="checkbox"
                  checked={ this.teste3(trackName) }
                  name="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ (event) => this.saveFavorite(trackName, event) }
                />
                Favorita
              </label>
            </div>
          ))
        )}
      </d>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.arrayOf(Object).isRequired,
};

export default MusicCard;
