import React from 'react';

const User = (props) => {
  return(
    <div className="user" onClick={(event) => {props.displayUser(props.user)}}>
      <p>{props.user.login}</p>
      <div>
        <img className="userImg" src={props.user.avatar_url} />
      </div>
    </div>
  )
}

export default User
