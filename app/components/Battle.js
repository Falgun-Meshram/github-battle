import React, { Component } from 'react';
import PropTypes from 'prop-types';
const Link = require('react-router-dom').Link;
import PlayerPreview from './PlayerPreview';


class PlayerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(event) {
    const value = event.target.value;

    this.setState(() => {
      return {
        username: value,
      };
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username,
    );

  }
  render() {
    return(
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
          <button className='button'
            type='submit'
            disabled={!this.state.username}
            >
            Submit
          </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

PlayerInput.defaultProps = {
  label: 'username',
}

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

  }
  handleSubmit(id, username) {
    this.setState(() => {
      const newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
      return newState;
    });
  }
  handleReset(id){
    this.setState(() => {
      const newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    })
  }
  render() {
    let match = this.props.match;
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    let playerTwoImage = this.state.playerTwoImage;
    let playerOneImage = this.state.playerOneImage;
    return(
      <div >
        <div className='row'>
          {
            !playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />
          }
          {
            playerOneImage !== null &&
            <PlayerPreview avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
              id='playerOne'>

              <button className='ui button'
                onClick={this.handleReset.bind(null, 'playerOne')}
                >
                Reset
              </button>
            </PlayerPreview>
          }
          {
            !playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />
          }
          {
            playerTwoImage !== null &&
            <PlayerPreview avatar={playerTwoImage}
              username={playerTwoName}
              id='playerTwo'>
              <button className='ui button'
                onClick={this.handleReset.bind(null, 'playerTwo')}
                >
                Reset
              </button>
            </PlayerPreview>
          }
        </div>
        {playerOneImage && playerTwoImage &&
          <div className='ui center aligned container'>
            <Link className='ui black centered button'
              to={{
                pathname: match.url + '/results',
                search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName,
              }}
              >
              Battle
            </Link>
          </div>
        }
      </div>
    );
  }
}

export default Battle;
