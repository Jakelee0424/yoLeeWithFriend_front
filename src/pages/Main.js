import { useEffect,React,useState } from "react";

function Main() {

  useEffect(() => {
    document.body.style.margin = "0";
  },[]);

  return (
    <div className="App">
      <h1>안녕하세요!</h1>
    </div>
  );
}

export default Main;