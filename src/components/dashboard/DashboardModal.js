import React from "react";
import {bindActionCreators} from "redux";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import {connect} from "react-redux";
import ModalQuestionItem from './ModalQuestionItem';
import {toggleModal, editModal} from "../../redux/actions/ModalActions";

// Not very good with redux so bare with me with this xD
const data = {
  name: "testQuiz",
  questions: [{"title":"This is a test Question","choices":["Choice 1","Choice 2","Choice 3","Choice 4"],"answer":"2"},{"title":"This is a test Question2","choices":["Choice 1","Choice 2","Choice 3","Choice 4"],"answer":"2"},{"title":"This is a test Question3","choices":["Choice 1","Choice 2","Choice 3","Choice 4"],"answer":"2"},{"title":"This is a test Question4","choices":["Choice 1","Choice 2","Choice 3","Choice 4"],"answer":"2"}]
};

const DashboardModal = ({expanded, edit, toggleModal, editModal}) =>
  <div id={"dashboard-modal"} style={{display: `${(expanded) ? "flex" : "none"}`}}>
    <div id={"dashboard-modal-box"} className={"modal-default"}>
      <div className={"dashboard-modal-header"}>
        <h3 className={"dashboard-modal-title"}>{edit? "Edit Quiz": "New Quiz"}</h3>
        <FontAwesomeIcon onClick={() => {
          toggleModal();
          if (edit) editModal();
        }} id={"dashboard-modal-close"} icon={faTimes} size="lg"/>
      </div>
      <div className={"dashboard-modal-content"}>
        <h2 className={"modal-content-headers"}>Quiz Information</h2>
        <div className={'dashboard-modal-meta'}>
          <input id={"modal-input-name"} type="text" placeholder="Name of Quiz" value={edit? data.name: ""}/>

          {/* TODO: Not entirely sure what to do with this */}
          <select id={"modal-input-hackathon"}>
            <option value='' selected disabled>Select a Hackathon</option>
          </select>
        </div>

        <h2 className={"modal-content-headers"}>Quiz Questions</h2>
        {
          edit?
          <div className={"dashboard-modal-inputs"}>
            {
              data.questions.map((item, index) =>
                <ModalQuestionItem data={item} index={index}/>
              )
            }
          </div>:
          <div className={"dashboard-modal-inputs"}>
            <ModalQuestionItem index="0"/>
            <ModalQuestionItem index="1"/>
            <ModalQuestionItem index="2"/>
          </div>
        }
        <button onClick={() => {
          toggleModal();
          if (edit) editModal();
        }} id={"modal-content-submit"}>{edit? "Save Changes": "Submit"}</button>
      </div>
    </div>
    <div id={"dashboard-modal-backdrop"} className={"modal-default"}></div>
  </div>;

const mapStateToProps = (state) => ({
    expanded: state.modal.expanded,
    edit: state.modal.edit
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleModal, editModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (DashboardModal);
