import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default class BadgeTemp extends Component {
  ShowBadge = () => {
    let temp = this.props.temperaturestamp;
    if (temp < -5)
      return <div className="badge badge-primary">MEMBEKU</div>;
    if (temp < 0) return <div className="badge badge-primary">SANGAT DINGIN</div>;
    if (temp < 15) return <div className="badge badge-info">DINGIN</div>;
    if (temp < 25) return <div className="badge badge-warning">HANGAT</div>;
    if (temp < 35) return <div className="badge badge-danger">PANAS</div>;
    return <div className="badge badge-danger">MELELEH</div>;
  };

  render() {
    return (
      <div>
        <div>
          <div>{this.ShowBadge()}</div>
        </div>
      </div>
    );
  }
}
