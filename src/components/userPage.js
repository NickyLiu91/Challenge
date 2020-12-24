import React from 'react';
import User from './user.js';
import Follower from './follower.js';
import Repository from './repository.js';
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'

class UserPage extends React.Component {

  state = {
    repositories: [],
    originalFollowers: [],
    followers: [],
    search: ''
  }

  componentDidMount(){
    this.setUpUserInfo(this.props.user)
  }

  setUpUserInfo = (user) => {
    fetch(`${user.repos_url}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        repositories: json
      })
    })

    fetch(`${user.followers_url}`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        originalFollowers: json,
        followers: json
      })
    })
  }

  displayRepositories = () => {
    return this.state.repositories.map(
      repository => <Repository key={repository.id} repository={repository} />
    )
  }

  displayFollowers = () => {
    return this.state.followers.map(
      follower => <Follower key={follower.id} follower={follower} displayUser={this.displayUser} />
    )
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value
    }, () => {
      this.setState({
        followers: this.state.originalFollowers.filter(obj => obj.login.toLowerCase().includes(this.state.search.toLowerCase()))
      })
    })
  }

  displayUser = (user) => {
    this.props.changeUser(user)
    this.setUpUserInfo(user)
    this.props.history.push("UserPage")
    window.scrollTo(0,0)
  }

  render() {
    return(
      <div>
        <nav>
          <ul id="navBar">
            <li onClick={() => {this.props.history.push("/")}}>Home</li>
            <li><a href="#followers">Followers</a></li>
          </ul>
        </nav>
        <div id="topHalf">
          <div id="profile">
            <h1>{this.props.user.login}</h1>
            <img src={this.props.user.avatar_url} />
          </div>
          <div id="repositories">
            <h2 id="reposTitle">Repositories</h2>
            <ul>
            {this.displayRepositories()}
            </ul>
          </div>
        </div>
        <div id="followers">
          <h2>Followers</h2>
          <div id="searchBar">
          Search: <input id="search" type="text" value={this.state.search} onChange={(event)=>{this.handleSearch(event)}}/>
          </div>
          <ul id="followers-list">
            {this.displayFollowers()}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.userChanger.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUser: (event) => dispatch({type: 'CHANGE_USER', newUser: event})
  }
}


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(UserPage);
