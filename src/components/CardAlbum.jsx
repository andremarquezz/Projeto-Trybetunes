import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CardAlbum.module.css';

class CardAlbum extends Component {
  render() {
    const { data, nameSearch } = this.props;
    return (
      <>
        <h2>{`Resultado de álbuns de: ${nameSearch}`}</h2>
        <div className={styles.container}>
          {data.map(({ artistName, collectionName, artworkUrl100, collectionId }) => (
            <div key={collectionId} className={styles.card}>
              <img className={styles.img} src={artworkUrl100} alt='imageAlbum' />
              <h3>{collectionName}</h3>
              <span>{artistName}</span>
              <Link
                to={`/album/${collectionId}`}
                className={styles.link}
              >
                Mais informações
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  }
}

CardAlbum.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  nameSearch: PropTypes.string.isRequired,
};

export default CardAlbum;
