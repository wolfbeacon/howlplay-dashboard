import React, { Component } from 'react';

class Row extends React.Component {
  render() {
    return (<div classname="score-row">
        <p>{this.props.position}</p>
        <p>{this.props.username}</p>
        <p>{this.props.score}</p>
      </div>
    );
  }
}

export default Row;
