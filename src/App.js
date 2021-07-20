import React, { useState } from "react";

import Characters from "./components/Characters";
import Header from "./components/Header";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = () => {
    setDarkMode(!darkMode);
    const candleButton = document.querySelector(".App")
    const title = document.querySelector(".App__title");
    const characterContainer = document.querySelectorAll(".character-container")

    candleButton.classList.toggle("dark-background");
    title.classList.toggle("dark-title");
    characterContainer.forEach(pj => {
      pj.classList.toggle("dark-text")
    });
  };


  return (
    <div className="App dark-background">
      <h1 className="App__title">Rick and Morty Characters</h1>
      <Header onHandleClick={handleClick} isDarkMode={darkMode} />
      <Characters isDarkMode={darkMode} />
    </div>
  );
}

export default App;