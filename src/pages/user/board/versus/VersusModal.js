import { useEffect,React,useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Card, CardBody, CardTitle, CardSubtitle, Table, Row, Col } from 'reactstrap';
import Blog from "../../../../otherLib/bootStrap/components/dashboard/Blog";
import versusStyle from "style/versus.module.css"
import fontstyles from 'style/font.module.css';
import * as boardMngrService from "service/admin/boardMngr/boardMngrService";

function VersusModal({modal, toggle, selectedBoard, setSelectedBoard}) {
  const [queryParam, setQueryParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [getBoardMngrList, setBoardMngrList] = useState([]);

  const getBoardMngrListByFetcher = async  () => {
      const inputData ={
        queryParam :queryParam,
        currentPage : currentPage,
        itemsPerPage : 8,
        pageBlockSize : 10,
      };

      boardMngrService.fetcherBoardMngrList(inputData).then((outPutData) => {
        setBoardMngrList(outPutData.data.content);
      })
  };

  const onBoardClickInVersus = (tdata) => {
        if (selectedBoard.length < 3) {
            setSelectedBoard(prev => [...prev, tdata]); // 배열에 추가
        }
        toggle()
  }
  
  useEffect(() => {
    getBoardMngrListByFetcher();
  },[])

  return (
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
                  >
                  BCAA
                </Button>
                <Button
                  color="secondary"
                  outline
                  >
                  프로틴
                </Button>
                <Button
                  color="secondary"
                  outline
                  >
                  부스터
                </Button>
              </div>
            </div>
          </div>

           <div>
            <div className={versusStyle.pickKind}>
              <p className={`${versusStyle.titleInModal} ${fontstyles.text}`}>브랜드</p>
              <div className={versusStyle.buttonContainerInModal}>
                  <Input type="select"/>
              </div>
            </div>
          </div>

          <div>
            <div className={versusStyle.pickKind}>
              <p className={`${versusStyle.titleInModal} ${fontstyles.text}`}>검색</p>
              <div className={versusStyle.buttonContainerInModal}>
                <Input type="text"/>
                <Button 
                    color="secondary"
                    outline>
                        검색
                </Button>
              </div>
            </div>
          </div>

          <hr/>

          <div>
            <Card style={{width:"100%"}}>
                <CardBody>
                <CardSubtitle className="mb-2 text-muted" tag="h6" style={{display: "flex"}}>
                    <Input
                    type="checkbox"
                    style={{marginRight:"3%"}}
                    />
                </CardSubtitle>
                <Row>
                    {getBoardMngrList.map((tdata, index) => (
                    <Col sm="6" lg="6" xl="3" key={index} 
                        style={{cursor:"pointer"}}
                        onClick={() => onBoardClickInVersus(tdata)}
                    >
                        <Input type="checkbox" 
                            name="boardCheckBox"
                            />
                        <div
                        style={{ flex: 1 }}
                        > 
                        </div>
                        <Blog className={versusStyle.boardList}
                            title={tdata.boardName}
                        />
                    </Col>
                    ))}  
                </Row>
                </CardBody>
            </Card>

          </div>

        </ModalBody>
      </Modal>
  );
}

export default VersusModal;