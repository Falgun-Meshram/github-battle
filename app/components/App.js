const React = require('react');
const ReactDOM = require('react-dom');
const Popular = require('./Popular');
const ReactRouter = require('react-router-dom');
// const Nav = require('../../utils/Nav.js');
import Nav from '../../utils/Nav.js';
import Home from './Home.js';
import Battle from './Battle';
import Results from './Results.js';
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;
class App extends React.Component {
  render() {
    return(
      <Router>
        <div className='container'>
        <Nav />
        <Switch><Route path='/popular' component={Popular} />
          <Route exact path='/' component={Home} />
          <Route exact path='/battle' component={Battle} />
          <Route path='/battle/results' component={Results} />
          <Route render={ function() {
            return <p>Not Found</p>;
          }} />
        </Switch>
        </div>
      </Router>
    );
  }
}

module.exports = App;
