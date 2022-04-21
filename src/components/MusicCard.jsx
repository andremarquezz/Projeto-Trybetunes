import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
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

  removeFavorite = (trackName) => {
    const { songsFavorite } = this.state;
    const filterSongFavorite = songsFavorite.find((song) => song.trackName === trackName);
    this.setState((prevState) => ({
      songsFavorite: [...prevState.songsFavorite, filterSongFavorite],
    }));
    removeSong(filterSongFavorite);
  };

  saveFavorite = async (trackName) => {
    const { songsFavorite } = this.state;
    const { songs } = this.props;
    const findSongFavorite = songs.find((song) => song.trackName === trackName);
    const haveFavorite = songsFavorite.some((song) => song.trackName === trackName);
    if (haveFavorite) {
      this.removeFavorite(trackName);
    } else {
      this.setState(
        (prevState) => ({
          loading: true,
          songsFavorite: [...prevState.songsFavorite, findSongFavorite],
        }),
        async () => {
          const musicFavorite = songs.find((track) => track.trackName === trackName);
          await addSong(musicFavorite);
          this.setState({
            loading: false,
          });
        },
      );
    }
  };

  // verifico se é favorito, vindo do button pra ficar checked
  isFavorite = (trackName) => {
    const { songsFavorite } = this.state;
    const getFavorite = songsFavorite.some((song) => song.trackName === trackName);
    return getFavorite;
  };

  render() {
    const { loading } = this.state;
    const { songs } = this.props;
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
                  checked={ this.isFavorite(trackName) }
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
