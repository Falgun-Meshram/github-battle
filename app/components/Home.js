import React, { Component } from 'react';
import PropTypes from 'prop-types';
const Link = require('react-router-dom').Link;

class Home extends Component {
  render() {
    return(
      <div className='home-container'>
        <h1>GitHub Battle: Battle with your friends and stuff ...</h1>
        <Link className='ui black large button' to='/battle'>
          Battle
        </Link>
      </div>
    );
  }
}

export default Home;
