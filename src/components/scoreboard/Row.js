import React from 'react';

class Row extends React.Component {
  render() {
    return (<div className="score-row">
        <p className="score-rank">{this.props.position}</p>
        <p className="score-name">{this.props.username}</p>
        <p className="score-score">{this.props.score}</p>
      </div>
    );
  }
}

export default Row;
