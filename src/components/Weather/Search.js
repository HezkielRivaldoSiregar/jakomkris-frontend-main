import React, { Component } from "react";
import "./search.scss";
export default class Weather extends Component {
  state = "";
  submit = event => {
    event.preventDefault();
    this.props.submit(this.state.keywords);
  };

  updateKeywords = event => {
    console.log(event.target.value);
    this.setState({
      keywords: event.target.value
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={event => this.submit(event)}>
          <div class="wrap">
            <div class="search">
              <input
                type="text"
                placeholder="Silahkan Mencari Kota..."
                className="searchTerm"
                autoFocus={true}
                onChange={event => this.updateKeywords(event)}
              />
              <button type="submit" class="searchButton">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>

        </form>
      </div>
    );
  }
}
