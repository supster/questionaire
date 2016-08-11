import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux';
import Questionaire from './components/Questionnaire';
import GetHelpPage from './components/GetHelpPage';
import QuestionData from './test/fixture/questions';
import { Router, Route, hashHistory } from 'react-router';

const store = createStore(reducers);

class QuestionnaireWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Questionaire data={QuestionData} />
      </Provider>
    );
  }
};

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path='/' component={QuestionnaireWrapper} />
      <Route path='/help' component={GetHelpPage} />
    </Router>,
    document.getElementById('questionnaire')
  );
}