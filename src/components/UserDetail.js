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
      loading: false,
      login: ""
    };
  }

  getGithubUser(login) {
    this.setState({ loading: true });

    // Get API results and update state
    fetch(`${API}/users/${login}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
      if (response.status === 200) {
        // return the response when found
        return response.json();
      } else {
        // response returned something other then 200
        console.log("Github user not found");
      }
    })
    .then(data => this.setState({ user: data, login: login, loading: false }));
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
    // Match current and new values
    if (this.props.match.params.login !== prevProps.match.params.login) {
      // if not the same, update with new values
      this.getGithubUser(this.props.match.params.login);
    }
  }

  // render user detail
  //@TODO: make login to be able to show contact details
  render () {
    if (this.state.loading === true) {
      // Still loading and fetching from the API
      return (
        <div className="user-detail">
          <h3>Loading...</h3>
        </div>
      );
    } else if (this.state.user) {
      // Found user to display
      return (
        <div className="user-detail">
          <div className="user-detail-summary">
            {this.state.user.avatar_url &&
              <img className="user-avatar" src={this.state.user.avatar_url} alt={this.state.user.login} width="120" height="120" />}
            <small className="user-login">{this.state.user.login}</small>
            <h2 className="cms-subtitle">{this.state.user.name}</h2>
            <p className="user-company">Company: {this.state.user.company}</p>
            <p className="user-bio">{this.state.user.bio}</p>
            <a className="user-detail-blog" href={this.state.user.blog} title={`Go to ${this.state.user.login}'s site`}>{this.state.user.blog}</a>
            <p className="user-followers">Followers: {this.state.user.followers}</p>
            <p className="user-following">Following: {this.state.user.following}</p>
          </div>
          <div className="user-detail-options">
            <a className="btn btn-primary" href={this.state.user.html_url} role="button">Go to GitHub profile</a>
            <button className="btn btn-light" onClick={this.goBack}>Go Back</button>
          </div>
        </div>
      );
    } else {
      // User not found
      return (
        <div className="user-detail">
          <h2 className="cms-subtitle">This user does not exist.</h2>
          <div className="user-detail-options">
            <button className="btn btn-light" onClick={this.goBack}>Go Back</button>
          </div>
        </div>
      );
    }
  }
};

export default User;
