import React from "react";
import { User } from "./User";

export const Users = ({list}) => {
  let cards = <h3>Loading...</h3>;

  if (list) {
    cards = list.map((item, i) => <User key={i} item={item} />);
  }

  return (
    <div className="row user-cards">{cards}</div>
  );
};
