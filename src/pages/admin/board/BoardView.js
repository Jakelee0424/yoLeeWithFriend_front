import { Col, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table, Button, Input} from "reactstrap";
import { useEffect, React, useState, useRef } from "react";
import * as boardMngrService from "service/admin/boardMngr/boardMngrService";
import { useLocation, useNavigate, useParams  } from 'react-router-dom';
import bS from "style/basic.module.css"
import Blog from "otherLib/bootStrap/components/dashboard/Blog";
import { getCodeNameByIdApi, getCodeListByParentIdApi } from 'utils/CodeUtil';

const BoardView = () => {
  const location = useLocation();

  const tempImg1 = process.env.PUBLIC_URL+"/asset/images/BSN 신타6 엣지 1.92kg 초코 (48회분).png";

  // 게시물 정보
  const [getBoard, setBoard] = useState({});
  // 일련번호
  const [getBoardSn, setBoardSn] = useState(1);

  // 제품명
  const [getBoardName, setBoardName] = useState("");

  // 회사코드 Id
  const [getBrandCodeId, setBrandCodeId] = useState("");

  // 회사명 리스트
  const [getBrandList, setBrandList] = useState([]);

  // 영양정보 리스트
  const [getNuinfoList, setNuinfoList] = useState([]);

  // 영양정보 value 리스트
  const [getNuinfoValueList, setNuinfoValueList] = useState([]);

  // 영양정보 리스트 벨류
  const [formData, setFormData] = useState({}); // 초기값 빈 객체

  const [getProfileImg, setProfileImg] = useState("");
  const [getfileImg, setfileImg] = useState("");
  const fileInput = useRef(null);

  const navigate = useNavigate();

  //boardId
  const { id } = useParams();


  const getBoardByFetcher = async  (boardId) => {
    if(boardId != null && boardId !== ""){  // boardId이 담겨있을때만 정보조회
      const inputData ={
        boardId:boardId,
      };
      boardMngrService.fetcherBoard(inputData).then(async (outPutData) => {
        //console.log(outPutData);
        setBoard(outPutData.data.boardMngrResDto)
        setBoardSn(outPutData.data.boardMngrResDto.boardId)
        setBoardName(outPutData.data.boardMngrResDto.boardName)
        setBrandCodeId(outPutData.data.boardMngrResDto.brandCodeId)
        const fullPath = outPutData.data.boardMngrResDto.imgUrl;
        const relativePath = fullPath ? process.env.PUBLIC_URL + fullPath.split("public")[1].replace(/\\/g, "/")
        : process.env.PUBLIC_URL + "/asset/images/BSN 신타6 엣지 1.92kg 초코 (48회분).png";
        setProfileImg(process.env.PUBLIC_URL +relativePath)
        setNuinfoList(await getCodeListByParentIdApi(outPutData.data.boardMngrResDto.nuinfoId))
        const updatedFormData = { ...formData };
        for(let i=0; i<outPutData.data.nuinfoResDtoList.length; i++){
            //console.log(outPutData.data.nuinfoResDtoList[i].value)
            updatedFormData[`nuinfo${i}`] = {
              ...updatedFormData[`nuinfo${i}`],
              value: outPutData.data.nuinfoResDtoList[i].value,
              sn:outPutData.data.nuinfoResDtoList[i].sn
            };
        }
        setFormData(updatedFormData);
      })
    }
    
  };

  const setRegPage = async  () => {
    setNuinfoList(await getCodeListByParentIdApi("nutritionInformation01"))
  };

  const getBrandListForUtil = async  () => {
    const codeList = await getCodeListByParentIdApi("boardBrand")
    //console.log(codeList)
    setBrandList(codeList);
  }

  const saveBoardInfo = async  () => {

    // validation
    if(getBoardName==""){
      alert("제품명을 입력해주세요!");
      return false;
    }

    if(getBrandCodeId==""){
      alert("회사명을 선택해주세요!");
      return false;
    }

    const nuinfoReqDtoList = [];
    const keys = Object.keys(formData);
    const values = Object.values(formData);
    //console.log(keys)
    for(let i=0; i<getNuinfoList.length; i++){
      let inputTrigger = false;
      for(let j=0; j<keys.length; j++){
        if(keys[j] == "nuinfo" + i ){
          let nuinfoCodeId = "nutritionInformation010" + (Number(keys[j].replace("nuinfo",""))+1);
          let nuinfoObject ={};
          nuinfoObject.codeId = nuinfoCodeId;
          nuinfoObject.value = values[j].value;
          nuinfoObject.sn = values[j].sn;
          nuinfoReqDtoList.push(nuinfoObject);
          inputTrigger = true;
        }
      }
      if(inputTrigger == false){
        let nuinfoObject ={
          codeId: "nutritionInformation010" +(i+1),
          value: "",
        };
        nuinfoReqDtoList.push(nuinfoObject)
      }
    }

    const inputData ={
      boardMngrReqDto : {
          boardId: (id === undefined || id === null || id === 'undefined') ? 0 : id,
          boardName: getBoardName,
          brandCodeId : getBrandCodeId,
      },
      nuinfoReqDtoList : nuinfoReqDtoList
    };

    const formFileData = new FormData();
    formFileData.append('multipartFile', getfileImg); // formData에 파일 추가
    formFileData.append('data', JSON.stringify(inputData));
    
    //console.log(inputData)
    boardMngrService.fetcherBoardSave(formFileData).then((outPutData) => {
      console.log(outPutData)
      if(outPutData.result === "SUCCESS" && outPutData.data != null){
        const adminSn = outPutData.data.sn;
        alert("완료되었습니다.")
        goBack();
      }else if (outPutData.data == null){
        alert("오류입니다.")
      }
    })       
  } 

  const deleteBoard = async  () => {

    const inputData ={
      ids: getBoardSn,
    };
    boardMngrService.fetcherBoardDelte(inputData).then((outPutData) => {
      if(outPutData.result === "SUCCESS"){
        alert("완료되었습니다.")
        goBack();
        
      }
    })       
  } 

  const saveBoardName = event => {
    setBoardName(event.target.value);
  };

  const goBack = () => {
    navigate(`/admin/boardMngr`);
  };

  const clickBoardImg = (boardId) => {
    alert("개발중 boardId: " + boardId);
  };

  const saveBoardBrandCodeId = event => {
    setBrandCodeId(event.target.value);
  };

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: {
      ...prevData[name],   // 혹시 모를 다른 필드 유지
      value: value          // value 필드만 업데이트
    }
  }));
};

const changeProfileImage = async (e) =>{
    const reader = new FileReader();
    reader.onload = () => {
        if(reader.readyState === 2){
            setProfileImg(reader.result)
        }
    }
    reader.readAsDataURL(e.target.files[0]);
    setfileImg(e.target.files[0]);
}

  useEffect(() => {
    if(id != null && id !== "" && id !== undefined && id !== "undefined"){
      getBoardByFetcher(id);
    }else{
      setRegPage();
    }
    getBrandListForUtil();
  },[])

  return (
    <div style={{display:"flex", width:"100%", alignContent:"center", marginTop:"1%"}}>
      <Card style={{width:"30%", height:"10%", marginRight:"1%"}}>
        <CardBody>
          <Row>
             <Col sm="6" lg="6" xl="3"
                style={{cursor:"pointer", width:"100%"}}
                onClick={()=>{fileInput.current.click()}}
              >
                <Blog
                  image={getProfileImg}
                  text={`맛 : 3.5 가격 : 3.5 성분 : 3.5`}
                />
                <input accept="image/*" type="file" hidden value={""}  ref={fileInput}  onChange={changeProfileImage}/>
              </Col>
          </Row>
        </CardBody>
      </Card>
      <Card style={{width:"70%"}}>
        <CardBody>
          <CardTitle tag="h5">게시물 상세정보</CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <tbody>
                <tr className="border-top">
                  <td>
                    제품명
                  </td>
                  <td>
                    <Input
                      id="boardName"
                      name="boardName"
                      value={getBoardName}
                      onChange={saveBoardName}
                      type="text"
                    />
                  </td>
                </tr>
                <tr className="border-top">
                  <td>
                    회사명
                  </td>
                  <td>
                    <Input
                      type="select"
                      name="brandCodeId"
                      id="brandCodeId" 
                      style={{width:"30%", marginRight:"3%"}}
                      value={getBrandCodeId}
                      onChange={(e) => saveBoardBrandCodeId(e)}
                    > 
                      <option value={""}>선택</option>
                      {getBrandList.map((tdata, index) => (
                        <option key={index} value={tdata.id}>{tdata.name}</option>
                      ))}   
                    </Input>
                  </td>
                </tr>
                {getNuinfoList.map((tdata, index) => (
                        <tr key={index} className="border-top">
                            <td>
                              {tdata.name}
                            </td>
                            <td style={{display:"flex"}}>
                              <Input
                                id={`nuinfo${index}`}
                                name={`nuinfo${index}`}
                                value={formData[`nuinfo${index}`]?.value ?? ""}
                                onChange={handleChange}
                                type="text"
                                style={{width:"30%"}}
                              />
                              <div style={{marginLeft:"3%"}}>g</div>
                            </td>
                        </tr>
                ))}
            </tbody>
          </Table>
          <div style={{marginBottom:"3%"}} >
            <Button style={{width:"15%", marginRight:"3%", float:"right"}} 
                    color="primary"
                    onClick={() => goBack()}
            >
              목록
            </Button>
            {Object.keys(getBoard).length !== 0 ? (
                          <Button style={{width:"15%", marginRight:"3%", float:"right"}} 
                          color="danger"
                          onClick={() => deleteBoard()}
                          >
                            삭제
                          </Button>
                        ):(
                          <></>
                        ) 
            }
            <Button style={{width:"15%", marginRight:"3%", float:"right"}} 
                    color="primary"
                    onClick={() => saveBoardInfo()}
            >
              저장
            </Button>  
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BoardView;