import React from "react";
import { Link } from "react-router-dom";

// user summary per user in user overview
export const User = props => {
  // avatar_url = Avatar source url
  // login = Github user name
  const { avatar_url, login } = props.item;

  // return single user card
  return (
    <div className="col-4 d-flex justify-content-center user-card">
      <Link className="user-container" to={`/user/${login}`}>
        <img
          className="user-avatar"
          src={avatar_url}
          alt={login}
          width="120"
          height="120" />
        <div className="user-name">{login}</div>
      </Link>
    </div>
  );
};
