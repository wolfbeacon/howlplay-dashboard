import React from 'react';
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardContent from "../components/dashboard/DashboardContent";
import DashboardModal from "../components/dashboard/DashboardModal";
import {bindActionCreators} from "redux";
import {getQuizzes} from "../redux/actions/QuizActions";
import {connect} from "react-redux";

class Dashboard extends React.Component {
    componentWillMount() {
        this.props.getQuizzes(this.props.quizToken);
    }

    render() {
        return (
            <div id={"dashboard"}>
                <DashboardHeader/>
                <div id="dashboard-body">
                    <DashboardNavbar/>
                    <DashboardContent/>
                </div>
                <DashboardModal/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    getQuizzes
}, dispatch);

function mapStateToProps(state, ownProps) {
    return {
        quizToken: state.dashboard.quizToken
    };
}


export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
