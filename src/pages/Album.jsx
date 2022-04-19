import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      infoTracks: [],
    };
  }

  componentDidMount() {
    this.getApiMusics();
  }

  getApiMusics = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const data = await getMusics(id);
    const dataSongs = data.filter(({ kind }) => kind === 'song');
    console.log(dataSongs);
    this.setState({
      infoTracks: data[0],
      tracks: dataSongs,
    });
  };

  render() {
    const { infoTracks, tracks } = this.state;
    const { artistName, collectionName } = infoTracks;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{artistName}</h2>
        <h2 data-testid="album-name">{collectionName}</h2>
        <MusicCard songs={ tracks } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
