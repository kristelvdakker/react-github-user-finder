import React, { Component } from "react";

const API = 'https://api.github.com';

const UserCard = props => {
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

const Users = ({list}) => {
  let cards = <h3>Loading...</h3>;

  if (list) {
    cards = list.map((item, i) => <UserCard key={i} item={item} />);
  }

  return (
    <div className="row user-cards">{cards}</div>
  );
};

class UserOverview extends Component {
  // create empty state
  state = {
    values: {
      q: ""
    },
    isSubmitting: false,
    isError: false,
    result: [],
    resultCount: 0,
    popularUsers: []
  };

  submitForm = async e => {
    e.preventDefault();
    // User is submitting
    this.setState({ isSubmitting: true });

    // Get API results
    const result = await fetch(`${API}/search/users?q=${this.state.values.q}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Submitting is done
    this.setState({ isSubmitting: false });
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
  };
};

export default UserOverview;
