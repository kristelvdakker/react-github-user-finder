import React from "react";
import { Link } from "react-router-dom";

// user summary in user overview
export const User = props => {
  const { avatar_url, login } = props.item;

  return (
    <div className="col-4 d-flex justify-content-center user-card">
      <div className="user-container">
        <Link to={`/user/${login}`}>
          <img
            className="user-avatar"
            src={avatar_url}
            alt={login}
            width="120"
            height="120" />
          <div>{login}</div>
        </Link>
      </div>
    </div>
  );
};
