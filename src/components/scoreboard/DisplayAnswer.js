import React from 'react';

let results = [0, 0, 0, 0];

class DisplayAnswer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users,
            index: this.props.index
        };
    }

    componentWillReceiveProps() {
        if (Object.is(this.state.users, this.props.users) || this.state.index !== this.props.index) {
            console.log("Update Answer Display");
            let self = this;
            results = [0, 0, 0, 0];

            this.setState({ index: this.props.index });
            this.state.users.map((user) => {
                let i = self.props.index;
                if (user.answers.length > i) {
                    let answer = user.answers[i];
                    results[answer]++;
                }
                return null;
            });
        }
    }

    render() {
        return <div className="display-answer">
            <h2>Question {this.state.index + 1}</h2>
            <ul className="display-answer-items">
            {
                results.map((item, index) => {
                    let percent = item / this.state.users.length || 0;
                    return <li key={index} className="display-answer-item">
                        <p className="display-answer-item-head">Answer {parseInt(index, 10) + 1} - {percent * 100 + "%"}</p>
                        <div className="display-answer-item-bar" style={{width: percent * 100 + "%"}}></div>
                    </li>;
                })
            }
            </ul>
        </div>;
    }
}

export default DisplayAnswer;