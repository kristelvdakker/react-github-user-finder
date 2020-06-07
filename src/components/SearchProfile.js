import React, { Component } from "react";

class SearchProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        q: ""
      },
      isSubmitting: false,
      isError: false,
      result: [],
      resultCount: 0
    };
  }

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

  render() {
    return (
      <>
        <form onSubmit={this.submitForm}>
          <div className="input-group">
            <input
              type="text"
              name="q"
              id="user"
              value={this.state.values.q}
              onChange={this.handleInputChange}
              title="user"
              required
            />
          </div>
          <button type="submit">Search</button>
        </form>
        <div className={`message ${this.state.isError && "error"}`}>
          {this.state.isSubmitting ? "Submitting..." : this.state.message}
        </div>

        {this.state.resultCount > 0 ? (

        ) : null}
      </>
    );
  }
}

export default SearchProfile;
