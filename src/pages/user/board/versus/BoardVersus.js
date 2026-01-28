import { useState, useEffect } from "react";
import VersusModal from "./VersusModal.js";
import versusStyle from "style/versus.module.css";
import fontstyles from "style/font.module.css";
import questionIcon from "../../../../otherLib/bootStrap/assets/images/icon/question.png"
import { useNavigate } from "react-router-dom";
import styles from "style/boardDetail.module.css";
import * as boardService from "service/user/boardMngr/boardService";

const STORAGE_KEY = "boardVersusState";

function BoardVersus() {
  // Load initial state from sessionStorage if available
  const getInitialState = () => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          selectedBoard: parsed.selectedBoard ?? [null, null, null],
          nuinfoList: parsed.nuinfoList ?? [[], [], []],
        };
      }
    } catch (e) {}
    return {
      selectedBoard: [null, null, null],
      nuinfoList: [[], [], []],
    };
  };

  const [selectedBoard, setSelectedBoard] = useState(getInitialState().selectedBoard);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuinfoList, setNuinfoList] = useState(getInitialState().nuinfoList);
  const [showTooltip, setShowTooltip] = useState();
  const navigate = useNavigate();

  // Save state to sessionStorage whenever selectedBoard or nuinfoList changes
  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedBoard,
        nuinfoList,
      })
    );
    
  }, [selectedBoard, nuinfoList]);

  useEffect(() => {
    for(let i =0; i<selectedBoard.length; i++){
      if(selectedBoard[i] && selectedBoard[i].boardId){
        console.log(selectedBoard[i].boardId)
        let tempData = { boardId: selectedBoard[i].boardId };
      
        boardService
          .fetcherGetBoardCommentById(JSON.stringify(tempData))
          .then(
             (outPutData) => {
              if(outPutData.data.length > 0){
                setSelectedBoard((prev) => {
                  const updated = [...prev];
                  if(updated[i]){
                    console.log(outPutData.data)
                    console.log(updated[i])
                    updated[i].comment = outPutData.data;
                  }
                  return updated;
                });
              }
              
            }
            
          );
        boardService
              .fetcherGetBoardRateById(JSON.stringify(tempData))
              .then(
                  (outPutData) => {
                    if(outPutData.data){
                      setSelectedBoard((prev) => {
                        const updated = [...prev];
                        if(updated[i]){
                          updated[i].avgIngredientRate = outPutData.data.avgIngredientRate;
                          updated[i].avgPriceRate = outPutData.data.avgPriceRate;
                          updated[i].avgTasteRate = outPutData.data.avgTasteRate;
                        }
                        return updated;
                      });
                    }
                    
                  }
                  
                );
      }
    }
  }, []);

  

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

  // 칸 클릭 시 모달 열고 index 저장
  const handleSlotClick = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  // 모달 토글
  const toggle = () => setIsModalOpen((prev) => !prev);

  // 삭제 버튼
  const onDeleteBtnClick = (index) => {
    setSelectedBoard((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
    setNuinfoList((prev) => {
      const updated = [...prev];
      updated[index] = [];
      return updated;
    });
  };

  const handleBoardDetailClick = (boardId) => {
    navigate(`/user/board/detail?boardId=${boardId}`);
  };

  const renderStars = (score) => {
    if (!score) return "평가 없음";
    const rounded = Math.round(score); // 소수점 반올림
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  };

  return (
    <div className="App">
      <button className={`${versusStyle.resetButton} ${fontstyles.text}`}
          onClick={() => {
            setSelectedBoard([null, null, null]);
            setNuinfoList([[], [], []]);
            sessionStorage.removeItem(STORAGE_KEY);
          }}
        >
          초기화
      </button>
      <div className={versusStyle.buttonContainer}>
        <div className={versusStyle.buttonGroup}>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={versusStyle.pickButton}
              role="button"
              tabIndex={0}
              onClick={() => handleSlotClick(index)}
            >
              {selectedBoard[index] ? (
                <div className={fontstyles.text}>
                  <div className={versusStyle.selectedBoardContainer}>
                    <button className={versusStyle.selectedBoardDelete} onClick={(e) => {e.stopPropagation(); onDeleteBtnClick(index);}}>
                      x
                    </button>
                    <div className={versusStyle.selectedBoardDetail}>
                      <img className={versusStyle.selectedImgInVersus} src={resolveImageUrl(selectedBoard[index]?.imgUrl)} alt="보충제 이미지" />
                      <div className={fontstyles.text}>{selectedBoard[index].boardName}</div>
                    </div>
                    <button className={versusStyle.boardDetailButton} onClick={(e) => {e.stopPropagation(); handleBoardDetailClick(selectedBoard[index].boardId)}}>자세히 보기</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className={fontstyles.text}>보충제를 선택하세요</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={versusStyle.nutriContainer}>
        <div className={versusStyle.nutriTitleContainer}>
          <p className={fontstyles.text}>가격</p>
        </div>
        <div className={versusStyle.nutriGrid}>
          {[0, 1, 2].map((index) => (
            <div key={index} className={versusStyle.nutriColumn}>
              {selectedBoard[index] ? (
                <ul>
                  <li>
                    <span>가격</span>
                    <span>
                      {selectedBoard[index].price !== undefined && selectedBoard[index].price !== null && selectedBoard[index].price !== ""
                        ? selectedBoard[index].price
                        : "-"}
                    </span>
                  </li>
                </ul>
              ) : (
                <p className={fontstyles.text}></p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className={versusStyle.nutriContainer}>
        <div className={versusStyle.nutriTitleContainer}>
          <p className={fontstyles.text}>영양 정보 (한 스쿱 당)</p>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={questionIcon}
              className={versusStyle.questionIcon}
              style={{ cursor: "pointer" }}
              alt="정보"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div className={versusStyle.scoopDetail}>
                한 스쿱(1회 제공량)은 30G 기준입니다.
              </div>
            )}
          </div>
        </div>
        <div className={versusStyle.nutriGrid}>
          {[0, 1, 2].map((index) => (
            <div key={index} className={versusStyle.nutriColumn}>
              {selectedBoard[index] ? (
                <ul>
                  {nuinfoList[index].map((item, i) => {

                    if (i > 7) return null;
                    const values = nuinfoList.map((list) => {
                      const val = list[i]?.value;
                      return val && !isNaN(Number(val)) ? Number(val) : null;
                    });

                    const maxValue = Math.max(...values.filter((v) => v !== null));
                    const currentValue = item.value && !isNaN(Number(item.value)) ? Number(item.value) : null;
                    const isMax = currentValue !== null && currentValue === maxValue;

                    return (
                      <li
                        key={i}
                        className={isMax ? versusStyle.winner : ''}
                      >
                        <span>{item.name}</span>
                        <span>
                          {item.value || '-'}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className={fontstyles.text}></p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className={versusStyle.evalContainer}>
        <p className={fontstyles.text}>평가 정보</p>
        {!localStorage.getItem("token") ? (
          <div className={versusStyle.evalBlurContainer}>
            <div className={versusStyle.evalBlur}>
              회원만 볼수 있는 서비스 입니다.
            </div>
            <div style={{ filter: "blur(3px)", pointerEvents: "none" }}>
            </div>
          </div>
        ) : (
          <div className={versusStyle.nutriGrid}>
            {[0, 1, 2].map((index) => {
              if (!selectedBoard[index]) return <div className={versusStyle.nutriColumn} ></div>;

              // 각 카테고리별 최대값 찾기
              const ingredientRates = [0, 1, 2]
                .map(i => selectedBoard[i]?.avgIngredientRate)
                .filter(v => v != null);
              const priceRates = [0, 1, 2]
                .map(i => selectedBoard[i]?.avgPriceRate)
                .filter(v => v != null);
              const tasteRates = [0, 1, 2]
                .map(i => selectedBoard[i]?.avgTasteRate)
                .filter(v => v != null);

              const maxIngredient = Math.max(...ingredientRates);
              const maxPrice = Math.max(...priceRates);
              const maxTaste = Math.max(...tasteRates);

              // 현재 항목이 최대값인지 확인
              const isIngredientWinner = selectedBoard[index].avgIngredientRate === maxIngredient;
              const isPriceWinner = selectedBoard[index].avgPriceRate === maxPrice;
              const isTasteWinner = selectedBoard[index].avgTasteRate === maxTaste;

              return(
              <div key={index}  className={versusStyle.nutriColumn} >
                {selectedBoard[index] ? (
                  
                  <>    
                    <li className={isIngredientWinner ? versusStyle.winner : ''} style={{ color: "#888" }}>맛: {renderStars(selectedBoard[index].avgIngredientRate)}</li>
                    <li className={isPriceWinner ? versusStyle.winner : ''} style={{ color: "#888" }}>가격: {renderStars(selectedBoard[index].avgPriceRate)}</li>
                    <li className={isTasteWinner ? versusStyle.winner : ''} style={{ color: "#888" }}>성분: {renderStars(selectedBoard[index].avgTasteRate)}</li>
                    <div>
                       {selectedBoard[index].comment?.map((commentData, index2) => (
                          <div key={index2} className={versusStyle.nutriColumn} style={{marginTop:"2%"}}>
                            ㄴ {commentData.content}
                          </div>
                        ))} 
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              )
            })}           
          </div>
        )}
      </div>

      {/* 모달 */}
      <VersusModal
        modal={isModalOpen}
        toggle={toggle}
        selectedBoard={selectedBoard}
        setSelectedBoard={setSelectedBoard}
        selectedIndex={selectedIndex}
        setNuinfoList={setNuinfoList}
        nuinfoList={nuinfoList}
      />
    </div>
  );
}

export default BoardVersus;
