import React from "react";
import User from "./User";

const Users = ({list}) => {
  let cards = <h3>Loading...</h3>;

  if (list) {
    cards = list.map((m, i) => <User key={i} item={m} />);
  }

  return (
    <div className="row user-cards">{cards}</div>
  );
};

export default Users;
