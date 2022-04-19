import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CardAlbum extends Component {
  render() {
    const { data, nameSearch } = this.props;
    return (
      <>
        <h1>
          { `Resultado de álbuns de: ${nameSearch}` }
        </h1>
        {data.map(({ artistName, collectionName, artworkUrl100, collectionId }) => (
          <div key={ collectionId }>
            <img src={ artworkUrl100 } alt="imageAlbum" />
            <h3>{collectionName}</h3>
            <p>{artistName}</p>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              Mais informações
            </Link>
          </div>
        ))}
      </>
    );
  }
}

export default CardAlbum;
