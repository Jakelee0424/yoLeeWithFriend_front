import { useState } from "react";
import VersusModal from "./VersusModal.js";
import versusStyle from "style/versus.module.css";
import fontstyles from "style/font.module.css";
import questionIcon from "../../../../otherLib/bootStrap/assets/images/icon/question.png"

function BoardVersus() {
  const [selectedBoard, setSelectedBoard] = useState([null, null, null]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuinfoList, setNuinfoList] = useState([[], [], []]);
  const [showTooltip, setShowTooltip] = useState();
  const question = process.env.PUBLIC_URL+"/assets/images/icon/question.png";

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
  };

  return (
    <div className="App">
      <button className={versusStyle.resetButton}
          onClick={() => {
            setSelectedBoard([null, null, null]);
            setNuinfoList([[], [], []]);
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
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteBtnClick(index);
                      }}
                    >
                      x
                    </button>
                  </div>
                  <div>{selectedBoard[index].boardName}</div>
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
          <div>
            <p style={{ color: "#888" }}>평점 내용 여기에</p>
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
