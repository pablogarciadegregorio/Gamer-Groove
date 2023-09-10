import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect, useRef } from "react";
import Quiz from "../Quiz/Quiz";
import { Howl, Howler } from 'howler';
import "./Welcome.scss";






const Welcome = props => {

    const [showWelcome, setShowWelcome] = useState(true);
    const [imgCounter, setImgCounter] = useState(0)
    const [welcomeImg, setWelcomeImg] = useState(["/static/img/00.gif","/static/img/01.gif","/static/img/02.gif","/static/img/03.gif",
     "/static/img/04.gif","/static/img/05.gif","/static/img/06.gif","/static/img/07.gif","/static/img/08.gif"]);

    
        
    // GESTION DEL SONIDO DEL TEXTO
    useEffect(() => {
            if (imgCounter === 0 || imgCounter === 1 || imgCounter === 8){props.sfx.sansTalking.play('short')};
            if (imgCounter === 2 || imgCounter === 3 || imgCounter === 7){props.sfx.sansTalking.play('medium')}
            if (imgCounter === 5){props.sfx.sansTalking.play('medium2')}
            if (imgCounter === 4    ){props.sfx.sansTalking.play('long')}
            if ( imgCounter === 6 ) {props.sfx.sansTalking.play('long2')}   
        })
    

    const handleWelcomeText = () => {

        
        if (imgCounter < welcomeImg.length-1){
        setImgCounter(imgCounter+1);
        }
        if(imgCounter === welcomeImg.length-1){
            setShowWelcome(false);
            props.handleWelcome();
        }
          
        
        
    }


    if (showWelcome === false) { return null}

    else{
            return (
                <>
                <div className="bg-welcome" onClick={handleWelcomeText}>
                <div className="tip">CLICK ANYWHERE</div>     
                    <img className="undertale-box" src={welcomeImg[imgCounter]}></img>  
                </div>
                </>

            )

    }


}

export default Welcome;