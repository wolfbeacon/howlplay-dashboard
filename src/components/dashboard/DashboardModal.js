import React from "react";
import {bindActionCreators} from "redux";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import {connect} from "react-redux";
import ModalQuestionItem from './ModalQuestionItem';
import {toggleModal} from "../../redux/actions/ModalActions";
import {Form, NestedField, Text} from "react-form";

const DashboardModal = ({expanded, toggleModal}) =>
    <Form onSubmit={submittedValues => {console.log(submittedValues);}}>
        {formApi => (
            <form id={"dashboard-modal"} onSubmit={formApi.submitForm} style={{display: `${(expanded) ? "flex" : "none"}`}}>
                <div id={"dashboard-modal-box"} className={"modal-default"}>
                    <div className={"dashboard-modal-header"}>
                        <h3 className={"dashboard-modal-title"}>New Quiz</h3>
                        <FontAwesomeIcon onClick={toggleModal} id={"dashboard-modal-close"} icon={faTimes} size="lg"/>
                    </div>
                    <div className={"dashboard-modal-content"}>
                        <h2 className={"modal-content-headers"}>Quiz Information</h2>
                        <div className={'dashboard-modal-meta'}>
                            <Text id={"modal-input-name"} field="name" placeholder="Name of Quiz"/>
                            <Text id={"modal-input-name"} field="url" placeholder="Name of Quiz"/>

                            {/*<select id={"modal-input-hackathon"}>*/}
                                {/*<option value='' selected disabled>Select a Hackathon</option>*/}
                            {/*</select>*/}
                        </div>

                        <h2 className={"modal-content-headers"}>Quiz Questions</h2>
                        <div className={"dashboard-modal-inputs"}>
                            {Array(3).fill().map((x,i)=> <NestedField field={["questions", i]}><ModalQuestionItem key={i} index={i + 1}/></NestedField>)}
                        </div>
                        <button onClick={() => {toggleModal(); formApi.resetAll()}} type="submit" id={"modal-content-submit"}>Submit</button>
                    </div>
                </div>
                <div id={"dashboard-modal-backdrop"} className={"modal-default"}/>
            </form>)
        }
    </Form>;

const mapStateToProps = (state) => ({
    expanded: state.modal.expanded,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardModal);
