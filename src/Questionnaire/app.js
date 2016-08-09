import React from 'react';
import ReactDOM from 'react-dom';
import Questionaire from './components/Questionnaire';
import QuestionData from './test/fixture/questions';

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <Questionaire title='Patient Health Questionnaire (PHQ-9)'
                  subtitle='Over the last two weeks, how often have you been bothered by any of the following problems?'
                  data={QuestionData} />,
    document.getElementById('questionnaire')
  );
}