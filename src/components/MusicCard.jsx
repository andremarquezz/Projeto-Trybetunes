import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      songsFavorite: [],
    };
  }

  removeFavorite = (trackId, target) => {
    const { songsFavorite } = this.state;
    if (target.checked) {
      songsFavorite.filter((song) => song !== trackId);
    }
  };

  saveFavorite = async (trackId, { target }) => {
    this.setState(
      ({ songsFavorite }) => ({
        loading: true,
        songsFavorite: [...songsFavorite, trackId],
      }),
      async () => {
        const { songs } = this.props;
        const musicFavorite = songs.find((track) => track.trackId === trackId);
        await addSong(musicFavorite);
        this.setState({
          loading: false,
        });
        this.removeFavorite(trackId, target);
      },
    );
  };

  render() {
    const { loading, songsFavorite } = this.state;
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
                  checked={ songsFavorite.some((songId) => songId === trackId) }
                  name="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ (event) => this.saveFavorite(trackId, event) }
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
