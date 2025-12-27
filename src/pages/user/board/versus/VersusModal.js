import { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Input, Card, CardBody, CardSubtitle, Row, Col } from "reactstrap";
import Blog from "../../../../otherLib/bootStrap/components/dashboard/Blog";
import versusStyle from "style/versus.module.css";
import fontstyles from "style/font.module.css";
import * as boardMngrService from "service/admin/boardMngr/boardMngrService";
import * as boardService from "service/user/boardMngr/boardService";

function VersusModal({ modal, toggle, selectedBoard, setSelectedBoard, selectedIndex, setNuinfoList, getNuinfoList, modalState, setModalState }) {
  const [brandList, setBrandList] = useState([]);
  const [queryParam, setQueryParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [getBoardList, setBoardList] = useState([]);
  const [brandId, setBrandId] = useState("boardBand00");
  const [selected, setSelected] = useState("all");

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

  // 보충제 목록 가져오기
  const getBoardListByFetcher = async () => {

    let type;
    let brandId;
    let queryParam;

    if (selectedBoard && selectedBoard.some(item => item && item.boardCategoryCodeId)) {
      type = selected;
    } else {
      type = "all";
      brandId = "boardBand00";
      queryParam = "";
    }

    const inputData = {
      queryParam : queryParam,
      currentPage,
      type: type,
      itemsPerPage: 20,
      pageBlockSize: 10,
      brandId : brandId
    };

    boardService.fetcherBoardFind(inputData).then((outPutData) => {
      setBoardList(outPutData.data);
    });
  };

  // 브랜드 목록 가져오기
  const getBrandListByFetcher = async () => {
    boardService.fetcherBrandList().then((outPutData) => {
      setBrandList([{ id: "boardBand00", name: "전체" }, ...(outPutData.data || [])]);
    });
  };

  // 카테고리 선택
  const onClickCategory = (category) => {
    setSelected(category);
  };

  // 검색
  const searchBoardList = () => {
    const inputData = {
      queryParam,
      currentPage,
      type: selected,
      itemsPerPage: 8,
      pageBlockSize: 10,
      brandId
    };

    boardService.fetcherBoardFind(inputData).then((outPutData) => {
      setBoardList(outPutData.data);
    });
  };

  // 모달 안에서 보충제 클릭 시 해당 칸에 삽입
  const onBoardClickInVersus = (tdata) => {
    if (selectedIndex !== null) {
      setSelectedBoard((prev) => {
        const updated = [...prev];
        updated[selectedIndex] = tdata;
        return updated;
      });
    }

    // 한줄평 조회 함수
      const tempData = { boardId: tdata.boardId };
      boardService
        .fetcherGetBoardCommentById(JSON.stringify(tempData))
        .then(
              async (outPutData) => {
                setSelectedBoard((prev) => {
                  const updated = [...prev];
                  updated[selectedIndex].comment = outPutData.data;
                  return updated;
                });
              }
            
        );
    setSelected(tdata.boardCategoryCodeId);
    getBoardRate(tdata.boardId, selectedIndex)

    boardService.fetcherGetNuteInfo(tdata).then(async (outPutData) => {
      setNuinfoList((prev) => {
        const updated = [...prev];
        updated[selectedIndex] = outPutData.data; 
        return updated;
      });

      // 가격 세팅
      if(outPutData.data.length > 7){
        setSelectedBoard((prev) => {
          const updated = [...prev];
          updated[selectedIndex].price = outPutData.data[8].value;
          return updated;
        });
      }
    });

    toggle();
  };

  // 게시글 평점 함수
  const getBoardRate = async (boardId, selectedIndex) => {
    const data = { boardId: boardId };
    const boardRate = await boardService
      .fetcherGetBoardRateById(JSON.stringify(data))
      .then((result) => result.data
    );
    // ✅ 상태에 저장
      setSelectedBoard((prev) => {
        const updated = [...prev];
        updated[selectedIndex].avgIngredientRate = boardRate.avgIngredientRate;
        updated[selectedIndex].avgPriceRate = boardRate.avgPriceRate;
        updated[selectedIndex].avgTasteRate = boardRate.avgTasteRate;
        return updated;
      });
  };

  useEffect(() => {
    getBoardListByFetcher();
    getBrandListByFetcher();
  }, []);

  // 모달 오픈 시 인풋값 초기화, selectedBoard가 있으면 type만 고정
  useEffect(() => {
    if (modal) {
      const hasSelectedBoard =
        selectedBoard && selectedBoard.some((item) => item && item.boardCategoryCodeId);

      setBrandId("boardBand00");
      setQueryParam("");

      if (!hasSelectedBoard) {
        setSelected("all");
      }
    }
  }, [modal, selectedBoard]);

  useEffect(() => {
    searchBoardList();
  }, [selected, brandId])

  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} className={fontstyles.text}>
        보충제 검색
      </ModalHeader>
      <ModalBody>
        {/* 카테고리 선택 */}
        <div className={versusStyle.pickKind}>
          <p className={`${versusStyle.titleInModal} ${fontstyles.text}`}>보충제</p>
          <div className={versusStyle.buttonContainerInModal}>
            <Button
              color="dark"
              outline={selected !== "all"}
              onClick={() => onClickCategory("all")}
              style={{ width: "100px", margin: "5px" }}
              disabled={selectedBoard.some((item) => item !== null)} 
            >
              전체
            </Button>

            <Button
              color="dark"
              outline={selected !== "boardCategory02"}
              onClick={() => onClickCategory("boardCategory02")}
              style={{ width: "100px", margin: "5px" }}
              disabled={selectedBoard.some((item) => item !== null)} 
            >
              BCAA
            </Button>

            <Button
              color="dark"
              outline={selected !== "boardCategory01"}
              onClick={() => onClickCategory("boardCategory01")}
              style={{ width: "100px", margin: "5px" }}
              disabled={selectedBoard.some((item) => item !== null)} 
            >
              프로틴
            </Button>

            <Button
              color="dark"
              outline={selected !== "boardCategory03"}
              onClick={() => onClickCategory("boardCategory03")}
              style={{ width: "100px", margin: "5px" }}
              disabled={selectedBoard.some((item) => item !== null)} 
            >
              부스터
            </Button>
          </div>
        </div>

        {/* 브랜드 선택 */}
        <div className={versusStyle.pickKind}>
          <p className={`${versusStyle.titleInModal} ${fontstyles.text}`}>브랜드</p>
          <div className={versusStyle.buttonContainerInModal}>
            <Input type="select" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
              {brandList.map((brand, index) => (
                <option key={index} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Input>
          </div>
        </div>

        {/* 검색 */}
        <div className={versusStyle.pickKind}>
          <p className={`${versusStyle.titleInModal} ${fontstyles.text}`}>검색</p>
          <div className={versusStyle.buttonContainerInModal}>
            <Input
              type="text"
              value={queryParam}
              onChange={(e) => setQueryParam(e.target.value)}
            />
            <Button color="secondary" outline onClick={searchBoardList}>
              검색
            </Button>
          </div>
        </div>

        <hr />

        {/* 보충제 리스트 */}
        <Card style={{ width: "100%" }}>
          <CardBody>
            <CardSubtitle className="mb-2 text-muted" tag="h6" style={{ display: "flex" }} />
            <div
              style={{
                height: "calc(8 * 3rem)", // 높이는 8개 정도만 보이게
                overflowX: "hidden",
                minHeight: "0"
              }}
            >
              <Row>
                {getBoardList.map((tdata, index) => (
                  <Col
                    sm="6"
                    lg="6"
                    xl="3"
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => onBoardClickInVersus(tdata)}
                  >
                    <div className={versusStyle.boardList}>
                      <img className={versusStyle.selectedImg} src={resolveImageUrl(tdata.imgUrl)} alt="보충제 이미지" />
                      <div className={versusStyle.boardListTitle}>{tdata.boardName}</div>
                    </div>
                    {/* <Blog className={versusStyle.boardList} title={tdata.boardName} /> */}
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
