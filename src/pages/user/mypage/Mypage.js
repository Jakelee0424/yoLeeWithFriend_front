import { useEffect,React,useState, useRef } from "react";
import { Input } from "reactstrap";
import styles from '../../../style/font.module.css';
import versusStyle from "style/versus.module.css";
import boardDetailstyles from "style/boardDetail.module.css";
import { useSelector, useDispatch  } from "react-redux";
import * as userService from "service/user/user/userService";
import * as logService from "service/user/logs/logsService";
import dayjs from 'dayjs';
import * as boardService from "service/user/boardMngr/boardService";
import { getCodeListByParentIdApi, getCodeNameByIdApi } from "utils/CodeUtil";
import { useNavigate } from "react-router-dom";

function Mypage() {
  const dispatch = useDispatch();
  const profileImg = process.env.PUBLIC_URL+"/asset/images/profileImg.png";
  const profileImg2 = process.env.PUBLIC_URL+"/asset/images/BSN 신타6 엣지 1.92kg 초코 (48회분).png";
  const editImg = process.env.PUBLIC_URL+"/asset/images/Edit.png";
  let reduxUserInfo = useSelector((state) => state.login);

  const [getProfileImg, setProfileImg] = useState(reduxUserInfo.profilePath ? reduxUserInfo.profilePath : profileImg);
  const [getfileImg, setfileImg] = useState("");
  const fileInput = useRef(null);
  const [formData, setFormData] = useState({}); // 초기값 빈 객체
  const [countData, setCountData] = useState({
    totalCount: { value: 0 },
    proteinCount: { value: 0 },
    bosterCount: { value: 0 },
    bcaaCount: { value: 0 }
  });
  const [commentList, setCommentList] = useState([]); // 초기값 빈 객체
  const [brandCodeMap, setBrandCodeMap] = useState({});
  const [boardCategory, setBoardCategory] = useState("boardCategory02");
  const navigate = useNavigate();

  const StarSelector = ({ value, onChange }) => {
  
  return (
    <div className={boardDetailstyles.starSelector}>
      {[1, 2, 3, 4, 5].map((v) => (
        <span
          key={v}
          className={v <= value ? boardDetailstyles.filledStar2 : boardDetailstyles.emptyStar}
          onClick={() => onChange(v)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// 컴포넌트 내부
const [ratings, setRatings] = useState([
  { taste: 0, price: 0, ingredient: 0 },
  { taste: 0, price: 0, ingredient: 0 },
  { taste: 0, price: 0, ingredient: 0 }
]);

const updateRating = (index, type, value) => {
  setRatings(prev => prev.map((rating, i) => 
    i === index ? { ...rating, [type]: value } : rating
  ));
};

  const renderStars = (score) => {
    if (!score) return "평가 없음";
    const rounded = Math.round(score); // 소수점 반올림
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  };

 
  const changeProfileImage = async (e) =>{
    const reader = new FileReader();
    reader.onload = () => {
        if(reader.readyState === 2){
            setProfileImg(reader.result)
        }
    }
    reader.readAsDataURL(e.target.files[0]);
    setfileImg(e.target.files[0]);

    const formFileData = new FormData();
    formFileData.append('multipartFile', e.target.files[0]); // formData에 파일 추가
    formFileData.append('data', JSON.stringify({id: reduxUserInfo.id}));

    userService.fetcherUserChangeProfileImg(formFileData).then((outPutData) => {
      dispatch({
        type: "changeNickName",  // 액션 타입은 실제 사용하는 것으로 변경
        payload: {
          ...reduxUserInfo,
          id: reduxUserInfo.id,
          profilePath: outPutData.data.profilePath
        }
      });
    })  

 }

 const changeNickName = async (e) =>{
  
  if (window.confirm("닉네임을 수정하시겠습니까?")) { 
      const inputData ={
        id: reduxUserInfo.id,
        nickName: formData.nickName.value
      };
      
      userService.fetcherUserChangeNickName(inputData).then((outPutData) => {
        if(outPutData.result === "SUCCESS"){
          alert("완료되었습니다.");
        }
      })  
      
      dispatch({
        type: "changeNickName",  // 액션 타입은 실제 사용하는 것으로 변경
        payload: {
          ...reduxUserInfo,
          id: reduxUserInfo.id,
          nickName: formData.nickName.value
        }
      });

      //window.location.reload();
  }
 
 }

 const reSetProfileImage = async (e) =>{

    setProfileImg(null)
    setfileImg(null);

    const formFileData = new FormData();
    formFileData.append('multipartFile',null); // formData에 파일 추가
    formFileData.append('data', JSON.stringify({id: reduxUserInfo.id}));
    userService.fetcherUserChangeProfileImg(formFileData).then((outPutData) => {
    })  
    //window.location.reload();
 }



 const normalizePath = (path) => path.replace(/\\/g, "/");


 const resolveImageUrl = (imgUrl) => {
    if (!imgUrl) return profileImg;
    const normalized = normalizePath(imgUrl);
    const publicIndex = normalized.indexOf("public");
    if (publicIndex !== -1) {
      const relativePath = normalized.slice(publicIndex + "public".length);
      return process.env.PUBLIC_URL + relativePath;
    } else {
      const imgIndex = normalized.indexOf("/img");
      if (imgIndex !== -1) {
        const relativeImgPath = normalized.slice(imgIndex);
        return `${relativeImgPath}`;
      } else if (normalized.startsWith("blob:") || normalized.startsWith("data:")) {
        return normalized;
      } else {
        return profileImg;
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],   // 혹시 모를 다른 필드 유지
        value: value          // value 필드만 업데이트
      }
    }));
  };

  const getCommnetCount = async () =>{
      const data = { userId: reduxUserInfo.id };
      const commentCountRes = await boardService
        .fetcherGetBoardCommentCountByUserId(JSON.stringify(data))
        .then((result) => result.data);
      setCountData({
        totalCount: { value: commentCountRes.totalCount ?? 0 },  // 구조 수정,
        proteinCount: { value: commentCountRes.proteinCount ?? 0},
        bosterCount: { value: commentCountRes.bosterCount ?? 0},
        bcaaCount: { value: commentCountRes.bcaaCount ?? 0}
      });

  }

  const getCommnet = async () =>{
      const data = { userId: reduxUserInfo.id };
      const commentListRes = await boardService
        .fetcherGetBoardCommentByUserId(JSON.stringify(data))
        .then((result) => result.data);
      console.log(commentListRes)
      setCommentList(commentListRes)


  }

  const loadBrandCodes = async () => {
    try {
      const codes = await getCodeListByParentIdApi("boardBrand"); // 상위 코드 ID
      const codeMap = {};
      codes.forEach(code => {
        codeMap[code.id] = code.name;
      });
      setBrandCodeMap(codeMap);
    } catch (e) {
      console.error("브랜드 코드 로딩 실패", e);
    }
  };

  const selectBoardCategory =(boardCategory)=>{
    setBoardCategory(boardCategory)
  }

  const goBoardDetail = (boardId) =>{
    navigate(`/user/board/detail?boardId=${boardId}`);
  }

  const getBoardList = async () => {
    const boardList = await logService
        .fetcherLogBoard(JSON.stringify(data))
        .then((result) => result.data);
  }

  useEffect(() => {
    setFormData({
      nickName: { value: reduxUserInfo.nickName },  // 구조 수정,
      oauthType: { value: reduxUserInfo.oauthType },
      regDt: { value: reduxUserInfo.regDt }
    });
    getCommnetCount();
    getCommnet();
    loadBrandCodes();
  }, []);
 


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
              justifyContent: "space-between",
              alignItems: "center" ,
              cursor:"pointer"   
            }}
              onClick={()=>{fileInput.current.click()}}
            >
              <img src={resolveImageUrl(getProfileImg)} style={{width:"130px", height:"130px", borderRadius :"50%", overflow:"hidden", marginLeft:"10%"}}/>
              <input accept="image/*" type="file" hidden value={""}  ref={fileInput}  onChange={changeProfileImage}/>
              <div style={{
                      width:"15%",
                      height:"20%",
                      borderRadius:"8px",
                      border: "2px solid rgba(0, 0, 0, 0.2)",
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center",
                      backgroundColor:"#FFFFFF",
                      marginRight:"2%",
                      marginBottom:"15%"
                    }}
                    className={styles.text}
                    onClick={(e) => {
                      e.stopPropagation();  // 이벤트 전파 중단
                      reSetProfileImage();
                    }}
                    >사진 초기화</div>
            </div>
            <div style={{height:"50%", width:"100%"}}>
              <div style={{height:"33%", width:"100%", display:"flex"}}>
                <div style={{height:"90%", width:"25%", display:"flex", alignItems: "center", marginLeft:"15%"}} >
                  <h5>닉네임</h5>
                </div>
                <div style={{height:"90%", width:"50%", marginLeft:"3%", marginRight:"8%", display:"flex"}} >
                  <Input
                    type="text"
                    name="nickName"
                    value={formData.nickName?.value ?? ""}
                    onChange={handleChange}
                  />
                  <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginLeft:"3%"}}>
                    <img src={editImg} style={{cursor:"pointer"}} onClick={(e) => {
                      e.stopPropagation();  // 이벤트 전파 중단
                      changeNickName();
                    }} />
                  </div>
                </div>
              </div>
              <div style={{height:"33%", width:"100%", display:"flex"}}>
                <div style={{height:"90%", width:"25%", display:"flex", alignItems: "center", marginLeft:"15%"}} >
                  <h5>연동 플랫폼</h5>
                </div>
                <div style={{height:"90%", width:"50%", marginLeft:"3%", marginRight:"8%", display:"flex", alignItems: "center" }} >
                  {formData.oauthType?.value =="naver" ? "네이버 로그인" : "카카오 로그인"}
                </div>
              </div>
              <div style={{height:"33%", width:"100%", display:"flex"}}>
                <div style={{height:"90%", width:"25%", display:"flex", alignItems: "center", marginLeft:"15%"}} >
                  <h5>가입일</h5>
                </div>
                <div style={{height:"90%", width:"50%", marginLeft:"3%", marginRight:"8%", display:"flex", alignItems: "center" }} >
                  {dayjs(formData.regDt?.value ?? "").format('YYYY-MM-DD')}
                </div>
              </div>
            </div>
          </div>
          <div style={{height:"100%", width:"45%", marginLeft:"5%"}}>
              <div style={{height:"20%", width:"100%", border:"0.1px solid black", borderRadius:"10px", display:"flex", alignItems: "center", justifyContent:"center"}}>
                <h4 className={styles.text}>
                  나의 리뷰 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"#FF8800"}}>{countData.totalCount.value} </span>건 
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
                       <h4 className={styles.text}><span style={{color:"#FF8800"}}>{countData.bcaaCount.value} </span>건</h4> 
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
                       <h4 className={styles.text}><span style={{color:"#FF8800"}}>{countData.proteinCount.value} </span>건</h4> 
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
                       <h4 className={styles.text}><span style={{color:"#FF8800"}}>{countData.bosterCount.value} </span>건</h4> 
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
              backgroundColor: boardCategory == "boardCategory02" ?  "rgb(217, 217, 217)" : "#FFFFFF"
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
              backgroundColor: boardCategory == "boardCategory01" ?  "rgb(217, 217, 217)" : "#FFFFFF"
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
              backgroundColor: boardCategory == "boardCategory03" ?  "rgb(217, 217, 217)" : "#FFFFFF"
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
            {commentList.map((tdata, index) => (
              <div key={tdata.commentId} className={versusStyle.pickButtonTwo} style={{marginRight:"3%", display:"block"}}>
                <div style={{height:"10%", width:"100%", marginLeft:"5%", display:"flex", alignItems:"center", font:"caption"}}>리뷰등록일: {dayjs(tdata.regDt).format('YYYY-MM-DD')}</div>
                <div style={{height:"45%", width:"100%"}} onClick={() => goBoardDetail(tdata.boardId)}>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <img src={profileImg2} style={{width:"50%"}}/>
                  </div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                      <span className={styles.text}>{tdata.board.boardName}</span>
                      <span style={{font:"caption"}}>{brandCodeMap[tdata.board.brandCodeId]}</span>
                    </div>
                  </div>
                </div>
                <div style={{height:"15%", width:"100%", marginLeft:"7%", marginTop:"5%"}}>
                  <div className={boardDetailstyles.ratingSection}>
                    <div className={boardDetailstyles.ratingItem}>
                      <h4 className={`${boardDetailstyles.sectionTitle} ${styles.text}`} >맛</h4>
                      <StarSelector 
                        value={tdata.tasteRate} 
                        onChange={(v) => updateRating(index, 'taste', v)}
                      />
                    </div>
                    <div className={boardDetailstyles.ratingItem}>
                      <h4 className={`${boardDetailstyles.sectionTitle} ${styles.text}`}>가격</h4>
                       <StarSelector 
                          value={tdata.priceRate} 
                          onChange={(v) => updateRating(index, 'price', v)}
                        />
                    </div>
                  </div>
                  <div className={boardDetailstyles.ratingSection} style={{marginTop:"2%"}}>
                    <div className={boardDetailstyles.ratingItem}>
                      <h4 className={`${boardDetailstyles.sectionTitle} ${styles.text}`}>성분</h4>
                      <StarSelector 
                        value={tdata.ingredientRate} 
                        onChange={(v) => updateRating(index, 'ingredient', v)}
                      />
                    </div>
                  </div>
                </div>
                <div style={{height:"20%", width:"100%", display:"flex", justifyContent:"center"}}>
                  <textarea
                    className={boardDetailstyles.textarea2}
                    placeholder="이 보충제에 대한 한줄평을 작성해보세요!"
                    value={tdata.content}
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
            ))}               
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