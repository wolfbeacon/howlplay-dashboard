import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import DashboardContentHeader from "./DashboardContentHeader";

class DashboardContent extends React.Component {
  render() {
    console.log(this.props.activeQuiz);
    const { activeQuiz } = this.props;
    return <div id={"dashboard-content"}>
      <DashboardContentHeader />
      {
        activeQuiz ? <div className="dashboard-content__quiz">
          <h2 className="dashboard-content__title">Questions</h2>
          { activeQuiz.questions.map((question, key) => {
            const { answer, title, choices } = question;
            return <div className="dashboard-content__item--question" key={key}>
              <h3 className="dashboard-content__title--question">Question {key + 1}: { title }</h3>
              <div className="dashboard-content__choices">
              {
                choices.map((choice, key) => {
                  const isIMG = choice.startsWith("**Image** ");
                  return <div className={
                    "dashboard-content__item--choice" + (isIMG ? "--image" : "") + (key.toString() === answer ? " dashboard-content__item--answer" : "")
                  } style={ isIMG? {backgroundImage: "url(" + choice.slice(10) + ")"} : null }>
                    { isIMG ? null: choice }
                  </div>
                })
              }
              </div>
            </div>
          })
        }
        </div> : null
      }
    </div>;
  }
}

const mapStateToProps = (state) => ({
  activeQuiz: state.quiz.activeQuiz
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (DashboardContent);
