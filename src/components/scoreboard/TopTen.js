import React from 'react';
import Row from './Row.js';

class TopTenBoard extends React.Component {
  render() {
    const data = [
      {username: "David", score: "999"},
      {username: "Andrew", score: "800"},
      {username: "Bob", score: "700"},
      {username: "Jane", score: "600"},
      {username: "Memelord", score: "550"},
      {username: "xdxdxdxd", score: "550"},
      {username: "ILikeExplosions", score: "400"},
      {username: "Hacker", score: "350"},
      {username: "LeetHax", score: "200"},
      {username: "Whoops", score: "100"}
    ];

    return (
      <div>
        <h1 className="toptenboard-title">Top 10 Users</h1>
        <div className="table">
          <div className="rows">
            {data.map((item, index) => {
              return <Row position={index+1} username={item.username} score={item.score}/>
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default TopTenBoard;
