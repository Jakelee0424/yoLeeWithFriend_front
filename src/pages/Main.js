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

  useEffect(() => {
    document.body.style.margin = "0";
  },[]);

  const goToTest = () => {
    navigate("/test");
  };

  const clickProtien1 = () => {
    navigate(`/board/versus`);
  };

  const clickProtien2 = () => {
    navigate(`/board/detail`);
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
  
  useEffect(() => {
    getBannerList()
    getMainbaordList("1")
    getMainbaordList("2")
    loadBrandCodes();
  }, []);


  const protienImg = process.env.PUBLIC_URL +"/asset/images/protein_19499571.png";
  const protien2Img = process.env.PUBLIC_URL +"/asset/images/interactive_56784531.png";
  return (
    <div className="App" style={{width:"100%",height:"100%"}}>
      <div style={{
        display:"flex"
      }}>
        <div style={{
          backgroundColor:"black"
          ,width:"60%"
          ,height:"20rem"
          ,marginRight:"3%"
          ,display:"flex"
          ,borderRadius:"10px"
          ,position:"relative"
        }}>
          <img style={{zIndex:"999", position:"absolute", top:"2%", left:"30%", width:"40%", height:"100%" }} src={protienImg} />
          <div style={{width:"50%",height:"9rem"}}>
            <div style={{width:"100%",height:"9rem"}}>
              <div className={styles.text} style={{color:"white", paddingLeft:"8%", paddingTop:"5%", fontSize:"24px"}}>보충제가고민되나요?</div>
              <div className={styles.text} style={{color:"white", paddingLeft:"8%", paddingTop:"5%", fontSize:"24px"}}>나에게 맞는 <span style={{color:"#FF8282"}}>보충제</span>를 골라보세요</div>
            </div>
            <div style={{width:"100%",height:"9rem"}}></div>
          </div>
          <div style={{width:"50%",height:"18rem"}}> 
            <div style={{width:"100%",height:"9rem"}}></div>
            <div style={{width:"100%",height:"9rem"}}>
              <div style={{backgroundColor:"white", width:"40%", height:"4.5rem", borderRadius:"10px", marginLeft: "53%", marginTop:"18%"}}>
                <div style={{marginLeft:"15%", paddingTop:"7%", cursor:"pointer"}}
                  onClick={(e) => {clickProtien1()}}
                >
                  <div className={styles.text}>보충제</div>
                  <div className={styles.text}>비교하러 가기 <b>{`>`}</b></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          width:"37%"
          ,height:"20rem"
          ,position:"relative"
          ,borderRadius:"10px"
          ,backgroundColor:"#E8AC77"
        }}>
          <img style={{zIndex:"999", position:"absolute", top:"40%", left:"7%", width:"35%", height:"60%" }} src={protien2Img} />
          <div style={{width:"100%", height:"5rem"}}><div className={styles.text} style={{paddingLeft:"8%", paddingTop:"4%", fontSize:"24px", color:"white"}}>BCAA? 프로틴? 부스터?</div></div>
          <div style={{width:"100%", height:"5rem"}}><div className={styles.text} style={{paddingLeft:"8%", fontSize:"24px", color:"white"}}><span style={{color:"#FF0000"}}>뭘</span> 먹어야 할까?</div></div>
          <div style={{width:"100%", height:"10rem"}}>
            <div style={{backgroundColor:"white", width:"35%", height:"4.5rem", borderRadius:"10px", marginLeft: "60%", marginTop:"11%"}}>
              <div style={{marginLeft:"15%", paddingTop:"7%", cursor:"pointer"}}
                onClick={(e) => {clickProtien2()}}
              >
                <div className={styles.text}>보충제</div>
                <div className={styles.text}>보러가기 <b>{`>`}</b></div>
              </div>
            </div>  
          </div>   
        </div>
      </div>
      <div style={{
        width:"100%",
        height:"13rem",
        marginTop:"3%",
        backgroundColor:"#D9D9D9"
        ,borderRadius:"10px"
      }}>
        <RollingBanner items={tableData} />
      </div>
      <div style={{
        width:"100%",
        height:"40rem",
        marginTop:"3%"
      }}>
        <div style={{width:"100%", height:"20rem"}}>
          <div style={{width:"100%", height:"3rem"}}> 
              <div className={styles.text}>다수의 선택! 평점 최고 프로틴</div>
          </div>
          <div style={{width:"100%", height:"17rem"}}>
              <div style={{width:"100%", height:"17rem", paddingLeft:"4%", paddingRight:"4%", display:"flex"}}>
                {boardMainList.map((tdata, index) => (
                  <div key={index} style={{width:"18%", height:"17rem", marginRight:"2%"}}>
                    <div style={{width:"100%", height:"12rem"}}>
                      <img
                        src={`${resolveImageUrl(tdata.imgUrl)}`}
                        style={{objectFit:"contain", width:"100%", height:"12rem"}}
                      />
                    </div>
                    <div className={styles.text} style={{height:"3rem", textAlign:"center"}}>
                        {tdata.boardName}
                    </div>
                    <div style={{height:"2rem", textAlign:"center"}}>
                        {brandCodeMap[tdata.brandCodeId]}
                    </div>
                  </div>
                ))}  
              </div>
          </div>
        </div>
        <div style={{width:"100%", height:"20rem"}}>
          <div style={{width:"100%", height:"3rem"}}> 
              <div className={styles.text}>따끈따끈 신상 보충제</div>
          </div>
          <div style={{width:"100%", height:"17rem"}}>
              <div style={{width:"100%", height:"17rem", paddingLeft:"4%", paddingRight:"4%", display:"flex"}}>
                {boardMainList2.map((tdata, index) => (
                  <div key={index} style={{width:"18%", height:"17rem", marginRight:"2%"}}>
                    <div style={{width:"100%", height:"12rem"}}>
                      <img
                        src={`${resolveImageUrl(tdata.imgUrl)}`}
                        style={{objectFit:"contain", width:"100%", height:"12rem"}}
                      />
                    </div>
                    <div className={styles.text} style={{height:"3rem", textAlign:"center"}}>
                        {tdata.boardName}
                    </div>
                    <div style={{height:"2rem", textAlign:"center"}}>
                       {brandCodeMap[tdata.brandCodeId]}
                    </div>
                  </div>
                ))}  
              </div>
          </div>
        </div>
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