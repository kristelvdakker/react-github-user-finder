import React from "react";
import { User } from "./User";

export const Users = ({items}) => {
  // loop through items and render them into single users
  const cards = items.map((item, i) => <User key={i} item={item} />);

  // return user cards within a container
  return <div className="row user-cards">{cards}</div>;
};
