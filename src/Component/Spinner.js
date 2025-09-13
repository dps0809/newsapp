import React, { Component } from "react";
// import loading from "./global-223.gif";
import EmptyNewscard from "./EmptyNewscard";

export class Spinner extends Component {
  render() {
    return (
      <div>
        {/* <div className="text-center">
          <img className="my-3" src={loading} alt="loading" />
        </div> */}
        <div className="row">
          {[...Array(this.props.pageSize)].map((_, index) => (
            <div className="col-md-3" key={index}>
              <EmptyNewscard />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Spinner;
