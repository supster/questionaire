import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux';
import Questionaire from './components/Questionnaire';
import QuestionData from './test/fixture/questions';

const store = createStore(reducers);

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <Provider store={store}>
      <Questionaire data={QuestionData} />
    </Provider>,
    document.getElementById('questionnaire')
  );
}