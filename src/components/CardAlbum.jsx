import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CardAlbum.module.css';

class CardAlbum extends Component {
  render() {
    const { data, nameSearch } = this.props;
    return (
      <>
        <p>{`Resultado de álbuns de: ${nameSearch}`}</p>
        <div className={ styles.container }>
          {data.map(({ artistName, collectionName, artworkUrl100, collectionId }) => (
            <div key={ collectionId } className={ styles.card }>
              <img src={ artworkUrl100 } alt="imageAlbum" />
              <h3>{collectionName}</h3>
              <span>{artistName}</span>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
                className={ styles.link }
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
