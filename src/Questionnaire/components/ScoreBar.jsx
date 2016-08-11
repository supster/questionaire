import React from 'react';
import { connect } from 'react-redux';

class ScoreBar extends React.Component {
  render() {
    return (
      <nav className="navbar-default navbar-fixed-top navbar-controls">
        <div className="container">
          Total Score: {this.props.score} / 27
        </div>
      </nav>
    );
  }
};

ScoreBar.propTypes = {
  score: React.PropTypes.number
};

const mapStateToProps = (state) => ({
  score: state.score.totalScore
});

export default connect(mapStateToProps)(ScoreBar);