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
    <div className="App" style={{width:"100%",height:"100%"}}>
      <button onClick={goToTest}>차단 테스트 페이지로 이동</button>
      <div style={{
        display:"flex"
      }}>
        <div style={{
          backgroundColor:"yellow"
          ,width:"67%"
          ,height:"18rem"
          ,marginRight:"3%"
        }}>
          ss
        </div>
        <div style={{
          backgroundColor:"black"
          ,width:"30%"
          ,height:"18rem"
        }}>
          ss
        </div>
      </div>
      <div style={{
        width:"100%",
        height:"13rem",
        marginTop:"3%",
        backgroundColor:"black"
      }}>
        
      </div>
      <div style={{
        width:"100%",
        height:"40rem",
        marginTop:"3%",
        backgroundColor:"black"
      }}>
        
      </div>
      {/* 뉴스레터 div */}
      <div style={{
        width:"100%",
        height:"20rem",
        marginTop:"3%",
        backgroundColor:"black"
      }}>
        
      </div>
      {/* 뉴스레터 div */}
    </div>
  );
}

export default Main;