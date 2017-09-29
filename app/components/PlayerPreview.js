import React, { Component } from 'react';
import PropTypes from 'prop-types';

function PlayerPreview(props) {
  return(
    <div >
      <div className='column'>
        <img className='ui circular small image'
          src={props.avatar}
          alt={'Avatar for' + props.username}
        />
        <h2 className='ui header'>{'@' + props.username}</h2>
        {props.children}
      </div>
    </div>
  );
}
PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default PlayerPreview;
