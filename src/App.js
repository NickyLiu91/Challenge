import './App.css';
import React from 'react';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import List from './components/list.js';
import UserPage from './components/userPage.js';

class App extends React.Component {
  render() {
    return(
      <div>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/UserPage" component={UserPage} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
