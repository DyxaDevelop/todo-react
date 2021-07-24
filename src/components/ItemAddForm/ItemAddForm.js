import React, { Component } from "react";

import "./ItemAddForm.css";

export default class ItemAddForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdded(this.state.label);
    this.setState({
      label: "",
    });
  };
  render() {
    return (
      <form className="ItemAddForm" onSubmit={this.onSubmit}>
        <input
          className="form-control"
          onChange={this.onLabelChange}
          type="text"
          placeholder="What needs to be done?"
          value={this.state.label}
        />
        <button className="btn btn-outline-secondary">Add item</button>
      </form>
    );
  }
}
