import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import styles from './MusicCard.module.css';

class FavoriteMusic extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      songsFavorite: [{}],
    };
  }

  isFavorite = (trackName) => {
    const { songsFavorite } = this.state;
    const haveFavorite = songsFavorite.some((song) => song.trackName === trackName);
    if (haveFavorite) {
      this.setState(
        () => ({
          loading: true,
        }),
        () => this.isChecked(trackName),
      );
      const getFavorite = songsFavorite.some((song) => song.trackName === trackName);
      return getFavorite;
    }
  };

  isChecked = async (trackName) => {
    const { songsFavorite } = this.state;
    const newListFavorit = songsFavorite.filter((song) => song.trackName !== trackName);
    const songFavorit = songsFavorite.find((song) => song.trackName === trackName);
    await removeSong(songFavorit);
    this.setState({
      songsFavorite: [newListFavorit],
      loading: false,
    });
  };

  render() {
    const { loading } = this.state;
    const { songs } = this.props;
    return (
      <div className={ styles.container }>
        {songs.map(({ trackName, previewUrl, trackId }) => (
          <div key={ trackId } className={ styles.containerCard }>
            <p>{trackName}</p>
            {loading ? (
              <Loading />
            ) : (
              <>
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
                    onChange={ () => this.isChecked(trackName) }
                  />
                  Favorita
                </label>
              </>
            )}
          </div>
        ))}
      </div>
    );
  }
}

FavoriteMusic.propTypes = {
  songs: PropTypes.arrayOf(Object).isRequired,
};

export default MusicCard;
