import React from 'react';

class Row extends React.Component {
  render() {
    return (<div className="score-row">
        <p>{this.props.position}</p>
        <p>{this.props.username}</p>
        <p>{this.props.score}</p>
      </div>
    );
  }
}

export default Row;
