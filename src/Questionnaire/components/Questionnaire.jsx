import React from 'react';
import PageTemplate from '../../common/components/PageTemplate';
import Question from './Question'

const Questionnaire = ({ title, subtitle, data }) => {
  const choiceData = data["choices"];
  const questionData = data["questions"];
  const questions = questionData.map((question, index) => (
    <div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
      <Question id={index} text={question} choices={choiceData} />
    </div>
  ));

  return (
    <PageTemplate>
      <h3>{title}</h3>
      <h5>{subtitle}</h5>
      <br/>
      <div className="row">
        {questions}
      </div>
    </PageTemplate>
  )
}

Questionnaire.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  data: React.PropTypes.object
};

export default Questionnaire;