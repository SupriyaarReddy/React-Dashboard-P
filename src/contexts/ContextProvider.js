import React, { createContext, useContext, useState } from 'react';


const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
};

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState)
    const handleClicked = (cliked) => { setIsClicked({ ...initialState, [cliked]: true }) }
    const [screenSize, setScreenSize] = useState(undefined)
    const [currentColor, setcurrentColor] = useState('#03C9D7')
    const [currentMode, setcurrentMode] = useState('Light')
    const [themeSettings, setThemeSettings] = useState(false)

  const setMode = (e) => {
    setcurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value)
    setThemeSettings(false)
  }

  const setColor = (color) => {
   
    setcurrentColor(color);
    localStorage.setItem('colorMode', color)
    setThemeSettings(false)
  }
  


  return (
    <StateContext.Provider
      value={{
        activeMenu, setActiveMenu,
        isClicked, setIsClicked,
        handleClicked,
        screenSize, setScreenSize,
        currentColor, setcurrentColor,
        currentMode, setcurrentMode,
        themeSettings, setThemeSettings,
        setMode, setColor,
      }}
        >
            {/* ----children is used to return the context */}
          {children} 
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext);