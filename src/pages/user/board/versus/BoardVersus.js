import { useState, useEffect } from "react";
import VersusModal from "./VersusModal.js";
import versusStyle from "style/versus.module.css";
import fontstyles from "style/font.module.css";

function BoardVersus() {
  const [selectedBoard, setSelectedBoard] = useState([null, null, null]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getNuinfoList, setNuinfoList] = useState([]);

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

  useEffect(() => {
    
  }, []);

  return (
    <div className="App">
      <div className={versusStyle.buttonContainer}>
        <div className={versusStyle.buttonGroup}>
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className={versusStyle.pickButton}
              onClick={() => handleSlotClick(index)}
            >
              {selectedBoard[index] ? (
                <p className={fontstyles.text}>
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
                </p>
              ) : (
                <>
                  <p>+</p>
                  <p className={fontstyles.text}>보충제를 선택하세요</p>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={versusStyle.priceContainer}>
        <p className={fontstyles.text}>가격</p>
      </div>

      <hr />

      <div className={versusStyle.nutriContainer}>
        <p className={fontstyles.text}>영양 정보</p>
      </div>

      <hr />

      <div className={versusStyle.evalContainer}>
        <p className={fontstyles.text}>평가 정보</p>
      </div>

      {/* 모달 */}
      <VersusModal
        modal={isModalOpen}
        toggle={toggle}
        selectedBoard={selectedBoard}
        setSelectedBoard={setSelectedBoard}
        selectedIndex={selectedIndex}
        setNuinfoList={setNuinfoList}
        getNuinfoList={getNuinfoList}
      />
    </div>
  );
}

export default BoardVersus;
