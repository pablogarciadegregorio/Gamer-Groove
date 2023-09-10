import React from 'react'
import ReactDOM from 'react-dom/client'
import { Howl, Howler } from 'howler';

import { useState, useEffect } from "react";
import { resultInitialState } from "../../Questions";

import "./Quiz.scss";
import Timer from "../TimerBar/timerBar";
import Lives from "../Lives/Lives";
import GameOver from "../GameOver/GameOver";
import Results from '../Results/Results';
import ChoiceSelector from '../ChoiceSelector/ChoiceSelector';
import Intro from '../Intro/Intro';
import Welcome from '../WelcomeAnimation/Welcome';
import VolumeBar from '../VolumeBar/Volume';


const Quiz = ({ questions }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const { question, choices, correctAnswer, type, src, name, videogame } = questions[currentQuestion];      // DESTRUCTURING. Coge los valores de las questions para la pregunta actual
    const [answerIndex, setAnswerIndex] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitialState);                   // Ponemos el estado inicial de result con los datos del objeto resulInitialState de Questions
    const [showResult, setShowResult] = useState(false);                        // Mostrar puntuación final
    const [showTimer, setShowTimer] = useState(true);                         // Creamos una variable para que poodamos reiniciar la barra de progreso sin que afecte la transicion de 1s que le hemos puesto en el css y le de tiempo al DOM a renderizarlo
    const [inputAnswer, setInputAnswer] = useState("");
    const [showGameOver, setShowGameOver] = useState(false);
    const [isSounding, setIsSounding] = useState(true);
    const [showIntro, setShowIntro] = useState(true);
    const [showWelcome, setShowWelcome] = useState(true);
    const [textIntroCounter, setTextIntroCounter] = useState(0);
    const [song, setSong] = useState(() => questions.map(item => {
        return new Audio(item.src)
    }));  //we prevent React from refreshing the audio value on each rerender, and thus the reference problem is solved


    

    var sfx = {
        heartDown: new Howl({
            src: "src/audio/8 bit error - Gaming sound effect (HD).mp3"
        }),
        success: new Howl({
            src: "src/audio/8 bit Success Coin 01.mp3"
        }),

        countdownTimer: new Howl({
            src: "src/audio/Counter.mp3"

        }),
        hoverSong: new Howl({
            src: "src/audio/8 Bit Coin SFX.mp3"

        }),

        resultMusic: new Howl({
            src: "src/audio/Result.mp3"

        }),

        sansTalking: new Howl({
            src: "/static/audio/SansTalking.mp3",
            sprite:{
                short:[0,550],
                medium:[550,1500],
                medium2:[0,1600],
                long:[0,1600],
                long2:[550,2550]
            }

        })
    }

   







    //   FUNCIÓN QUE SELECCIONA LA RESPUESTA

    const onAnswerClick = (answer1, index) => {            // COMPARA LA RESPUESTA SELECCIONADA CON LA RESPUESTA CORRECTA

        setAnswerIndex(index);





        // Y LA CALIFICA COMO FALSE O TRUE EN setAnswer
        if (answer1 === correctAnswer) {                  // GUARDA EN setAnswerIndex EL INDICE DEL ARRAY DE LAS RESPUESTAS SEGUN LA RESPUESTA ELEGIDA
            setAnswer(true);
            result.correctAnswers = result.correctAnswers + 1
            // result.score = result.score + 10;
            sfx.success.play();

        } else {
            setAnswer(false);
            result.wrongAnswers = result.wrongAnswers + 1
            sfx.heartDown.play();
            if (result.wrongAnswers >= 6) {
                setShowGameOver(true);
                setShowTimer(false);
                

            }
        }



    }




    //FUNCION QUE CALCULA LA PUNTUACION

    const calculateScore = (counter, duration) => {
        if (answer === true) {
            result.score = result.score + ((100 - (counter * 100 / duration)) * 10);
        }
    }




    // FUNCION QUE GESTIONA LA VALIDEZ DE LA RESPUESTA Y EL PASO A LA SIGUIENTE

    const onClickNext = () => {
        setShowTimer(false);


        if (currentQuestion !== questions.length - 1) {
            setAnswerIndex(null);             // Si NO es la última pregunta pasa a la siguiente
            setCurrentQuestion(currentQuestion + 1);
        }
        else {                                                      // Si  es la última pregunta resetea
            setCurrentQuestion(0);
            setShowResult(true);
            setShowTimer(false);
            setAnswerIndex(0);
            sfx.resultMusic.play();


        }

        setInputAnswer("")                      // reinicio Input Answer para que no me deje seleccionar NExt en la siguiente ronda
        setTimeout(() => {
            // Se mete dentro del un timeout para que no se actualicen a la vez con la declaracion de showTimer en OnclickNext de FALSE
            setShowTimer(true);                   // y  así se ejecuta después 
        })


    }


    // FUNCION QUE GESTIONA REINICIO DEL JUEGO
    const onTryAgain = () => {
        // setShowTimer(false);
        setShowResult(false);
        setShowGameOver(false);
        setAnswerIndex(null);
        setAnswer(null);
        setCurrentQuestion(0);
        result.correctAnswers = 0;
        result.score = 0;
        result.wrongAnswers = 0;



        questions.sort(() => Math.random() - 0.5);
        setSong(() => questions.map(item => {
            return new Audio(item.src)
        }))

        setTimeout(() => {                    // Se mete dentro del un timeout para que no se actualicen a la vez con la declaracion de showTimer en OnclickNext de FALSE
            setShowTimer(true);                   // y  así se ejecuta después 
        })

        setShowIntro(true)

    }


    // FUNCION QUE GESTIONA SI NO CONTESTAMOS A TIEMPO
    const handleTimeUp = () => {
        clearTimeout();
        setAnswer(false);
        setAnswerIndex(null)                  // pongo in Index de respuesta para que se pare la musica onTimeUP
        // onClickNext(false);
        result.wrongAnswers = result.wrongAnswers + 1
        sfx.heartDown.play();




    }


    // FUNCION QUE GESTIONA LAS PREGUNTAS CON INPUT
    const handleInput = (event) => {



        setInputAnswer(event.target.value);
        if (event.target.value === correctAnswer) {
            setAnswer(true);
            result.correctAnswers = result.correctAnswers + 1
            result.score = result.score + 10;

        } else {
            setAnswer(false);
            result.wrongAnswers = result.wrongAnswers + 1
            sfx.heartDown.play()


        }
    };

    // FUNCION QUE GESTIONA EL PLAY DE LA PREGUNTA
    const handlePlaySong = () => {


        if (answerIndex === null) {


            
            song[currentQuestion].play();

        }
        if (answerIndex !== null) {
            
            song[currentQuestion].pause();

        }


    }

    // FUNCION QUE GESTIONA EL COLOR MEDIANTE CLASE
    const handleCorrectWrong = (index, answer) => {


        if (answerIndex === index && correctAnswer === answer) { return 'selected-correct-answer' }
        if (answerIndex === index && correctAnswer !== answer) { return 'selected-wrong-answer' }
        if (answerIndex !== null && correctAnswer === answer) { return 'selected-correct-answer' }
        if (answerIndex !== null) { return 'selected-answer' }
    }




    const getAnswerUI = () => {



        if (type === "Input") {
            return <input className="input" value={inputAnswer} onChange={handleInput} />
        }

        if (type === "Song") {


            handlePlaySong();








            return (<ul>
                {

                    choices.map((answer, index) => (
                        <li
                            key={index}
                            onClick={() => onAnswerClick(answer, index)}
                            className={handleCorrectWrong(index, answer)}
                        >
                            {answer}
                        </li>
                    ))
                }
            </ul>);
        }



        return (<ul>
            {

                choices.map((answer, index) => (
                    <li
                        key={index}
                        onClick={() => onAnswerClick(answer, index)}
                        className={handleCorrectWrong(index, answer)}
                    >
                        {answer}
                    </li>
                ))
            }
        </ul>);
    }



    const handleIntro = () => {

        if (showIntro === true) { setShowIntro(false) }
        else { setShowIntro(false) }
       
    }

    const handleWelcome = () => {
        if (showWelcome === true) { setShowWelcome(false)}
        
    }

    
    
  
    
    return (
        <>      
        
                {showWelcome? <Welcome sfx={sfx} handleWelcome={handleWelcome}/> :
                

                <div className="game">  
                   {
                    showIntro ?
                    <div className="quiz-container">
                        <Intro showIntro={showIntro} handleIntro={handleIntro} />
                    </div>

                    :
                    
                    <div className="quiz-container">
                        <GameOver wrongAnswers={result.wrongAnswers} onTryAgain={onTryAgain} questions={questions} showGameOver={showGameOver} sfx={sfx} song={song} currentQuestion={currentQuestion}/>
                        <Results onTryAgain={onTryAgain} showResult={showResult} answerIndex={answerIndex} questions={questions} />
                        <Lives showGameOver={showGameOver} showResult={showResult} showIntro={showIntro} wrongAnswers={result.wrongAnswers} />
                        {showTimer && <Timer duration={parseInt(song[currentQuestion].duration)} onTimeUp={handleTimeUp} calculateScore={calculateScore} answerIndex={answerIndex} showTimer={showTimer} showResult={showResult} showGameOver={showGameOver} />}
                        <ChoiceSelector showResult={showResult} showGameOver={showGameOver} showIntro={showIntro} currentQuestion={currentQuestion} question={question}  getAnswerUI={getAnswerUI} onClickNext={onClickNext} answerIndex={answerIndex} inputAnswer={inputAnswer} questions={questions} handlePlaySong={handlePlaySong} type={type} />
                        
                    </div>
                    }
                </div>  
                }  
              
        </>
    );
}

export default Quiz