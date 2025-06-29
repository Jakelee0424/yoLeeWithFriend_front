import { useEffect,React,useState } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = "0";
  },[]);

  const goToTest = () => {
    navigate("/test");
  };

  return (
    <div className="App">
      <h1>유저 화면 분할 표시 안녕하세요!</h1>
      <button onClick={goToTest}>차단 테스트 페이지로 이동</button>
    </div>
  );
}

export default Main;