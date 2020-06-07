import React from "react";

const UserCard = props => {
  console.log("props", props);
  const { avatar_url, login, html_url } = props.item;

  return (
    <div className="col-4 d-flex justify-content-center user-card">
      <a className="user-container" href={html_url}>
        <img src={avatar_url} alt={login} width="120" height="120" />
        <div>{login}</div>
      </a>
    </div>
  );
};

export default UserCard;
