import React from 'react';
import { connect } from 'react-redux';
import { DEFAULT_API_URL } from '../../configurations';

let results = [0, 0, 0, 0];

class DisplayAnswer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            quiz: [],
            index: -1
        };

        let self = this;
        fetch(DEFAULT_API_URL + '/quiz/' + this.props.id).then((res) => {
            return res.json();
        }).then((data) => {
            self.setState({quiz: data.questions});
        });
    }

    componentWillReceiveProps() {
        if (JSON.stringify(this.state.users) !== JSON.stringify(this.props.users) || this.state.index !== this.props.index) {
            let self = this;
            results = [0, 0, 0, 0];
            this.setState({ index: this.props.index });
            this.setState({ users: this.props.users });
            this.props.users.map((user) => {
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
        let quiz = this.state.quiz;
        console.log(quiz);
        return <div className="display-answer">
            {
                quiz.length !== 0 && this.state.index !== -1?
                <div>
                <h3>{ quiz[this.state.index].title }</h3>
                <ul className="display-answer-items">
                {
                    results.map((item, index) => {
                        console.log(item);
                        if (quiz[this.state.index].choices.length > index) {
                            let percent = item / this.state.users.length || 0;
                            return <li key={index} className="display-answer-item">
                                <p className="display-answer-item-head">
                                {
                                    (quiz[this.state.index].choices[index].startsWith("**IMG**")?
                                    "Answer" + (parseInt(index, 10) + 1) : 
                                    quiz[this.state.index].choices[index])
                                        + " - " + (percent * 100 + "%")
                                }
                                </p>
                                <div className="display-answer-item-bar" style={{ width: percent * 100 + "%" }}></div>
                            </li>;
                        }
                        return null;
                    })
                }
                </ul>
                </div>:
                <p>Loading...</p>
            }
        </div>;
    }
}

const mapStateToProps = state => ({
    id: state.scoreboard.id
});

export default connect(mapStateToProps, null)(DisplayAnswer);
