import { useEffect, useState } from "react";
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, Input, Card, CardBody, CardSubtitle, Row, Col} from "reactstrap";
import Blog from "../../../../otherLib/bootStrap/components/dashboard/Blog";
import versusStyle from "style/versus.module.css";
import fontstyles from "style/font.module.css";
import * as boardMngrService from "service/admin/boardMngr/boardMngrService";
import * as boardService from "service/user/boardMngr/boardService";
import { getCodeNameByIdApi, getCodeListByParentIdApi } from 'utils/CodeUtil';

function VersusModal({modal, toggle, selectedBoard, setSelectedBoard, selectedIndex, setNuinfoList, getNuinfoList}) {

  const [brandList, setBrandList] = useState([]);
  const [queryParam, setQueryParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [getBoardMngrList, setBoardMngrList] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [selected, setSelected] = useState(""); 

  const getBoardMngrListByFetcher = async () => {
    setQueryParam("");
    setBrandId("boardBand00");

    const inputData = {
      queryParam: queryParam,
      currentPage: currentPage,
      type : "all",
      itemsPerPage: 20,
      pageBlockSize: 10,
      brandId: brandId
    };

    boardMngrService.fetcherBoardMngrList(inputData).then((outPutData) => {
      setBoardMngrList(outPutData.data.content);
    });
  };

  const getBrandListByFetcher = async () => {
    boardService.fetcherBrandList().then((outPutData) => {
      setBrandList([{ id: "boardBand00", name: "전체" }, ...(outPutData.data || [])]);
    });
  };
  
  const onClickCategory = (category) => {
    setSelected(category);
    
    // const inputData = {
    //   queryParam: queryParam,
    //   currentPage: currentPage,
    //   type : category,
    //   itemsPerPage: 8,
    //   pageBlockSize: 10
    // };

    // boardMngrService.fetcherBoardMngrList(inputData).then((outPutData) => {
    //   setBoardMngrList(outPutData.data.content);
    // });

  };

  const searchBoardList = () => {
    const inputData = {
      queryParam: queryParam,
      currentPage: currentPage,
      type : selected,
      itemsPerPage: 8,
      pageBlockSize: 10,
      brandId: brandId
    };

    boardService.fetcherBoardFind(inputData).then((outPutData) => {
      setBoardMngrList(outPutData.data);
    });
  }

  // 모달 안에서 보충제 클릭 시 해당 칸에 삽입
  const onBoardClickInVersus = (tdata) => {
    if (selectedIndex !== null) {
      setSelectedBoard((prev) => {
        const updated = [...prev];
        updated[selectedIndex] = tdata;
        return updated;
      });
    }

    boardMngrService.fetcherBoard(tdata).then(async (outPutData) => {
      console.log(tdata);

      // setNuinfoList(await getCodeListByParentIdApi(outPutData.data.boardMngrResDto.nuinfoId))
    })

    toggle();
  };

  useEffect(() => {
    getBoardMngrListByFetcher();
    getBrandListByFetcher();
    setSelected("all");
  }, []);

  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} className={fontstyles.text}>
        보충제 검색
      </ModalHeader>
      <ModalBody>
        {/* 카테고리 선택 */}
        <div className={versusStyle.pickKind}>
          <p className={`${versusStyle.titleInModal} ${fontstyles.text}`}>
            보충제
          </p>
          <div className={versusStyle.buttonContainerInModal}>
               <Button
                color="dark"
                outline={selected !== "all"}
                onClick={() => onClickCategory("all")}
                style={{ width: "100px", margin: "5px" }}
              >
                전체
              </Button>

              <Button
                color="dark"
                outline={selected !== "boardCategory02"}
                onClick={() => onClickCategory("boardCategory02")}
                style={{ width: "100px", margin: "5px" }}
              >
                BCAA
              </Button>

              <Button
                color="dark"
                outline={selected !== "boardCategory01"}
                onClick={() => onClickCategory("boardCategory01")}
                style={{ width: "100px", margin: "5px" }}
              >
                프로틴
              </Button>

              <Button
                color="dark"
                outline={selected !== "boardCategory03"}
                onClick={() => onClickCategory("boardCategory03")}
                style={{ width: "100px", margin: "5px" }}
              >
                부스터
              </Button>
          </div>
        </div>

        {/* 브랜드 선택 */}
        <div className={versusStyle.pickKind}>
          <p className={`${versusStyle.titleInModal} ${fontstyles.text}`}>
            브랜드
          </p>
          <div className={versusStyle.buttonContainerInModal}>
            <Input type="select" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
              {brandList.map((brandList, index) => (
                <option key={index} value={brandList.id}>{brandList.name}</option>
              ))}
            </Input>
          </div>
        </div>

        {/* 검색 */}
        <div className={versusStyle.pickKind}>
          <p className={`${versusStyle.titleInModal} ${fontstyles.text}`}>
            검색
          </p>
          <div className={versusStyle.buttonContainerInModal}>
            <Input
              type="text"
              value={queryParam}
              onChange={(e) => setQueryParam(e.target.value)}
            />
            <Button color="secondary" outline onClick={() => searchBoardList()}>
              검색
            </Button>
          </div>
        </div>

        <hr />

        {/* 보충제 리스트 */}
        <Card style={{ width: "100%" }}>
          <CardBody>
            <CardSubtitle className="mb-2 text-muted" tag="h6" style={{ display: "flex" }}>
            </CardSubtitle>
            <div
              style={{
                height: "calc(8 * 3rem)", // 높이는 8개 정도만 보이게
                overflowX: "hidden",
                minHeight: "0",
              }}
            >
              <Row>
                {getBoardMngrList.map((tdata, index) => (
                  <Col
                    sm="6"
                    lg="6"
                    xl="3"
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => onBoardClickInVersus(tdata)}
                  >
                    <div style={{ flex: 1 }}></div>
                    <Blog
                      className={versusStyle.boardList}
                      title={tdata.boardName}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
}

export default VersusModal;
