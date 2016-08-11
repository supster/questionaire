import React from 'react';
import { connect } from 'react-redux';
import { updateAnswer, updateScore } from '../redux/ScoreRedux';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: 0
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    if (e.target.checked) {
      const answer = e.target.value;
      const prevAnswer = this.state.answer;
      if (prevAnswer !== answer) {
        this.props.onAnswerChange(this.props.id, answer, prevAnswer);
        this.setState({ answer: answer });
      }
    }
  }

  render() {
    const displayChoices = this.props.choices.map((choice, index) => (
      <li key={index} className="list-group-item">
        <div className="radio">
          <label>
            <input  type="radio" name={this.props.id}
                    value={choice["value"]}
                    onChange={this.onInputChange} />
            {choice["text"]}
          </label>
        </div>
      </li>
    ));

    return (
      <div className="panel panel-default">
        <div className="panel-heading">{this.props.text}</div>
        <ul className="list-group">
          {displayChoices}
        </ul>
      </div>
    );
  }
};

Question.propTypes = {
  id: React.PropTypes.number,
  text: React.PropTypes.string,
  choices: React.PropTypes.array,
  onAnswerChange: React.PropTypes.func
};

const mapStateToProps = (state) => ({
});

const mapDispatcherToProps = (dispatch) => ({
  onAnswerChange: (id, answer, prevAnswer) => {
    dispatch(updateAnswer(id, answer));
    dispatch(updateScore(prevAnswer, answer));
  }
});

export default connect(mapStateToProps, mapDispatcherToProps)(Question);
