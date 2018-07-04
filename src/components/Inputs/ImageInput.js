import { Field } from 'react-form';
import React from "react";



export default class ImageInput extends React.Component {
    constructor() {
        super();
        this.state = {
            value: ""
        }
    }

    render() {
        return (
            <Field field={this.props.field} classNmae={this.props.className}>
                { fieldApi => {

                    // Remember to pull off everything you dont want ending up on the <input>
                    // thats why we pull off onChange, onBlur, and field
                    // Note, the ...rest is important because it allows you to pass any
                    // additional fields to the internal <input>.
                    const { ...rest } = this.props;

                    const { setValue } = fieldApi;

                    return (
                            <input
                                {...rest}
                                value={this.state.value}
                                onChange={e => {
                                    setValue(`**IMG** ${e.target.value}`);
                                    this.setState({
                                        value: e.target.value
                                    })
                                }}
                            />

                    )
                }}
            </Field>
        );
    }
}
