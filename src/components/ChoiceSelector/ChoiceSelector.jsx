import React from "react";
import ReactDOM from "react-dom/client";
import "./ChoiceSelector.scss";
import { resultInitialState, jsQuizz } from "../../Questions";

const ChoiceSelector = (props) => {
  if (!props.showGameOver && !props.showResult && !props.showIntro) {
    return (
      <>
        <div className="pixel-shadows">
          <div className="pixel-shadow1"></div>
          <div className="pixel-shadow2"></div>
          <div className="pixel-shadow3"></div>
          <div className="pixel-shadow4"></div>
          <div className="pixel-shadow5"></div>
          <div className="pixel-shadow6"></div>
        </div>

        <h2>{props.question}</h2>
        {props.getAnswerUI()}
        <div className="footer">
          <div className="question-tracker">
            <span className="active-question-number">
              {props.currentQuestion + 1}
            </span>
            <span className="total-question">/{props.questions.length}</span>
          </div>
          <button
            onClick={() => props.onClickNext(props.answer)}
            disabled={props.answerIndex === null && !props.inputAnswer}
          >
            {" "}
            {/* SI NO HEMOS DEFINIDO answerIndex  O no hemos metido INPUT no se puede clickar el boton de next */}
            {props.currentQuestion === props.questions.length - 1
              ? "finish"
              : "next"}
          </button>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default ChoiceSelector;
