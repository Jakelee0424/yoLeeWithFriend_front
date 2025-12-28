import { useEffect,React,useState } from "react";
import { Input } from "reactstrap";
import styles from '../../../style/font.module.css';
import versusStyle from "style/versus.module.css";

function Mypage() {

  const profileImg = process.env.PUBLIC_URL+"/asset/images/profileImg.png";
  return (
    <div className="App" style={{width:"100%",height:"100vh"}}>
      <div style={{height:"50%", width:"100%"}}>
        <div style={{height:"7%", width:"100%", marginBottom:"2%"}}>
            <div style={{height:"100%", width:"50%"}}><h4 className={styles.text}>내 정보</h4></div>
            <div style={{height:"100%", width:"50%"}}></div>
        </div>
        <div style={{display:"flex", height:"90%", width:"100%"}}>
          <div style={{height:"100%", width:"50%", border:"0.1px solid black", borderRadius:"10px"}}>
            <div style={{height:"50%",
              width:"100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"    
              }}>
              <img src={profileImg} style={{width:"25%"}}/>
            </div>
            <div style={{height:"50%", width:"100%"}}>
              <div style={{height:"33%", width:"100%", display:"flex"}}>
                <div style={{height:"90%", width:"25%", display:"flex", alignItems: "center", marginLeft:"15%"}} >
                  <h5>닉네임</h5>
                </div>
                <div style={{height:"90%", width:"50%", marginLeft:"3%", marginRight:"8%"}} >
                  <Input
                    type="text"
                    value={"피트니스새싹12"}
                  />
                </div>
              </div>
              <div style={{height:"33%", width:"100%", display:"flex"}}>
                <div style={{height:"90%", width:"25%", display:"flex", alignItems: "center", marginLeft:"15%"}} >
                  <h5>연동 플랫폼</h5>
                </div>
                <div style={{height:"90%", width:"50%", marginLeft:"3%", marginRight:"8%", display:"flex", alignItems: "center" }} >
                  네이버 로그인
                </div>
              </div>
              <div style={{height:"33%", width:"100%", display:"flex"}}>
                <div style={{height:"90%", width:"25%", display:"flex", alignItems: "center", marginLeft:"15%"}} >
                  <h5>가입일</h5>
                </div>
                <div style={{height:"90%", width:"50%", marginLeft:"3%", marginRight:"8%", display:"flex", alignItems: "center" }} >
                  2025.05.05
                </div>
              </div>
            </div>
          </div>
          <div style={{height:"100%", width:"45%", marginLeft:"5%"}}>
              <div style={{height:"20%", width:"100%", border:"0.1px solid black", borderRadius:"10px", display:"flex", alignItems: "center", justifyContent:"center"}}>
                <h4 className={styles.text}>
                  나의 리뷰 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"#FF8800"}}>38 </span>건 
                </h4>
              </div>
              <div style={{height:"80%", width:"100%", display:"flex"}}>
                <div style={{height:"90%", width:"33%", borderRight:"0.1px solid black", marginTop:"2%", alignItems:"center", justifyContent:"center"}}>
                      <div style={{
                      width:"70%",
                      height:"20%",
                      borderRadius:"8px",
                      marginLeft:"13%",
                      marginTop:"20%",
                      border: "2px solid rgba(0, 0, 0, 0.2)",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      backgroundColor:"#FFFFFF"
                    }}
                    className={styles.text}
                    >
                      BCAA
                    </div>
                    <div style={{
                      height:"60%",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                    }}
                    >
                       <h4 className={styles.text}><span style={{color:"#FF8800"}}>8 </span>건</h4> 
                    </div>
                </div>
                <div style={{height:"90%", width:"33%", borderRight:"0.1px solid black", marginTop:"2%", alignItems:"center", justifyContent:"center"}}>
                      <div style={{
                      width:"70%",
                      height:"20%",
                      borderRadius:"8px",
                      marginLeft:"13%",
                      marginTop:"20%",
                      border: "2px solid rgba(0, 0, 0, 0.2)",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      backgroundColor:"#FFFFFF"
                    }}
                    className={styles.text}
                    >
                      프로틴
                    </div>
                    <div style={{
                      height:"60%",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                    }}
                    >
                       <h4 className={styles.text}><span style={{color:"#FF8800"}}>16 </span>건</h4> 
                    </div>
                </div>
                <div style={{height:"90%", width:"33%", marginTop:"2%", alignItems:"center", justifyContent:"center"}}>
                      <div style={{
                      width:"70%",
                      height:"20%",
                      borderRadius:"8px",
                      marginLeft:"13%",
                      marginTop:"20%",
                      border: "2px solid rgba(0, 0, 0, 0.2)",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      backgroundColor:"#FFFFFF"
                    }}
                    className={styles.text}
                    >
                      부스터
                    </div>
                    <div style={{
                      height:"60%",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                    }}
                    >
                       <h4 className={styles.text}><span style={{color:"#FF8800"}}>14 </span>건</h4> 
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div style={{height:"70%", width:"100%", marginTop:"4%"}}>
        <div style={{height:"7%", width:"100%", marginBottom:"2%"}}>
            <div style={{height:"100%", width:"50%"}}><h4 className={styles.text}>나의 리뷰내역</h4></div>
            <div style={{height:"100%", width:"50%"}}></div>
        </div>
        <div style={{height:"6%", width:"100%", marginBottom:"2%", display:"flex"}}>
            <div style={{
              width:"8%",
              height:"100%",
              borderRadius:"8px",
              marginLeft:"2%",
              border: "2px solid rgba(0, 0, 0, 0.2)",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              backgroundColor:"#FFFFFF"
            }}
            className={styles.text}
            >
              BCAA
            </div>
            <div style={{
              width:"8%",
              height:"100%",
              borderRadius:"8px",
              marginLeft:"2%",
              border: "2px solid rgba(0, 0, 0, 0.2)",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              backgroundColor:"#FFFFFF"
            }}
            className={styles.text}
            >
              프로틴
            </div>
            <div style={{
              width:"8%",
              height:"100%",
              borderRadius:"8px",
              marginLeft:"2%",
              border: "2px solid rgba(0, 0, 0, 0.2)",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              backgroundColor:"#FFFFFF"
            }}
            className={styles.text}
            >
              부스터
            </div>
            <div style={{marginLeft:"2%"}}>※ 이미지 및 제품명을 클릭하면, 각 제품 정보 페이지로 이동합니다. </div>
        </div>
        <div className={versusStyle.buttonContainer} style={{justifyContent:"normal"}}>
          <div className={versusStyle.buttonGroup} style={{width:"100%"}}>
            <div  className={versusStyle.pickButtonTwo} style={{marginRight:"3%", display:"block"}}>
              <div style={{height:"10%", width:"100%"}}>sss</div>
              <div style={{height:"90%", width:"100%"}}>sss</div>
            </div>
            <div  className={versusStyle.pickButtonTwo} style={{marginRight:"3%"}}>
            </div>
            <div  className={versusStyle.pickButtonTwo} style={{marginRight:"3%"}}>
            </div>
          </div>
        </div>
      </div>
      <div style={{height:"70%", width:"100%", marginTop:"4%"}}>
        <h3>내정보</h3>
      </div>
      <div>
        <h3>내정보</h3>
      </div>
    </div>
  );
}

export default Mypage;