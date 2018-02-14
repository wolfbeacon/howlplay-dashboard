import React from 'react';
import Row from './Row.js';

class TopTenBoard extends React.Component {
  render() {
    return (
      <div className="toptenboard">
        <h1>Top 10 Users</h1>
        <div className="rows">
          <Row position="1" username="David" score="999"/>
          <Row position="2" username="Andrew" score="800"/>
          <Row position="3" username="Bob" score="700"/>
          <Row position="4" username="Jane" score="600"/>
          <Row position="5" username="Memelord" score="550"/>
          <Row position="6" username="xdxdxdxd" score="550"/>
          <Row position="7" username="ILikeExplosions" score="400"/>
          <Row position="8" username="Hacker" score="350"/>
          <Row position="9" username="LeetHax" score="200"/>
          <Row position="10" username="Whoops" score="100"/>
        </div>
      </div>
    );
  }
}

export default TopTenBoard;
