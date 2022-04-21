import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import styles from './MusicCard.module.css';

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

  isFavorite = (trackName) => {
    const { songsFavorite } = this.state;
    const getFavorite = songsFavorite.some((song) => song.trackName === trackName);
    return getFavorite;
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
          const musicFavorite = songs.find((song) => song.trackName === trackName);
          await addSong(musicFavorite);
          this.setState({
            loading: false,
          });
        },
      );
    }
  };

  removeFavorite = (trackName) => {
    const { songsFavorite } = this.state;
    const listFavorit = songsFavorite.filter((song) => song.trackName !== trackName);
    const songFavorit = songsFavorite.find((song) => song.trackName === trackName);
    this.setState({
      songsFavorite: [listFavorit],
    });
    removeSong(songFavorit);
  };

  render() {
    const { loading } = this.state;
    const { songs } = this.props;
    return (
      <div className={ styles.container }>
        {loading ? (
          <Loading />
        ) : (
          songs.map(({ trackName, previewUrl, trackId }) => (
            <div key={ trackId } className={ styles.containerCard }>
              <p>{trackName}</p>
              <audio
                data-testid="audio-component"
                src={ previewUrl }
                className={ styles.audio }
                controls
              >
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.arrayOf(Object).isRequired,
};

export default MusicCard;
