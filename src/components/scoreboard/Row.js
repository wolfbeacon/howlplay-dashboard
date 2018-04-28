import React from 'react';

class Row extends React.Component {
  render() {
    return (<div className="score-row">
        <p class="score-rank">{this.props.position}</p>
        <p class="score-name">{this.props.username}</p>
        <p class="score-score">{this.props.score}</p>
      </div>
    );
  }
}

export default Row;
