import React from "react";
import {bindActionCreators} from "redux";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import {connect} from "react-redux";
import ModalQuestionItem from './ModalQuestionItem';
import {toggleModal} from "../../redux/actions/ModalActions";

const DashboardModal = ({expanded, toggleModal}) =>
  <div id={"dashboard-modal"} style={{display: `${(expanded) ? "flex" : "none"}`}}>
    <div id={"dashboard-modal-box"} className={"modal-default"}>
      <div className={"dashboard-modal-header"}>
        <h3 className={"dashboard-modal-title"}>New Quiz</h3>
        <FontAwesomeIcon onClick={toggleModal} id={"dashboard-modal-close"} icon={faTimes} size="lg"/>
      </div>
      <div className={"dashboard-modal-content"}>
        <h2 className={"modal-content-headers"}>Quiz Information</h2>
        <div className={'dashboard-modal-meta'}>
          <input id={"modal-input-name"} type="text" placeholder="Name of Quiz"/>
          <select id={"modal-input-hackathon"}>
            <option value='' selected disabled>Select a Hackathon</option>
          </select>
        </div>

        <h2 className={"modal-content-headers"}>Quiz Questions</h2>
        <div className={"dashboard-modal-inputs"}>
          <ModalQuestionItem index="1"/>
          <ModalQuestionItem index="2"/>
          <ModalQuestionItem index="3"/>
        </div>
        <button onClick={toggleModal} id={"modal-content-submit"}>Submit</button>
      </div>
    </div>
    <div id={"dashboard-modal-backdrop"} className={"modal-default"}></div>
  </div>;

const mapStateToProps = (state) => ({
    expanded: state.modal.expanded,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (DashboardModal);
