import React from 'react';
import PropTypes from 'prop-types';
// import { CSSTransitionGroup } from 'react-transition-group';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Result(props) {

  return (
    <ReactCSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        <h2 className="center">You got {props.answersCount.correct} right and {props.answersCount.wrong} wrong.</h2>
      </div>
    </ReactCSSTransitionGroup>
  );
}

Result.propTypes = {
  answersCount: PropTypes.object.isRequired
};

export default Result;
