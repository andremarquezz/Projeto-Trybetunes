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
      this.setState(
        () => ({
          loading: true,
        }),
        () => {
          this.removeFavorite(trackName);
        },
      );
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

  removeFavorite = async (trackName) => {
    const { songsFavorite } = this.state;
    const listFavorit = songsFavorite.filter((song) => song.trackName !== trackName);
    const songFavorit = songsFavorite.find((song) => song.trackName === trackName);
    await removeSong(songFavorit);
    this.setState({
      songsFavorite: [listFavorit],
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
                    onChange={ () => this.saveFavorite(trackName) }
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

MusicCard.propTypes = {
  songs: PropTypes.arrayOf(Object).isRequired,
};

export default MusicCard;
