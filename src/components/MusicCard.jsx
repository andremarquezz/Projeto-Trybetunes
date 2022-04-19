import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { songs } = this.props;
    return (
      <>
        {songs.map(({ trackName, previewUrl }) => (
          <>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
          </>
        ))}
      </>
    );
  }
}

export default MusicCard;
