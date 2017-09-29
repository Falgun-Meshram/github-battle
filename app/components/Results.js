import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import queryString from 'query-string';
import api from '../../utils/api';
const Link = require('react-router-dom').link;
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile(props) {
  const info = props.info;
  return(
    <PlayerPreview avatar={info.avatar_url} username={info.login}>

      <ul className='space-list-items'>
          {info.name && <li>{info.name}</li>}
          {info.location && <li>{info.location}</li>}
          {info.company && <li>{info.company}</li>}
          <li>Followers: {info.followers}</li>
          <li>Following: {info.following}</li>
          <li>Public Repos: {info.public_repos}</li>
          {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
        </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
};

function Player(props) {
  return(
    <div>
      <h1 className='ui header'>{props.label}</h1>
      <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,

}

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    }
  }
  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    api.battle([
      players.playerOneName,
      players.playerTwoName,
    ]).then( function (results) {
      console.log(results);
      if (results === null) {
        return this.state.setState(function() {
          return{
            error: 'Looks like there was an error. Please check that both the users exists in github',
            loading: false,
          };
        });
      }
      this.setState(() => {
        return {
          winner: results[0],
          loser: results[1],
          loading: false,
          error: null,
        };
      });
    }.bind(this));
  }
  render() {
    const error = this.state.error;
    const winner = this.state.winner;
    const loser = this.state.loser;
    const loading = this.state.loading;
    if (loading === true) {
      return <Loading text='Loading'/>;
    }
    if (error) {
      return(
        <div>
          <p>{error}</p>
          <Link to='/battle' >Reset</Link>
        </div>
      );
    }
    return(
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    );

  }
}

export default Results;
