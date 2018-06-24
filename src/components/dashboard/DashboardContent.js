import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import DashboardContentHeader from "./DashboardContentHeader";
import {DEFAULT_API_URL} from "../../configurations"
import util from "../../lib/util"

class DashboardContent extends React.Component {
  constructor() {
    super();
    this.state = {
      quizzes : []
    }
  }

  componentWillMount() {
    console.log('Geting quizzes')
    fetch(DEFAULT_API_URL + '/organizers/' + '1' +'/quizzes/')
    .then(resp => {
      return resp.json();
    }).then(data => {
      console.log(data);
      this.setState({
        quizzes : data
      })
    });
  }

  render() {
    console.log(this.state.quizzes)
    let quizzes = this.state.quizzes.map((quiz) => {
      return <li>{quiz.id}</li>
    })
    console.log(quizzes)
    return <div id={"dashboard-content"}>
        <DashboardContentHeader/>
        <ul>{quizzes}</ul>
    </div>;
  }
}

// const DashboardContent = () => {
//     // fetch(DEFAULT_API_URL + '/organizers/' + util.getCurrentUserId() +'/quizzes/')
//     // .then(json => {
//     //   return json;
//     // }).then(data => {
//     //   console.log(data);
//     // });
//     return <div id={"dashboard-content"}>
//         <DashboardContentHeader/>
//     </div>;
//   }

const mapStateToProps = (state) => {
    let activeQuiz = state.quiz.activeQuiz;
    return ({
        quizName: (activeQuiz) ? activeQuiz.name : "",
        groupName: "UserName",
    })
};

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (DashboardContent);
