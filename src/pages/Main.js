import { useEffect,React,useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../style/font.module.css';
import RollingBanner from "./user/common/RollingBanner";
import * as bannerService from "service/admin/banner/bannerService";
import * as boardService from "service/user/boardMngr/boardService";
import { getCodeListByParentIdApi, getCodeNameByIdApi } from "utils/CodeUtil";


function Main() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [boardMainList, setBoardMainList] = useState([]);
  const [boardMainList2, setBoardMainList2] = useState([]);
  const [brandCodeMap, setBrandCodeMap] = useState({});
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const goToTest = () => {
    navigate("/test");
  };

  const clickProtien1 = () => {
    navigate(`/user/board/versus`);
  };

  const clickProtien2 = () => {
    navigate(`/user/board/list`);
  };

  const getBannerList = async  () => {
      bannerService.fetcherBannerList().then((outPutData) => {
      setTableData(outPutData.data)
    })
  };

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

  

  const fallbackImage = process.env.PUBLIC_URL + "/asset/images/BSN 신타6 엣지 1.92kg 초코 (48회분).png";

  const normalizePath = (path) => path.replace(/\\/g, "/");

  const resolveImageUrl = (imgUrl) => {
    if (!imgUrl) return fallbackImage;
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
        return fallbackImage;
      }
    }
  };

  const getMainbaordList = (type) => {
      boardService.fetcherBoardMainList({type:type}).then((outPutData) => {
        if(type =="1"){
          setBoardMainList(outPutData.data);
        }else if(type =="2"){
          setBoardMainList2(outPutData.data);
        }
      })   
  }    

  const handleBoardDetailClick = (boardId) => {
    navigate(`/user/board/detail?boardId=${boardId}`);
  };
  
  useEffect(() => {
    getBannerList()
    getMainbaordList("1")
    getMainbaordList("2")
    loadBrandCodes();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // 이벤트 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 해제
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.margin = "0";
  },[]);


  const proteinImg = process.env.PUBLIC_URL +"/asset/images/protein_19499571.png";
  const protein2Img = process.env.PUBLIC_URL +"/asset/images/interactive_56784531.png";
  return (
    <div className="App" style={{width:"100%",height:"100%"}}>
      <div style={{
        display: "flex",
        flexDirection: windowSize.width > 800 ? "row" : "column",
        gap: windowSize.width > 800 ? "3%" : "1rem",
      }}>
        <div style={{
          backgroundColor:"black"
          ,width: windowSize.width > 800 ? "60%" : "100%"
          ,height: windowSize.width > 800 ? "20rem" : "25rem"
          ,marginRight: windowSize.width > 800 ? "3%" : "0"
          ,display: "flex"
          ,borderRadius:"10px"
          ,position:"relative"
        }}>
          <img style={{zIndex: "999", position: "absolute", top: "2%", left: windowSize.width > 800 ? "30%" : "50%", width: windowSize.width > 800 ? "40%" : "60%", height: "100%", objectFit: "contain", transform: windowSize.width > 800 ? "none" : "translateX(-50%)" }} src={proteinImg} />
          <div style={{width: windowSize.width > 800 ? "50%" : "100%"}}>
            <div style={{height: windowSize.width > 800 ? "9rem" : "auto"}}>
              <div className={styles.text} style={{color:"white", paddingLeft: windowSize.width > 800 ? "8%" : "5%", paddingTop: windowSize.width > 800 ? "5%" : "3%", fontSize: windowSize.width > 800 ? "23px" : "20px"}}>보충제가 고민되나요?</div>
              <div className={styles.text} style={{color:"white", paddingLeft: windowSize.width > 800 ? "8%" : "5%", paddingTop: windowSize.width > 800 ? "5%" : "3%", fontSize: windowSize.width > 800 ? "23px" : "20px"}}>나에게 맞는 <span style={{color:"#FF8282"}}>보충제</span>를 골라보세요</div>
            </div>
            <div style={{height: windowSize.width > 800 ? "9rem" : "auto"}}></div>
          </div>
          <div style={{width: windowSize.width > 800 ? "50%" : "100%",height: windowSize.width > 800 ? "18rem" : "auto"}}> 
            <div style={{width:"100%",height: windowSize.width > 800 ? "9rem" : "1rem"}}></div>
            <div style={{width:"100%",height: windowSize.width > 800 ? "9rem" : "auto"}}>
              <div style={{backgroundColor:"white", width: windowSize.width > 800 ? "40%" : "60%", height:"4.5rem", borderRadius:"10px", marginLeft: windowSize.width > 800 ? "53%" : "auto", marginRight: windowSize.width > 800 ? "0" : "auto", marginTop: windowSize.width > 800 ? "18%" : "5%"}}>
                <div style={{marginLeft:"15%", paddingTop:"7%", cursor:"pointer", textAlign: windowSize.width > 800 ? "left" : "center"}}
                  onClick={(e) => {clickProtien1()}}
                >
                  <div className={styles.text} style={{fontSize: windowSize.width > 800 ? "inherit" : "14px"}}>보충제</div>
                  <div className={styles.text} style={{fontSize: windowSize.width > 800 ? "inherit" : "14px"}}>비교하러 가기 <b>{`>`}</b></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          width: windowSize.width > 800 ? "37%" : "100%"
          ,height: windowSize.width > 800 ? "20rem" : "25rem"
          ,position:"relative"
          ,borderRadius:"10px"
          ,backgroundColor:"#E8AC77"
        }}>
          <img style={{zIndex:"999", position:"absolute", top: windowSize.width > 800 ? "40%" : "20%", left: windowSize.width > 800 ? "7%" : "50%", width: windowSize.width > 800 ? "35%" : "50%", height: windowSize.width > 800 ? "60%" : "auto", objectFit: "contain", transform: windowSize.width > 800 ? "none" : "translateX(-50%)"}} src={protein2Img} />
          <div style={{width:"100%", height: windowSize.width > 800 ? "5rem" : "auto"}}><div className={styles.text} style={{paddingLeft: windowSize.width > 800 ? "8%" : "5%", paddingTop: windowSize.width > 800 ? "4%" : "2%", fontSize: windowSize.width > 800 ? "24px" : "18px", color:"white"}}>BCAA? 프로틴? 부스터?</div></div>
          <div style={{width:"100%", height: windowSize.width > 800 ? "5rem" : "auto"}}><div className={styles.text} style={{paddingLeft: windowSize.width > 800 ? "8%" : "5%", fontSize: windowSize.width > 800 ? "24px" : "18px", color:"white"}}><span style={{color:"#FF0000"}}>뭘</span> 먹어야 할까?</div></div>
          <div style={{width:"100%", height: windowSize.width > 800 ? "10rem" : "auto"}}>
            <div style={{backgroundColor:"white", width: windowSize.width > 800 ? "35%" : "60%", height:"4.5rem", borderRadius:"10px", marginLeft: windowSize.width > 800 ? "60%" : "auto", marginRight: windowSize.width > 800 ? "0" : "auto", marginTop: windowSize.width > 800 ? "11%" : "2%"}}>
              <div style={{marginLeft:"15%", paddingTop:"7%", cursor:"pointer", textAlign: windowSize.width > 800 ? "left" : "center"}}
                onClick={(e) => {clickProtien2()}}
              >
                <div className={styles.text} style={{fontSize: windowSize.width > 800 ? "inherit" : "14px"}}>보충제</div>
                <div className={styles.text} style={{fontSize: windowSize.width > 800 ? "inherit" : "14px"}}>보러가기 <b>{`>`}</b></div>
              </div>
            </div>  
          </div>   
        </div>
      </div>
      {/* 배너 */}
      <div
        style={{
          width: "100%",
          minHeight: "12rem",
          borderRadius: "10px",
          backgroundColor: "#D9D9D9",
          marginBottom: "2%",
          marginTop: "2%",
        }}
      >
        <RollingBanner items={tableData} />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* 평점 최고 프로틴 */}
        <div>
          <div className={styles.text} style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            다수의 선택! 평점 최고 프로틴
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1%",
              justifyContent: "flex-start",
            }}
          >
            {boardMainList.map((tdata, index) => (
              <div
                key={index}
                style={{
                  flex: "1 1 18%",
                  minWidth: "12rem",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={resolveImageUrl(tdata.imgUrl)}
                  alt={tdata.boardName}
                  style={{ objectFit: "contain", width: "100%", height: "12rem", cursor:"pointer" }}
                  onClick={(e) => {e.stopPropagation(); handleBoardDetailClick(tdata.boardId)}}
                />
                <div className={styles.text} style={{ textAlign: "center" }}>
                  {tdata.boardName}
                </div>
                <div style={{ textAlign: "center" }}>{brandCodeMap[tdata.brandCodeId]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 신상 보충제 */}
        <div>
          <div className={styles.text} style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            따끈따끈 신상 보충제
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1%",
              justifyContent: "flex-start",
            }}
          >
            {boardMainList2.map((tdata, index) => (
              <div
                key={index}
                style={{
                  flex: "1 1 18%",
                  minWidth: "12rem",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={resolveImageUrl(tdata.imgUrl)}
                  alt={tdata.boardName}
                  style={{ objectFit: "contain", width: "100%", height: "12rem", cursor:"pointer" }}
                  onClick={(e) => {e.stopPropagation(); handleBoardDetailClick(tdata.boardId)}}
                />
                <div className={styles.text} style={{ textAlign: "center" }}>
                  {tdata.boardName}
                </div>
                <div style={{ textAlign: "center" }}>{brandCodeMap[tdata.brandCodeId]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 뉴스레터 div */}
      <div style={{
        width:"100%",
        height:"4rem",
        marginTop:"3%",
      }}>
        
      </div>
      {/* 뉴스레터 div */}
    </div>
  );
}

export default Main;