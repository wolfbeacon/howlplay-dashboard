import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import DashboardContentHeader from "./DashboardContentHeader";
import {DEFAULT_API_URL} from "../../configurations"

class DashboardContent extends React.Component {
  constructor() {
    super();
    this.state = {
      quizzes : []
    }
  }

  componentWillMount() {
    console.log('Geting quizzes')
    fetch(
      DEFAULT_API_URL + '/dashboard/quizzes',
      {
        credentials : 'include',
        mode : 'cors'
      }
    )
    .then(resp => {
      return resp.json();
    }).then(data => {
      this.setState({
        quizzes : data
      })
    });
  }

  render() {
    console.log(this.state.quizzes)
    let quizzes = this.state.quizzes.map((quiz) => {
      return <DashboardContentHeader />
    })
    console.log(quizzes)
    return <div id={"dashboard-content"}>
        {quizzes}
    </div>;
  }
}

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
