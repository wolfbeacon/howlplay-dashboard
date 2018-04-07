import {Component} from "react";
import React from "react";

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import EditIcon from "@fortawesome/fontawesome-free-solid/faEdit";

class EditableLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: this.props.isEditing || false,
            text: this.props.text || "",
        };

        this._handleFocus = this._handleFocus.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    _handleFocus() {
        if(this.state.isEditing) {
            if(typeof this.props.onFocusOut === 'function') {
                this.props.onFocusOut(this.state.text);
            }
        }
        else {
            if(typeof this.props.onFocus === 'function') {
                this.props.onFocus(this.state.text);
            }
        }

        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    _handleChange() {
        this.setState({
            text: this.textInput.value,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            text: nextProps.text
        })
    }

    render() {
        if(this.state.isEditing) {
            return <div className={this.props.className}>
                <input type="text"
                       className={this.props.inputClassName}
                       ref={(input) => { this.textInput = input; }}
                       value={this.state.text}
                       onChange={this._handleChange}
                       onBlur={this._handleFocus}
                       style={{
                           width: this.props.inputWidth,
                           height: this.props.inputHeight,
                           fontSize: this.props.inputFontSize,
                           fontWeight: this.props.inputFontWeight,
                           borderWidth: this.props.inputBorderWidth,

                       }}
                       maxLength={this.props.inputMaxLength}
                       placeholder={this.props.inputPlaceHolder}
                       tabIndex={this.props.inputTabIndex}
                       autoFocus/>
            </div>
        }

        return <div className={this.props.className} onClick={this._handleFocus}>
            <label className={this.props.labelClassName}>
                {this.state.text}
            </label>
            <FontAwesomeIcon className={"edit-icon"} icon={EditIcon} style={{display: `${(this.state.text !== "") ? "inline-block" : "none"}`}} size="lg" />
        </div>;
    }
}

export default EditableLabel;
