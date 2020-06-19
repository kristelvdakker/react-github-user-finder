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

  // if the result count is larger than 0, show users
  get renderUsers() {
    let users = "";

    if (this.state.loading === true) {
      // Results are getting fetched as long as loading is set to true
      users = <h3>Loading...</h3>;
    } else if (this.state.resultCount > 0 && this.state.result) {
      // Show users if there is a result count larger than 0
      // and there are actual results
      users = <Users items={this.state.result} />;
    } else {
      // No users found
      users = <h3 className="cms-subtitle">No users found</h3>;
    }

    return users;
  };

  //@TODO add load more button
  // render search component
  render() {
    return (
      <>
        <h2 className="cms-subtitle">Search for Github User</h2>
        <form className="form-search" onSubmit={this.submitForm}>
          <input
            className="col-sm-2 form-control"
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
        <div className="user-result">
          <span className="user-count-label">Count:</span>
          <span className="user-result-count">{this.state.resultCount}</span>
        </div>
        {this.renderUsers}
      </>
    );
  };
};

export default UserOverview;
