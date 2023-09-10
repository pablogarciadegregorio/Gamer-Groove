import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from "react";
import "./Lives.scss";
import Quiz from "../Quiz/Quiz";

const  Lives = props => {

    const [lives, setLives] = useState(6);
    const totalLives = 6;
    const [livesArray, setLivesArray] = useState(["/static/img/full.png", "/static/img/full.png", "/static/img/full.png", "/static/img/full.png", "/static/img/full.png", "/static/img/full.png"]);
    const [classArray, setClassArray] = useState(["heart", "heart", "heart", "heart", "heart", "heart"])



    useEffect(() => {
        setLives(totalLives - props.wrongAnswers)
        if (props.wrongAnswers === 0) {
            setLivesArray(["/static/img/full.png", "/static/img/full.png", "/static/img/full.png", "/static/img/full.png", "/static/img/full.png", "/static/img/full.png"])
            setClassArray(["heart", "heart", "heart", "heart", "heart", "heart"])
        }
        if (props.wrongAnswers === 1) {
            setLivesArray(["/static/img/full.png", "/static/img/full.png", "/static/img/full.png", "/static/img/full.png", "/static/img/full.png", "/static/img/empty.png"])
            setClassArray(["heart", "heart", "heart", "heart", "heart", "heartDown"])
        }
        if (props.wrongAnswers === 2) {
            setLivesArray(["/static/img/full.png", "/static/img/full.png", "/static/img/full.png", "/static/img/full.png", "/static/img/empty.png", "/static/img/empty.png"])
            setClassArray(["heart", "heart", "heart", "heart", "heartDown", "heartDown"])
        }
        if (props.wrongAnswers === 3) {
            setLivesArray(["/static/img/full.png", "/static/img/full.png", "/static/img/full.png", "/static/img/empty.png", "/static/img/empty.png", "/static/img/empty.png"])
            setClassArray(["heart", "heart", "heart", "heartDown", "heartDown", "heartDown"])
        }
        if (props.wrongAnswers === 4) {
            setLivesArray(["/static/img/full.png", "/static/img/full.png", "/static/img/empty.png", "/static/img/empty.png", "/static/img/empty.png", "/static/img/empty.png"])
            setClassArray(["heart", "heart", "heartDown", "heartDown", "heartDown", "heartDown"])
        }
        if (props.wrongAnswers === 5) {
            setLivesArray(["/static/img/full.png", "/static/img/empty.png", "/static/img/empty.png", "/static/img/empty.png", "/static/img/empty.png", "/static/img/empty.png"])
            setClassArray(["heart", "heartDown", "heartDown", "heartDown", "heartDown", "heartDown"])
        }
        if (props.wrongAnswers >= 6) {
            setLivesArray(["/static/img/empty.png", "/static/img/empty.png", "/static/img/empty.png", "/static/img/empty.png", "/static/img/empty.png", "/static/img/empty.png"])
            setClassArray(["heartDown", "heartDown", "heartDown", "heartDown", "heartDown", "heartDown"])
        }

    }, [props.wrongAnswers])




    if (!props.showGameOver && !props.showResult && !props.showIntro) {
        return (
            <>
                <div className="livesContainer">
                    <img src={livesArray[0]} className={classArray[0]} ></img>
                    <img src={livesArray[1]} className={classArray[1]} ></img>
                    <img src={livesArray[2]} className={classArray[2]} ></img>
                    <img src={livesArray[3]} className={classArray[3]} ></img>
                    <img src={livesArray[4]} className={classArray[4]} ></img>
                    <img src={livesArray[5]} className={classArray[5]} ></img>
                </div>
            </>
        )
    }

    else return null





}




export default Lives;