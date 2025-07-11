import { Button, Col, Input, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table} from "reactstrap";
import Blog from "../../../otherLib/bootStrap/components/dashboard/Blog";
import { useEffect, useState } from "react";
import * as boardMngrService from "service/admin/boardMngr/boardMngrService";
import { useNavigate } from "react-router-dom";
import SearchForm from "components/common/SearchForm";
import { search } from "data/search";
import PaginationComponet from "components/common/PaginationComponet";

const logo = process.env.PUBLIC_URL+"/asset/images/title.png";
const tempImg1 = process.env.PUBLIC_URL+"/asset/images/BSN 신타6 엣지 1.92kg 초코 (48회분).png";
const tempImg2 = process.env.PUBLIC_URL+"/asset/images/엑스텐드 프로 웨이 아이솔레이트 64서빙.jpg";

const BoardList = () => {

  const navigate = useNavigate();

  // 게시물 목록
  const [getBoardMngrList, setBoardMngrList] = useState([]);

    // 체크 상태 배열
  const [checkedStates, setCheckedStates] = useState(
    Array(getBoardMngrList.length).fill(false)
  );

  // 선택된 ID 리스트
  const [selectedIds, setSelectedIds] = useState([]);

  // 쿼리파라미터
  const [queryParam, setQueryParam] = useState("");

  const isAllChecked = checkedStates.every((checked) => checked);
  const [getTotalCount, setTotalCount] =  useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getBoardMngrListByFetcher = async  () => {
      const inputData ={
        queryParam :queryParam,
        currentPage : currentPage,
        itemsPerPage : 8,
        pageBlockSize : 10,
      };

      boardMngrService.fetcherBoardMngrList(inputData).then((outPutData) => {
        console.log(outPutData.data)
        setBoardMngrList(outPutData.data.content);
        setTotalCount(outPutData.data.totalCount);
      })
  };

  const clickBoard = (boardId) => {
    navigate(`/admin/boardView/${boardId}`);
  };

  const deleteBoard = async  () => {
    
    if(selectedIds.length < 1){
      alert("삭제할 게시물을 선택해주세요!")
      return false;
    }

    const inputData ={
      ids: selectedIds,
    };
    
    boardMngrService.fetcherBoardDelte(inputData).then((outPutData) => {
       if(outPutData.result === "SUCCESS"){
         alert("완료되었습니다.")
         getBoardMngrListByFetcher();       
       }
    })       
  } 

  // 전체 선택 체크박스 클릭
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setCheckedStates(Array(getBoardMngrList.length).fill(checked));
    setSelectedIds(checked ? getBoardMngrList.map((item) => item.boardId) : []);
  };

  // 개별 체크박스 클릭
  const handleCheckboxChange = (index) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);

    const id = getBoardMngrList[index].boardId;
    if (newCheckedStates[index]) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  useEffect(() => {
    getBoardMngrListByFetcher();
  },[currentPage])

  return (
    <div style={{display:"flex",width:"100%"}}>
      <Card style={{width:"100%"}}>
        <CardBody>
          <CardTitle tag="h5">게시물 관리</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6" style={{display: "flex"}}>
            <Input
              type="checkbox"
              checked={checkedStates.length > 0 && checkedStates.every((c) => c)}
              onChange={handleAllCheck}
              style={{marginRight:"3%"}}
            />
            <SearchForm 
                        selectList={[
                          {value:"all",name:"전체"},
                          {value:"searchField1",name:"회사명"},
                          {value:"searchField2",name:"제목"}
                        ]}
                        setQueryParam={setQueryParam}
                        placeholder={"검색어 입력"}
                        paramType={2} // 1: 쿼리파라미터 미존재시, 2: 쿼리파라미터 존재시
                        getListEvent={getBoardMngrListByFetcher}
            />
            <Button style={{width:"8%", marginRight:"1%", float:"right"}} 
                                color="primary"
                    onClick={() => clickBoard()}            
                        >
                          등록
                        </Button>
            <Button style={{width:"8%", marginRight:"1%", float:"right"}} 
                          color="danger"
                    onClick={() => deleteBoard()}     
                          >
                            삭제
                          </Button>
          </CardSubtitle>
          <Row>
            {getBoardMngrList.map((tdata, index) => (
              <Col sm="6" lg="6" xl="3" key={index} 
                style={{cursor:"pointer"}}
              >
                <Input type="checkbox" 
                       name="boardCheckBox"
                       checked={!!checkedStates[index]}
                       onChange={() => handleCheckboxChange(index)}
                       />
                <div
                  style={{ flex: 1 }}
                  onClick={() => clickBoard(tdata.boardId)}
                > 
                  <Blog
                    image={tdata.imgUrl
                    ? process.env.PUBLIC_URL + tdata.imgUrl.split("public")[1].replace(/\\/g, "/")
                    : tempImg1}
                    title={tdata.boardName}
                    text={`맛 : 3.5 가격 : 3.5 성분 : 3.5`}
                  />
                </div>
              </Col>
            ))}  
          </Row>
        </CardBody>
        <PaginationComponet  
          itemsPerPage={8}
          totalCount={getTotalCount}
          pageBlockSize={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Card>
    </div>
  );
};

export default BoardList;