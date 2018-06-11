import React from 'react';
import Row from './Row.js';

class TopTenBoard extends React.Component {
  render() {
    return (
      <div>
        <h1 className="toptenboard-title">Top 10 Users</h1>
        <div className="table">
          <div className="rows">
          {
            this.props.users.length !== 0 ?
            this.props.users.map((item, index) => {
              return <Row key={index} position={index+1} username={item.nickname} score={item.score}/>
            }) :
            <h2 className="toptenboard-lonely">Howplay is lonely...   :,(</h2>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default TopTenBoard;
