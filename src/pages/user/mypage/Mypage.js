import { useEffect,React,useState } from "react";
import { Input } from "reactstrap";
import styles from '../../../style/font.module.css';
import versusStyle from "style/versus.module.css";
import boardDetailstyles from "style/boardDetail.module.css";

function Mypage() {

  const profileImg = process.env.PUBLIC_URL+"/asset/images/profileImg.png";
  const profileImg2 = process.env.PUBLIC_URL+"/asset/images/BSN 신타6 엣지 1.92kg 초코 (48회분).png";
  const renderStars = (score) => {
    if (!score) return "평가 없음";
    const rounded = Math.round(score); // 소수점 반올림
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  };
  return (
    <div className="App" style={{width:"100%", height:"100vh"}}>
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
      <div style={{height:"80%", width:"100%", marginTop:"4%"}}>
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
        <div className={versusStyle.buttonContainer} style={{justifyContent:"normal", height:"87%"}}>
          <div className={versusStyle.buttonGroup} style={{width:"100%"}}>
            {/* ..... */}
            <div  className={versusStyle.pickButtonTwo} style={{marginRight:"3%", display:"block"}}>
              <div style={{height:"10%", width:"100%", marginLeft:"5%", display:"flex", alignItems:"center", font:"caption"}}>리뷰등록일: 2025.05.05</div>
              <div style={{height:"45%", width:"100%"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <img src={profileImg2} style={{width:"50%"}}/>
                </div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <span className={styles.text}>aaa</span>
                    <span style={{font:"caption"}}>aaa</span>
                  </div>
                </div>
              </div>
              <div style={{height:"15%", width:"100%", marginLeft:"7%", marginTop:"5%"}}>
                <div className={boardDetailstyles.ratingSection}>
                  <div className={boardDetailstyles.ratingItem}>
                    <h4 className={`${boardDetailstyles.sectionTitle} ${styles.text}`} >맛</h4>
                    <span className={boardDetailstyles.ratingValue2}>
                      &nbsp;{renderStars(3)} 
                    </span>
                  </div>
                  <div className={boardDetailstyles.ratingItem}>
                    <h4 className={`${boardDetailstyles.sectionTitle} ${styles.text}`}>가격</h4>
                    <span className={boardDetailstyles.ratingValue2}>
                      &nbsp;{renderStars(3)}  
                    </span>
                  </div>
                </div>
                <div className={boardDetailstyles.ratingSection} style={{marginTop:"2%"}}>
                  <div className={boardDetailstyles.ratingItem}>
                    <h4 className={`${boardDetailstyles.sectionTitle} ${styles.text}`}>성분</h4>
                    <span className={boardDetailstyles.ratingValue2}>
                      &nbsp;{renderStars(3)}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{height:"20%", width:"100%", display:"flex", justifyContent:"center"}}>
                <textarea
                  className={boardDetailstyles.textarea2}
                  placeholder="이 보충제에 대한 한줄평을 작성해보세요!"
                />
              </div>
              <div style={{height:"10%", width:"100%", display:"flex", justifyContent:"center"}}>
                <div style={{
                  width:"30%",
                  height:"50%",
                  borderRadius:"8px",
                  border: "2px solid rgba(0, 0, 0, 0.2)",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  backgroundColor:"#8E8E93",
                  color:"#FFFFFF",
                  font:"caption"
                }}
                >
                  수정하기
                </div>
                <div style={{
                  width:"30%",
                  height:"50%",
                  borderRadius:"8px",
                  marginLeft:"6%",
                  border: "2px solid rgba(0, 0, 0, 0.2)",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  backgroundColor:"#000000",
                  color:"#FFFFFF",
                  font:"caption"
                }}
                >
                  삭제하기
                </div>
              </div>
            </div>
            {/* ..... */}
            <div  className={versusStyle.pickButtonTwo} style={{marginRight:"3%", display:"block"}}>
              <div style={{height:"10%", width:"100%", marginLeft:"5%", display:"flex", alignItems:"center", font:"caption"}}>리뷰등록일: 2025.05.05</div>
              <div style={{height:"45%", width:"100%"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <img src={profileImg2} style={{width:"50%"}}/>
                </div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <span className={styles.text}>aaa</span>
                    <span style={{font:"caption"}}>aaa</span>
                  </div>
                </div>
              </div>
              <div style={{height:"15%", width:"100%", marginLeft:"7%", marginTop:"5%"}}>
                <div className={boardDetailstyles.ratingSection}>
                  <div className={boardDetailstyles.ratingItem}>
                    <h4 className={`${boardDetailstyles.sectionTitle} ${styles.text}`} >맛</h4>
                    <span className={boardDetailstyles.ratingValue2}>
                      &nbsp;{renderStars(3)} 
                    </span>
                  </div>
                  <div className={boardDetailstyles.ratingItem}>
                    <h4 className={`${boardDetailstyles.sectionTitle} ${styles.text}`}>가격</h4>
                    <span className={boardDetailstyles.ratingValue2}>
                      &nbsp;{renderStars(3)}  
                    </span>
                  </div>
                </div>
                <div className={boardDetailstyles.ratingSection} style={{marginTop:"2%"}}>
                  <div className={boardDetailstyles.ratingItem}>
                    <h4 className={`${boardDetailstyles.sectionTitle} ${styles.text}`}>성분</h4>
                    <span className={boardDetailstyles.ratingValue2}>
                      &nbsp;{renderStars(3)}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{height:"20%", width:"100%", display:"flex", justifyContent:"center"}}>
                <textarea
                  className={boardDetailstyles.textarea2}
                  placeholder="이 보충제에 대한 한줄평을 작성해보세요!"
                />
              </div>
              <div style={{height:"10%", width:"100%", display:"flex", justifyContent:"center"}}>
                <div style={{
                  width:"30%",
                  height:"50%",
                  borderRadius:"8px",
                  border: "2px solid rgba(0, 0, 0, 0.2)",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  backgroundColor:"#8E8E93",
                  color:"#FFFFFF",
                  font:"caption"
                }}
                >
                  수정하기
                </div>
                <div style={{
                  width:"30%",
                  height:"50%",
                  borderRadius:"8px",
                  marginLeft:"6%",
                  border: "2px solid rgba(0, 0, 0, 0.2)",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  backgroundColor:"#000000",
                  color:"#FFFFFF",
                  font:"caption"
                }}
                >
                  삭제하기
                </div>
              </div>
            </div>
            {/* ..... */}
            <div  className={versusStyle.pickButtonTwo} style={{marginRight:"3%", display:"block"}}>
              <div style={{height:"10%", width:"100%", marginLeft:"5%", display:"flex", alignItems:"center", font:"caption"}}>리뷰등록일: 2025.05.05</div>
              <div style={{height:"45%", width:"100%"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <img src={profileImg2} style={{width:"50%"}}/>
                </div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <span className={styles.text}>aaa</span>
                    <span style={{font:"caption"}}>aaa</span>
                  </div>
                </div>
              </div>
              <div style={{height:"15%", width:"100%", marginLeft:"7%", marginTop:"5%"}}>
                <div className={boardDetailstyles.ratingSection}>
                  <div className={boardDetailstyles.ratingItem}>
                    <h4 className={`${boardDetailstyles.sectionTitle} ${styles.text}`} >맛</h4>
                    <span className={boardDetailstyles.ratingValue2}>
                      &nbsp;{renderStars(3)} 
                    </span>
                  </div>
                  <div className={boardDetailstyles.ratingItem}>
                    <h4 className={`${boardDetailstyles.sectionTitle} ${styles.text}`}>가격</h4>
                    <span className={boardDetailstyles.ratingValue2}>
                      &nbsp;{renderStars(3)}  
                    </span>
                  </div>
                </div>
                <div className={boardDetailstyles.ratingSection} style={{marginTop:"2%"}}>
                  <div className={boardDetailstyles.ratingItem}>
                    <h4 className={`${boardDetailstyles.sectionTitle} ${styles.text}`}>성분</h4>
                    <span className={boardDetailstyles.ratingValue2}>
                      &nbsp;{renderStars(3)}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{height:"20%", width:"100%", display:"flex", justifyContent:"center"}}>
                <textarea
                  className={boardDetailstyles.textarea2}
                  placeholder="이 보충제에 대한 한줄평을 작성해보세요!"
                />
              </div>
              <div style={{height:"10%", width:"100%", display:"flex", justifyContent:"center"}}>
                <div style={{
                  width:"30%",
                  height:"50%",
                  borderRadius:"8px",
                  border: "2px solid rgba(0, 0, 0, 0.2)",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  backgroundColor:"#8E8E93",
                  color:"#FFFFFF",
                  font:"caption"
                }}
                >
                  수정하기
                </div>
                <div style={{
                  width:"30%",
                  height:"50%",
                  borderRadius:"8px",
                  marginLeft:"6%",
                  border: "2px solid rgba(0, 0, 0, 0.2)",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  backgroundColor:"#000000",
                  color:"#FFFFFF",
                  font:"caption"
                }}
                >
                  삭제하기
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{height:"60%", width:"100%", marginTop:"6%"}}>
        <div style={{height:"7%", width:"100%", marginBottom:"2%"}}>
            <div style={{height:"100%", width:"50%"}}><h4 className={styles.text}>최근 본 상품</h4></div>
            <div style={{height:"100%", width:"50%"}}></div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1%",
              justifyContent: "flex-start",
            }}
          >
            {/* ..... */}
              <div
                style={{
                  flex: "1 1 18%",
                  minWidth: "12rem",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={profileImg2}
                  alt={"sssss"}
                  style={{ objectFit: "contain", width: "100%", height: "12rem", cursor:"pointer" }}
                />
                <div className={styles.text} style={{ textAlign: "center" }}>
                  sssssss
                </div>
                <div style={{ textAlign: "center" }}>{"ssssss"}</div>
              </div>
              {/* ..... */}
              <div
                style={{
                  flex: "1 1 18%",
                  minWidth: "12rem",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={profileImg2}
                  alt={"sssss"}
                  style={{ objectFit: "contain", width: "100%", height: "12rem", cursor:"pointer" }}
                />
                <div className={styles.text} style={{ textAlign: "center" }}>
                  sssssss
                </div>
                <div style={{ textAlign: "center" }}>{"ssssss"}</div>
              </div>
              {/* ..... */}
              <div
                style={{
                  flex: "1 1 18%",
                  minWidth: "12rem",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={profileImg2}
                  alt={"sssss"}
                  style={{ objectFit: "contain", width: "100%", height: "12rem", cursor:"pointer" }}
                />
                <div className={styles.text} style={{ textAlign: "center" }}>
                  sssssss
                </div>
                <div style={{ textAlign: "center" }}>{"ssssss"}</div>
              </div>
              {/* ..... */}
              <div
                style={{
                  flex: "1 1 18%",
                  minWidth: "12rem",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={profileImg2}
                  alt={"sssss"}
                  style={{ objectFit: "contain", width: "100%", height: "12rem", cursor:"pointer" }}
                />
                <div className={styles.text} style={{ textAlign: "center" }}>
                  sssssss
                </div>
                <div style={{ textAlign: "center" }}>{"ssssss"}</div>
              </div>
              {/* ..... */}
              <div
                style={{
                  flex: "1 1 18%",
                  minWidth: "12rem",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={profileImg2}
                  alt={"sssss"}
                  style={{ objectFit: "contain", width: "100%", height: "12rem", cursor:"pointer" }}
                />
                <div className={styles.text} style={{ textAlign: "center" }}>
                  sssssss
                </div>
                <div style={{ textAlign: "center" }}>{"ssssss"}</div>
              </div>
          </div>
        </div>
      </div>
    <div style={{fontSize:"10px", marginBottom:"3%"}}>! 서비스 <a style={{cursor:"pointer"}} onClick={() => alert("탈퇴!")}>탈퇴</a>를 원하시는 경우, 탈퇴를 클릭하세요. (탈퇴 시, 모든 데이터는 삭제처리되며 복구할 수 없습니다.)</div>
    </div>
    
  );
}

export default Mypage;