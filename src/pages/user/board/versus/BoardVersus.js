import { useEffect,React,useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import versusStyle from "style/versus.module.css"
import fontstyles from 'style/font.module.css';

function BoardVersus() {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [rSelected, setRSelected] = useState(null);


  return (
    <div className="App">

      <div className={versusStyle.buttonContainer}>
        <div className={versusStyle.buttonGroup}>
          <button className={versusStyle.pickButton} onClick={toggle}>
            <p>+</p>
            <p className={fontstyles.text}>보충제를 선택하세요</p>
          </button>
          <button className={versusStyle.pickButton} onClick={toggle}>
            <p>+</p>
            <p className={fontstyles.text}>보충제를 선택하세요</p>
          </button>
          <button className={versusStyle.pickButton} onClick={toggle}>
            <p>+</p>
            <p className={fontstyles.text}>보충제를 선택하세요</p>
          </button>
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



      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className={fontstyles.text}>보충제 검색</ModalHeader>
        <ModalBody>
          <div>
            <div className={versusStyle.pickKind}>
              <p className={`${versusStyle.titleInModal} ${fontstyles.text}`}>보충제</p>
              <div className={versusStyle.buttonContainerInModal}>
                <Button
                  color="secondary"
                  outline
                  onClick={() => setRSelected(1)}
                  active={rSelected === 1}
                >
                  BCAA
                </Button>
                <Button
                  color="secondary"
                  outline
                  onClick={() => setRSelected(2)}
                  active={rSelected === 2}
                >
                  프로틴
                </Button>
                <Button
                  color="secondary"
                  outline
                  onClick={() => setRSelected(3)}
                  active={rSelected === 3}
                >
                  부스터
                </Button>
              </div>
            </div>



          </div>


        </ModalBody>
      </Modal>


    </div>
  );
}

export default BoardVersus;