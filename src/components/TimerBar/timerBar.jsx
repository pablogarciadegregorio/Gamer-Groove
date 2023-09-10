import React from 'react'
import ReactDOM from 'react-dom/client'
import "./timerBar.scss";
import { useEffect, useState, useRef } from 'react';

const Timer = props => {

    const [counter, setCounter] = useState(0);
    const [barProgress, setBarProgress] = useState(0);

    const intervalRef = useRef();




    // CONTADOR 
    useEffect(() => {
        if (props.answerIndex === null) {
            intervalRef.current = setInterval(() => {
                setCounter(counter + 0.01)  // Añadimos 1 al counter cada segundo    
            }, 10);
            return () => clearInterval(intervalRef.current);   // Limpia el intervalo para que no se vuelva loco.
        }
        else {
            setCounter(counter);
            props.calculateScore(counter, props.duration);
        }
    }, [counter]);



    //  
    useEffect(() => {
        
        setBarProgress(100 * (counter / props.duration) )                  // Calcula el porcentaje en relacion con la duracion. Duracion está metido como valor en QUIZ <Timer/>
        if (counter >= props.duration + 0.1) {                                // Le pongo +1 para que no te de por mala si la aciertas en el ultimo milisegundo
            clearInterval(intervalRef.current)
            setTimeout(() => {                                      // Le ponemos  un setTimeout de 1s porque la animacion tarda un segundo más en completarse
                props.onTimeUp();
            }, 1000);

        }
    }, [counter]); // Se ejecuta este código cada vez que counter cambia














    if (!props.showGameOver && !props.showResult) {

        return (
            <div className="timer-container">
                <div
                    style={{
                        width: `${barProgress}%`,
                        backgroundColor: `${barProgress < 50 ? 'lightgreen' : barProgress < 85 ? 'orange' : 'red'    // Cambia de color según el porcentaje de barra completado
                            }`,
                    }}

                    className="progress">

                </div>
            </div>
        )
    }

    else return null
}




export default Timer;