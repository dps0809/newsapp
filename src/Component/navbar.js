import React, { Component } from "react";
import { Link } from "react-router-dom";

export class navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  handleIput = (event) => {
    this.setState({ search: event.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.searchNews(this.state.search);
    this.props.navigate("/search");
    this.setState({ search: "" });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              NEWS APP
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Types of News
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/sports">
                        Sports
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/entertainment">
                        Entertainment
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/health">
                        Health
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/Science">
                        Science
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/business">
                        business
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/technology">
                        technology
                      </Link>
                    </li>
                  </ul>
                </li>
               
              </ul>
              <div className="d-flex align-items-center">
                <div className="form-check form-switch me-3">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="darkModeToggle"
                    checked={this.props.isDarkMode}
                    onChange={this.props.toggleDarkMode}
                  />
                  <label className="form-check-label" htmlFor="darkModeToggle">
                    {this.props.isDarkMode ? '🌙' : '☀️'}
                  </label>
                </div>
                <form className="d-flex" role="search" onSubmit={this.handleSubmit}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={this.state.search}
                    onChange={this.handleIput}
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default navbar;
