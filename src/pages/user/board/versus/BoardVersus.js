import { useEffect,React,useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import VersusModal from "./VersusModal.js"
import versusStyle from "style/versus.module.css"
import fontstyles from 'style/font.module.css';

function BoardVersus() {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [selectedBoard, setSelectedBoard] = useState([]);

  return (
    <div className="App">

      <div className={versusStyle.buttonContainer}>
        <div className={versusStyle.buttonGroup}>
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className={versusStyle.pickButton}
              onClick={toggle}
            >
              {selectedBoard[index] ? (
                <p className={fontstyles.text}>
                  {selectedBoard[index].boardName}
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
        <p className={fontstyles.text}> 가격 </p>
      </div>

      <hr/>

      <div className={versusStyle.nutriContainer}>
        <p className={fontstyles.text}> 영양 정보 </p>
      </div>

      <hr/>

      <div className={versusStyle.evalContainer}>
        <p className={fontstyles.text}> 평가 정보 </p>
      </div>

      <VersusModal 
        modal={modal} 
        setModal={setModal}
        toggle={toggle}
        selectedBoard = {selectedBoard}
        setSelectedBoard = {setSelectedBoard}
      />

    </div>
  );
}

export default BoardVersus;