import { useEffect,React,useState } from "react";

function Main() {

  useEffect(() => {
    document.body.style.margin = "0";
  },[]);

  return (
    <div className="App">
      <h1>유저 화면 분할 표시 안녕하세요!</h1>
    </div>
  );
}

export default Main;