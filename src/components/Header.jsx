import React, { useContext, useState } from 'react';
import ThemeContext from '../context/ThemeContext';

const Header = (props) => {
  
  const color = useContext(ThemeContext)

  return (
    <div id="header" className="Header">
      <h1 style={{color}} >React Hooks</h1>
      <button
      onClick={props.onHandleClick} 
      type="button"
      >
          {
          props.isDarkMode?
          'Dark Mode':
          'Light Mode'
          }
      </button>
    </div>
  )}
          
export default Header;