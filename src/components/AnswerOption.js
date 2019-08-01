import React from 'react';
import PropTypes from 'prop-types';

function AnswerOption(props) {
  return (
    <li className="answerOption">
      <label className="radioCustomLabel">
        <input
        className="radioCustomButton"
        type="radio"
        value={props.answerType}
        disabled={props.answer}
        onChange={(e) => props.onAnswerSelected(props.answerType)}
        />
      {props.answerContent}
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;
