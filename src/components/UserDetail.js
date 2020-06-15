import React, { Component } from "react";
const API = "https://api.github.com";

// User detail page
class User extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.getGithubUser = this.getGithubUser.bind(this);

    // create empty state
    this.state = {
      user: [],
      login: ""
    };
  }

  getGithubUser(login) {
    // Get API results
    fetch(`${API}/users/${login}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    // .then(response => response.json())
    .then(function(response) {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log("Github user not found");
      }
    })
    .then(data => this.setState({ user: data, login: login }));
  }

  // Make go back in history button
  goBack() {
    this.props.history.goBack();
  }

  // set user value for the first time
  componentDidMount() {
    this.getGithubUser(this.props.match.params.login);
  }

  // update the user value
  componentDidUpdate(prevProps) {
    if (this.props.match.params.login !== prevProps.match.params.login) {
      this.getGithubUser(this.props.match.params.login);
    }
  }

  // render component
  //@TODO: make login to be able to show contact details
  render () {
    if (this.state.user) {
      return (
        <div className="user-detail">
          <img className="user-avatar" src={this.state.user.avatar_url} alt={this.state.user.login} width="120" height="120" />
          <h2>{this.state.user.name}</h2>
          <small>{this.state.user.login}</small>
          <p>{this.state.user.bio}</p>
          <a className="btn btn-primary" href={this.state.user.html_url} role="button">Go to profile</a>
          <button className="btn btn-light" onClick={this.goBack}>Go Back</button>
        </div>
      );
    } else {
      return (
        <>
          <h2>This user does not exist.</h2>
          <button className="btn btn-light" onClick={this.goBack}>Go Back</button>
        </>
      );
    }
  }
};

export default User;
