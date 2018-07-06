import React from 'react';
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardContent from "../components/dashboard/DashboardContent";
import DashboardModal from "../components/dashboard/DashboardModal";
import {bindActionCreators} from "redux";
import {getQuizzes} from "../redux/actions/QuizActions";
import * as Cookies from 'js-cookie';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import {push} from "react-router-redux";

class Dashboard extends React.Component {
    componentDidMount() {
        if (Cookies.get('token')) {
            this.props.getQuizzes(this.props.quizToken);
        } else {
            this.props.push('/');
        }
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getQuizzes,
    push
}, dispatch);

function mapStateToProps(state) {
    return {
        quizToken: state.dashboard.quizToken
    };
}


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Dashboard));
