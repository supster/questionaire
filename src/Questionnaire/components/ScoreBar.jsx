import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ScoreBar extends React.Component {
  constructor(props) {
    super(props);
  }

  /* I could move these 2 methods to Redux
    But, since they are only used in this component, I leave them here.
  */
  getSeverity(score) {
    if(score < 4) {
      return 'none';
    } else if(score > 4 && score <= 9) {
      return 'mild';
    } else if(score > 9 && score <= 14) {
      return 'moderate';
    } else if(score > 14 && score <= 19) {
      return 'moderately severe';
    } else {
      return 'severe';
    }
  }

  isModerateOrHigher(score) {
    return score > 9;
  }

  render() {
    let showButton;
    if (this.isModerateOrHigher(this.props.score)) {
      showButton = <Link className="btn btn-primary pull-right" to='/help'>Get Help</Link>;
    }

    return (
      <nav className="navbar-default navbar-fixed-top navbar-controls">
        <div className="container">
          Total Score: {this.props.score} / 27
          Severity: {this.getSeverity(this.props.score)}
          {showButton}
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