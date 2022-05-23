import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import styles from './Album.module.css';

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
    this.setState({
      infoTracks: data[0],
      tracks: dataSongs,
    });
  };

  render() {
    const { infoTracks, tracks } = this.state;
    const { artistName, collectionName, artworkUrl100 } = infoTracks;
    return (
      <div lassName={styles.pageAlbum}>
        <Header />
        <section className={styles.infoAlbum}>
          {' '}
          <h2>{artistName}</h2>
          <h2>{collectionName}</h2>
          <img src={artworkUrl100} alt='Capa do Album' />
        </section>

        <MusicCard songs={tracks} />
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
