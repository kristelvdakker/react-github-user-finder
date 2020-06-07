import React, { Component } from "react";
import Users from "./Users";

class UserOverview extends Component {
  state = {
    values: {
      q: ""
    },
    isSubmitting: false,
    isError: false,
    result: [],
    resultCount: 0
  };

  submitForm = async e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });

    const result = await fetch(`https://api.github.com/search/users?q=${this.state.values.q}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    this.setState({ isSubmitting: false });
    const data = await result.json();

    this.setState({
      result: data.items,
      resultCount: data.total_count
    });

    console.log("state", this.state);
  };

  handleInputChange = e => {
    this.setState({
      values: { ...this.state.values, [e.target.name]: e.target.value }
    });
  };

  get renderUsers() {
    let users = <h1>There are no users</h1>;
    if (this.state.resultCount > 0) {
      users = <Users list={this.state.result} />;
    }

    return users;
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input
          type="text"
          name="q"
          id="user"
          value={this.state.values.q}
          onChange={this.handleInputChange}
          placeholder="Type to search"
          title="user"
        />
        <button type="submit">Search</button>
        {this.renderUsers}
      </form>
    );
  }
}

export default UserOverview;
