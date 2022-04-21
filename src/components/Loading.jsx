import React, { Component } from 'react';
import './Loading.css';

class Loading extends Component {
  render() {
    return (
      <>
        <p className="loading" />
        <h1>Carregando...</h1>
      </>
    );
  }
}

export default Loading;
