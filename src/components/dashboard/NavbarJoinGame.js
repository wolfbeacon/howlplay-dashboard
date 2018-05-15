import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setUrl} from "../../redux/actions/ScoreboardActions";
import store from '../../index'

const quizInfoUrl = 'http://localhost:8080/quizzes/codes/'
let codeField = "";

class NavbarJoinGame extends React.Component {
  handleChange(e) {
    codeField = e.target.value;
  }

  joinGame = () => {
    fetch(quizInfoUrl + codeField)
      .then(data => {
        return data.json();
      }).then(json => {
        if (json.url) {
          console.log(json);
          console.log("Joining game");
          this.props.setUrl(json);
          console.log(store.getState());
          window.location = '/#/displayscore';
        }
      }).catch(err => {
        console.log("Error when joining game");
      });
  }

  render() {
    return (
      <div id="code-prompt">
        <input id="code-input" onChange={(e) => this.handleChange(e)} placeholder="Enter a Game Code"></input>
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


export default connect(mapStateToProps, mapDispatchToProps) (NavbarJoinGame);
