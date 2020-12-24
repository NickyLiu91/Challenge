import React from 'react';

const Follower = (props) => {

  return(
    <div className="follower" onClick={(event) => {props.displayUser(props.follower)}}>
      <p>{props.follower.login}</p>
      <img className="followerImg" src={props.follower.avatar_url} />
    </div>
  )
}

export default Follower
