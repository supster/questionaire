import React from 'react';
import PageTemplate from '../../common/components/PageTemplate';
import Question from './Question';
import ScoreBar from './ScoreBar';

const Questionnaire = ({ data }) => {
  const choiceData = data["choices"];
  const questionData = data["questions"];
  const questions = questionData.map((question, index) => (
    <div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
      <Question id={index} text={question} choices={choiceData} />
    </div>
  ));

  return (
    <PageTemplate>
      <ScoreBar  />
      <h3>{data["title"]}</h3>
      <h5>{data["subtitle"]}</h5>
      <div className="row">
        {questions}
      </div>
    </PageTemplate>
  )
};

Questionnaire.propTypes = {
  data: React.PropTypes.object
};

export default Questionnaire;