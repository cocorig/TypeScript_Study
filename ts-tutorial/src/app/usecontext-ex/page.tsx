"use client";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";

const UseContextExample = () => {
  const { state, dispatch } = useContext(ThemeContext);
  const themeStyles = {
    backgroundColor: state.theme === "dark" ? "#333" : "#f4f4f4",
    color: state.theme === "dark" ? "white" : "black",
  };
  console.log(state);
  return (
    <div className="useContextExample" style={themeStyles}>
      으아아ㅏㅇ
      <button onClick={() => dispatch({ type: "CHANGE_THEME" })}>
        Change Theme
      </button>
      <button
        onClick={() => dispatch({ type: "CHANGE_FONTSIZE", payload: 20 })}
      >
        Change Font Size
      </button>
    </div>
  );
};

export default UseContextExample;
