import React from "react";
import UserOverview from "./components/UserOverview";

export default function Home() {
  return (
    <div className="container">
      <h2>Search for Github User</h2>
      <UserOverview />
    </div>
  );
};
