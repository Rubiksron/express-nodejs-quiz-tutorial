import React, { Component } from "react";
import { render } from "react-dom";
import Question from "./components/Question.js";
import Result from './components/Result.js'
import Quiz from './components/Quiz.js';
import quizQuestions from './api/quizQuestions';
import update from 'react-addons-update';
import "./sass/main.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        correct: 0,
        wrong: 0
      },
      result: ''
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

//shuffledAnswerOptions is an array of arrays of objects.
  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    console.log('shuffledAnswerOptions', shuffledAnswerOptions);
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

/*the below came from stack overflow: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array*/
  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

/*The event passed below comes from AnswerOption where the onChange is declared*/
  handleAnswerSelected(event) {
    console.log('event:', event);
    this.setUserAnswer(event);
    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
    // console.log('this.state: ', this.state);
  }

  setUserAnswer(answer) {
    console.log('answer: ', answer);
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: { $apply: (currentValue) => currentValue + 1
      }
    });
    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  /*getResults calculates whether correct or wrong has the higher total*/
  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  /*setResults gets result from getResults*/
  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
    console.log('result: ', result);
  }

  renderQuiz() {
    return (
      <Quiz
      answer={this.state.answer}
      questionId={this.state.questionId}
      answerOptions={this.state.answerOptions}
      question={this.state.question}
      questionTotal={quizQuestions.length}
      onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return <Result answersCount={this.state.answersCount} />;
  }

  render() {
    return (
      <div className="App">
      <div className="App-header">
      <h2 className="center">Express Quiz</h2>
      </div>
      {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );  }
  }

  export default App;
