import React from 'react';
import User from './user.js';
import { connect } from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'

class List extends React.Component {

  state = {
    originalList: [],
    list: [],
    link: "",
    search: ''
  }

  componentDidMount(){
    let nextLink

    fetch("https://api.github.com/users?since=0")
    .then(res => {
      nextLink = res.headers.get('Link').split(";")[0].slice(1, -1)
        return res.json()
    })
    .then(json => {
      this.setState({
        originalList: json,
        list: json,
        link: nextLink
      })
    })

    // window.addEventListener('scroll', this.handleScroll)
  }

  fetchNext = () => {
    let nextLink

    fetch(`${this.state.link}`)
    .then(res => {
      nextLink = res.headers.get('Link').split(";")[0].slice(1, -1)
        return res.json()
    })
    .then(json => {
      this.setState({
        originalList: this.state.list.concat(json),
        list: this.state.list.concat(json),
        link: nextLink
      })
    })
  }

  displayUsers = () => {
    return this.state.list.map(
      user => <User key={user.id} user={user} displayUser={this.displayUser} />
    )
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value
    }, () => {
      this.setState({
        list: this.state.originalList.filter(obj => obj.login.toLowerCase().includes(this.state.search.toLowerCase()))
      })
    })
  }

  displayUser = (user) => {
    this.props.changeUser(user)
    this.props.history.push("UserPage")
    window.scrollTo(0,0)
  }

  handleScroll = (event) => {
    if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight) {
      this.fetchNext()
    }
  }

  render() {
    return(
      <div>
        <h1>Users</h1>
        <div id="searchBar">
          Search: <input id="search" type="text" value={this.state.search} onChange={(event)=>{this.handleSearch(event)}}/>
        </div>
        <div id="listContainer">
          <div id="listTitle">
            <ul id="listBar">
              <li>Name</li>
              <li>Picture</li>
            </ul>
          </div>
          <ul id="list" onScroll={(event) => {this.handleScroll(event)}}>
            {this.displayUsers()}
          </ul>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUser: (event) => dispatch({type: 'CHANGE_USER', newUser: event})
  }
}

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(List);
