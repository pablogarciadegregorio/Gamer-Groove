import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import Quiz from "../Quiz/Quiz";
import { Howl, Howler } from "howler";
import "./intro.scss";

const Intro = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleInfo = () => {
    if (showMenu === true) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };

  if (props.showIntro === false) {
    return null;
  } else {
    if (showMenu === false) {
      return (
        <>
          <div className="introContainer">
            <h1 className="guess mb-4">GUESS THE SONG</h1>
            <p className="mt-4 mb-4">Turn the volume up </p>
            <p className="mt-4 mb-4">
              Guess the correct answer before time runs out!
            </p>
            <p className="mt-4 mb-4">Enjoy</p>

            <div className="buttonsIntro mt-4">
              <button className="infoButton" onClick={handleInfo}>
                INFO
              </button>
              <button className="startButton" onClick={props.handleIntro}>
                START
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="introContainer">
            <h1 className="mb-4">INFO</h1>
            <p className="infoText mt-4 mb-4">
              You will hear some videogames tunes. Get them right and earn some
              points. The faster the better. If you run out of lives you are
              toast. <br></br> All arrangements are made by Raqanisu and Xelerad.
            </p>

            <div className="buttonsIntro mt-4">
              <button className="back button m-auto" onClick={handleInfo}>
                BACK
              </button>
            </div>
          </div>
        </>
      );
    }
  }
};

export default Intro;
