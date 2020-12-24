import React from 'react';

const Repository = (props) => {
  {console.log(props.repository)}

  if (props.repository.homepage == null || props.repository.homepage.length == 0 ) {
    return(
      <div className="repo">
        <h3>Name: {props.repository.name}</h3>
        <p> - Github Repository: <a href={`${props.repository.html_url}`}>{props.repository.html_url}</a></p>
      </div>
    )
  } else {
    return(
      <div className="repo">
        <h3>Name: {props.repository.name}</h3>
        <p> - Link: <a href={`${props.repository.homepage}`}>{props.repository.homepage}</a></p>
        <p> - Github Repository: <a href={`${props.repository.html_url}`}>{props.repository.html_url}</a></p>
      </div>
    )
  }
}

export default Repository
