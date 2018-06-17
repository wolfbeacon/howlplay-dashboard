import React from "react";
import {bindActionCreators} from "redux";
import { DEFAULT_API_URL } from '../../configurations';
import {connect} from "react-redux";
import {setUrl} from "../../redux/actions/ScoreboardActions";
import {withRouter} from 'react-router-dom';

const quizInfoUrl = DEFAULT_API_URL + '/quizzes/codes/';
let codeField = "";

class NavbarJoinGame extends React.Component {
  handleChange(e) {
    codeField = e.target.value;
  }

  joinGame = (e) => {
    e.preventDefault();
    fetch(quizInfoUrl + codeField)
      .then(data => {
        return data.json();
      }).then(json => {
        if (json.url) {
          console.log(json);
          this.props.setUrl(json);
          this.props.history.push('/displayscore');
        }
      }).catch(err => {
        console.log("Error when joining game");
      });
  };

  render() {
    return (
      <div id="code-prompt">
        <input id="code-input" onChange={(e) => this.handleChange(e)} placeholder="Enter a Game Code"/>
        <button id="code-btn" onClick={this.joinGame}>Open Game</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    url: state.scoreboard.url,
    id: state.scoreboard.id,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setUrl
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(NavbarJoinGame));
