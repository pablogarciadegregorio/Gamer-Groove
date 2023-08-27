import React from 'react'
import ReactDOM from 'react-dom/client'
import Quiz from "./components/Quiz/Quiz";
import { jsQuizz } from "./Questions";
import { useState, useEffect } from "react";



function App() {
 
  jsQuizz.questions.sort(() => Math.random() - 0.5);  // HACE UN RANDOM DE LAS PREGUNTAS AL INICIO DE LA APLICACION
  const [questionsSelection , setQuestionsSelection] = useState(jsQuizz.questions.slice(0,10)) // HACE UNA SELECCION DE 10 PREGUNTAS DENTRO DE ESE RANDOM
  console.log(questionsSelection) 
  

  return (
    <>
    
    <Quiz questions={questionsSelection}/>
          
    </>
  )
}

export default App


