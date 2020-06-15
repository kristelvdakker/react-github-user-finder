import React, { Component } from "react";
import { Users } from "./Users";
const API = 'https://api.github.com';

// User overview page
class UserOverview extends Component {
  // create empty state
  state = {
    values: {
      q: ""
    },
    loading: false,
    isError: false,
    result: [],
    resultCount: 0
  };

  submitForm = async e => {
    e.preventDefault();
    // User is submitting
    this.setState({ loading: true });

    // Get API results
    const result = await fetch(`${API}/search/users?q=${this.state.values.q}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Submitting is done
    this.setState({ loading: false });
    const data = await result.json();

    // Update state with results and result count
    this.setState({
      result: data.items,
      resultCount: data.total_count
    });

    // check my result ;)
    // console.log("state", this.state);
  };

  handleInputChange = e => {
    // Update state with search based on name and value
    this.setState({
      values: { ...this.state.values, [e.target.name]: e.target.value }
    });
  };

  get renderUsers() {
    let users = <h3>No users found</h3>;
    if (this.state.resultCount > 0) {
      users = <Users list={this.state.result} />;
    }

    return users;
  };

  // render search component
  render() {
    return (
      <>
        <h2>Search for Github User</h2>
        <form onSubmit={this.submitForm}>
          <input
            class="col-sm-2 form-control"
            type="text"
            name="q"
            id="user"
            value={this.state.values.q}
            onChange={this.handleInputChange}
            placeholder="Type to search"
            title="user"
          />
          <button className="btn btn-primary" type="submit">Search</button>
        </form>
        {this.renderUsers}
      </>
    );
  };
};

export default UserOverview;
