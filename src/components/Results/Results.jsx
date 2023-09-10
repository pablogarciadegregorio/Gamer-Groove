import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from "react";
import "./Results.scss";
import Quiz from "../Quiz/Quiz";
import { Howl, Howler } from 'howler';
import Lives from '../Lives/Lives';
import { resultInitialState, jsQuizz } from "../../Questions";


const Results = props => {


    const [showSongList, setShowSongList] = useState(false);

    const handleShowSongList = () => {

        if (showSongList === true) { setShowSongList(false)}
        else {setShowSongList(true)};
    }



    if (showSongList === true) {


        return (
            <>
                <h1 className="mt-4">SONG LIST</h1>
                <hr className="divider"></hr>
                <div className="songBox container mt-4">

                    {

                        props.questions.map((index, key) => (
                            <div key={key} className="songDataContainer container">
                                <div className="col-12 songData">
                                    <div className="col-2 number-container">
                                        <p className="songNumber">{key + 1}</p>
                                        <p className="selector">»</p>
                                    </div>



                                    <div className="col-10 data ms-3">
                                        <h2 className="title">{index.name}</h2>
                                        <h2 className="composer">Composer:{index.composer}</h2>
                                        <p className='vg m-0 text-secondary'>from {index.videogame}</p>
                                        <p className='arranger m-0 text-secondary'>Arranger:{index.arranger}</p>
                                    </div>
                                </div>
                            </div>

                        ))
                    }

                </div>
                <button className="buttonBack" onClick={handleShowSongList}>back</button>
            </>
        );








    }










    if (props.showResult === true) {


        return (
            <>

                <div className="results">                   {/* Si showResult es true muestra los resultados */}

                    <div className="pixel-shadows">
                        <div className="pixel-shadow01"></div>
                        <div className="pixel-shadow02"></div>
                        <div className="pixel-shadow03"></div>
                        <div className="pixel-shadow04"></div>
                        <div className="pixel-shadow05"></div>
                        <div className="pixel-shadow06"></div>
                    </div>

                    <Lives wrongAnswers={resultInitialState.wrongAnswers} />

                    <h3>SCORE</h3>
                    <div>
                        <div className="score">{Math.trunc(resultInitialState.score)}</div>
                    </div>
                    <p>
                        TOTAL QUESTIONS:<span>{props.questions.length}</span>
                    </p>

                    <p>
                        CORRECT ANSWERS:<span className="correct">{resultInitialState.correctAnswers}</span>
                    </p>
                    <p>
                        WRONG ANSWERS:<span className="wrong">{resultInitialState.wrongAnswers}</span>
                    </p>
                    <div className="buttonSelector">
                        <button className="tryAgain" onClick={props.onTryAgain}>Try Again</button>
                        <button className="tryAgain" onClick={handleShowSongList}>Song List</button>
                    </div>

                </div>

            </>




        )
    }

    else { return null }
}

export default Results;