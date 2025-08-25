import { useEffect,React,useState, useRef } from "react";
import { getCodeListByParentIdApi, getCodeNameByIdApi } from "utils/CodeUtil";
import styles from '../../../../style/font.module.css';
import * as boardService from "service/user/boardMngr/boardService";
import { useNavigate } from "react-router-dom";

function BoardList() {

  const [boardCategoryList, setBoardCategoryList] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [selectCategory, setSelectCategory] = useState(0);
  const [nuInfoCodeMap, setNuInfoCodeMap] = useState({});
  const [brandCodeMap, setBrandCodeMap] = useState({});
  const navigate = useNavigate(); 



  const protienImg = process.env.PUBLIC_URL +"/asset/images/Group 44.png";
  const protien2Img = process.env.PUBLIC_URL +"/asset/images/recommend_5126118 1.png";

  const loadCategoryCodes = async () => {
    try {
      const codes = await getCodeListByParentIdApi("boardCategory"); // 상위 코드 ID
      setBoardCategoryList(codes);
      console.log(codes)
    } catch (e) {
      console.error("카테고리 코드 로딩 실패", e);
    }
  };

  const loadRandomBoards = async () => {
    try {
      let type = "boardCategory01";
      switch (selectCategory) {
        case 0:
          type = "boardCategory01";
          break;

        case 1:
          type = "boardCategory02";
          break;

        case 2:
          type = "boardCategory03";
          break;  
      }
      boardService.fetcherBoardRandomList({type:type}).then((outPutData) => {
        console.log(outPutData)
        setBoardList(outPutData.data);
      })  
    } catch (e) {
      console.error("카테고리 코드 로딩 실패", e);
    }
  };

  const clickCategory = async (index) => {
    setSelectCategory(index);
    console.log(selectCategory)
  }

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

  const loadNuinfoCodes = async () => {
    try {
      const codes = await getCodeListByParentIdApi("nutritionInformation01"); // 상위 코드 ID
      const codeMap = {};
      codes.forEach(code => {
        codeMap[code.id] = code.name;
      });
      setNuInfoCodeMap(codeMap);
    } catch (e) {
      console.error("브랜드 코드 로딩 실패", e);
    }
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

  const clickView = (boardId) => {
    navigate(`/user/board/view?boardId=${boardId}`);
  };

  useEffect(() => {
    loadCategoryCodes();
    loadNuinfoCodes();
    loadBrandCodes();
  }, []);

  useEffect(() => {
    loadRandomBoards();
  }, [selectCategory]);



  return (
    <div className="App" style={{width:"100%",height:"100%"}}>
      <div style={{
        width:"100%",
        height:"5rem",
        display:"flex",
        alignItems:"center"
      }}>
        {boardCategoryList.map((tdata, index) => (
          <div style={{
            width:"8%",
            height:"50%",
            marginLeft:"2%",
            borderRadius:"8px",
            border: "2px solid rgba(0, 0, 0, 0.2)",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            backgroundColor: selectCategory === index ? "#D9D9D9" : "#FFFFFF"
          }}
          key={index}
          >
            <div className={styles.text}
            style={{
              cursor:"pointer",
              
            }}
            onClick={(e) => {clickCategory(index)}}
            >
              {tdata.name}
            </div>
          </div>
        ))}   
      </div>
      <div style={{
        width:"100%",
        height:"10rem",
        marginTop:"1%",
        backgroundColor:"black",
        borderRadius:"8px",
        display:"flex",
        alignItems:"center",
      }}>
        {selectCategory === 0 ? (
          <div className={styles.text} 
              style={{
                color:"white",
                marginLeft:"3%",
                fontSize:"18px"
              }}
          >
            프로틴은 근육 성장과 회복에 필요한 핵심 영양소로,  
            <div style={{
              marginTop:"1%",
              marginBottom:"1%"
            }}></div>
            운동 후 빠른 회복과 근육 성장에 효과적입니다.  
          </div>
        ) : selectCategory === 1 ? (
          <div className={styles.text} 
              style={{
                color:"white",
                marginLeft:"3%",
                fontSize:"18px"
              }}
          >
            BCAA는 근육 회복과 성장을 돕는 필수 아미노산으로,
            <div style={{
              marginTop:"1%",
              marginBottom:"1%"
            }}></div>
            운동 중 피로 감소와 근손실 방지에 효과적입니다. 최상의 퍼포먼스를 위해 BCAA를 섭취하세요!
          </div>
        ) : (
          <div className={styles.text} 
              style={{
                color:"white",
                marginLeft:"3%",
                fontSize:"18px"
              }}
          >
            부스터는 집중력과 에너지를 높여 운동 퍼포먼스를 극대화하며,
            <div style={{
              marginTop:"1%",
              marginBottom:"1%"
            }}></div>
            지구력 향상과 더 강도 높은 훈련을 돕습니다.
          </div>
        )}    
      </div>
      {/* 에드센스 존 예상  
      <div style={{
        width:"100%",
        height:"10rem",
        marginTop:"1%",
        borderRadius:"8px",
        display:"flex",
        alignItems:"center",
      }}>
      </div> */}
      <div style={{display:"flex"}}>
        <div style={{
          width:"49%",
          height:"12rem",
          marginTop:"1%",
          backgroundColor:"#FF8800",
          borderRadius:"8px",
          alignItems:"center",
          marginRight:"2%"
        }}>
          <div style={{display:"flex"}}>
            <div style={{width:"50%",height:"6rem"}}>
              
            </div> 
            <div style={{width:"50%",height:"6rem"}}>
              <img style={{position:"absolute", width:"8%", height:"13%", marginLeft:"7%", marginTop:"2%"}} src={protienImg} />
            </div>
          </div>
          <div style={{display:"flex"}}>
            <div style={{width:"50%",height:"5rem"}}>
            </div>
            <div style={{width:"50%",height:"5rem", display:"flex"}}>
              
              <div style={{backgroundColor:"white", width:"60%", height:"2rem", borderRadius:"10px", marginTop:"13%", marginLeft:"21%"}}>
                <div style={{display: "flex",
                            justifyContent: "center",  
                            alignItems: "center", 
                            cursor:"pointer",
                            height:"100%"
                          }}
                  // onClick={(e) => {clickProtien1()}}
                >
                  <div className={styles.text}>보충제 비교하러 가기</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          width:"49%",
          height:"12rem",
          marginTop:"1%",
          backgroundColor:"#29E3FF",
          borderRadius:"8px",
          alignItems:"center",
        }}>
          
        </div>
      </div>
      {boardList.map((tdata, index) => (
        <div key={index} style={{
          width:"100%",
          height:"12rem",
          marginTop:"1%",
          borderRadius:"8px",
          display:"flex",
          alignItems:"center",
          backgroundColor:"#F3F3F3"
        }}>
          <div style={{
            width:"15%",
            height:"100%",
            marginRight:"5%",
          }}>
            <img
              src={`${resolveImageUrl(tdata.imgUrl)}`}
              style={{objectFit:"contain", width:"100%", height:"12rem"}}
            />
          </div>
          <div style={{
            width:"15%",
            height:"100%",
            marginRight:"5%",
            alignItems:"center",
            justifyContent:"center",
            display:"flex",
          }}>
            <div>
              <div className={styles.text} style={{height:"3rem", textAlign:"center"}}>
                {tdata.boardName}
              </div>
              <div style={{height:"2rem", textAlign:"center"}}>
                {brandCodeMap[tdata.brandCodeId]}
              </div>
            </div>
          </div>
          <div style={{
            width:"45%",
            height:"100%",
            alignItems:"center",
            justifyContent:"center",
            display:"flex",
          }}>
            <div style={{width:"100%"}}>
              <div style={{height:"5rem", textAlign:"center", display:"flex", width:"100%", justifyContent:"center"}}>
                {tdata.nuinfoResDtoList.map((tempData, index) => (
                    <div key={index} className={styles.text} style={{
                    width:"15%", display:"flex", alignItems:"center", justifyContent:"center"
                    }}>
                      {nuInfoCodeMap[tempData.codeId]}
                    </div>
                ))} 
              </div>
              <div style={{height:"5rem", textAlign:"center", display:"flex", width:"100%", justifyContent:"center"}}>
                {tdata.nuinfoResDtoList.map((tempData, index) => (
                  <div key={index} className={styles.text} style={{
                    width:"15%", display:"flex", alignItems:"center", justifyContent:"center",
                    borderRight:"1px solid black", height:"50%"
                  }}>
                   {tempData.value != "" ? tempData.value : 0}
                  </div>
                ))} 
                
              </div>
            </div>
          </div>
          <div style={{
            width:"15%",
            height:"100%",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
          }}>
              <div style={{
                backgroundColor:"black",
                display:"flex",
                width:"80%",
                borderRadius:"10px",
                alignItems:"center",
                justifyContent:"center",
                fontSize:"12px",
              }}>
                <div className={styles.text} 
                  style={{
                    color:"white",
                    width:"100%",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    cursor:"pointer"
                  }}
                  onClick={(e) => {clickView(tdata.boardId)}}
                >
                  자세히보기 
                  <b style={{textAlign:"center", marginLeft:"10%"}}>
                    {` >`}
                    </b>
                </div>
              </div>
          </div>
        </div>
      ))} 
      
      <div style={{
        width:"100%",
        height:"12rem",
        marginTop:"1%",
        backgroundColor:"black",
        borderRadius:"8px",
        display:"flex",
        alignItems:"center",
      }}>
      </div>
    </div>
  );
}

export default BoardList;