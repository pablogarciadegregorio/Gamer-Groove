import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect, useRef } from "react";
import "./GameOver.scss";

import { Howl, Howler } from 'howler';
import Lives from '../Lives/Lives';



const GameOver = props => {

    const intervalRef = useRef();
    const [counter, setCounter] = useState(null);
    


    const handleContinue = () => {
        props.song[props.currentQuestion].pause();
        props.sfx.countdownTimer.play();

        if (counter === null){setCounter(10)}

        let sampleInterval = setInterval(() => {
            if (counter > 0) {
                setCounter(counter - 1);
                clearInterval(sampleInterval);
                
            }

            if (counter === 0) {
                clearInterval(sampleInterval);
            }

            ;
        }, 1000);


        if (counter > 0) {

            return (<>

                <p className={"continue "}>
                    CONTINUE?
                </p>
                <p className="counter">{counter}</p>
                <div className="yes-no" onClick={props.onTryAgain}>
                    <p>YES</p> 
                    
                </div>
                
            </>)
        }



        if (counter === 0) {

            return (
                <>
                    {/* <img src="https://i.pinimg.com/originals/27/a3/14/27a3141ad1a59cc5529f0ade857d7bc6.jpg"></img> */}
                    <p className="gamerEnough1"> Maybe you are not </p>
                    <p className="gamerEnough2">gamer enough?</p>
                    
                </>
            )
        }

    }


    if (props.showGameOver === false) { return null }
    else {

        return (
            <>
                <div className="gameOver">
                    <div className="pixel-shadows">                 {/* Si showResult es true muestra los resultados */}
                        <div className="pixel-shadow01"></div>
                        <div className="pixel-shadow02"></div>
                        <div className="pixel-shadow03"></div>
                        <div className="pixel-shadow04"></div>
                        <div className="pixel-shadow05"></div>
                        <div className="pixel-shadow06"></div>
                    </div>
                    <Lives wrongAnswers={props.wrongAnswers} />
                    <div className="gameOverText">
                        <img src="/static/img\GameOver-small.png" className="goText"></img>

                        {handleContinue()}
                    </div>

                    {/* <button className="tryAgainGO" onClick={props.onTryAgain}>Try Again</button> */}

                </div>
            </>
        )
    }
}

export default GameOver;