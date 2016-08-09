import React from 'react';

const Question = ({
  id,
  text,
  choices
}) => {
  const displayChoices = choices.map((choice, index) => (
    <li key={index} className="list-group-item">
      <div className="radio">
        <label>
          <input type="radio" name={id} value={choice["value"]}/>
          {choice["text"]}
        </label>
      </div>
    </li>
  ));

  return (
    <div className="panel panel-default">
      <div className="panel-heading">{text}</div>
      <ul className="list-group">
        {displayChoices}
      </ul>
    </div>
  );
}

Question.propTypes = {
  id: React.PropTypes.number,
  text: React.PropTypes.string,
  choices: React.PropTypes.array
};

export default Question;
