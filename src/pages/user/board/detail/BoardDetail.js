import { useEffect, React, useState } from "react";
import { useSelector } from "react-redux";
import styles from "style/boardDetail.module.css";
import * as boardService from "service/user/boardMngr/boardService";
import * as boardMngrService from "service/admin/boardMngr/boardMngrService";
import { useLocation } from 'react-router-dom';

const BoardDetail = ({ item, onChange }) => {
  const query = new URLSearchParams(useLocation().search);  
  const boardId = query.get('boardId'); // 'myParam'에 해당하는 쿼리 파라미터 값 가져오기
  const user = useSelector((state) => state.login);
  item = {
    imageUrl: "/no-image.png",
    nutritionInfo: [
      { name: "단백질", value: "25g" },
      { name: "탄수화물", value: "10g" },
    ],
    priceText: "1스쿱당 1,200원",
    manufacturer: "머슬팜코리아",
    productName: "컴뱃 100% 웨이",
    comment: "",
  };

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [tasteRating, setTasteRating] = useState(0);
  const [priceRating, setPriceRating] = useState(0);
  const [ingredientRating, setIngredientRating] = useState(0);
  const [boardInfo, setBoardInfo] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const [commentId, setCommentId] = useState(0);

  // ✅ 게시글 평균 평점 상태
  const [boardRate, setBoardRate] = useState({
    avgTasteRate: 0,
    avgPriceRate: 0,
    avgIngredientRate: 0,
  });

  const saveComment = async () => {

    if(!user.id){
       alert("한줄평 등록은 로그인 후 가능합니다.")
       return false;
    } 

    if (comment.trim() === "") {
      alert("한줄평 내용을 입력해주세요.");
      return false;
    }

    const newComment = {
      boardId: boardId,
      userId: user.id,
      content: comment,
      tasteRate: tasteRating,
      priceRate: priceRating,
      ingredientRate: ingredientRating,
    };
    
    const result = await boardService.fetcherSaveBoardComment(JSON.stringify(newComment));
    if (result.data == "Y") {
      getCommentList(boardId);
      getBoardRate(boardId);
      getBoardByFetcher(boardId);
      getCommentCount(boardId); // ✅ 저장 후 평점 다시 조회
    }


  };

  const modifyComment = async () => {

    if (comment.trim() === "") {
      alert("한줄평 내용을 입력해주세요.");
      return false;
    }

    if(window.confirm("한줄평을 수정하시겠습니까? ")){
    const data = { commentId: commentId ,
      userId: user.id,
      content: comment,
      tasteRate: tasteRating,
      priceRate: priceRating,
      ingredientRate: ingredientRating,
    };
    const boardList = await boardService
          .modifyComment(JSON.stringify(data)).then((result) => result.data);
    }
    alert("수정되었습니다.")
    getCommentList(boardId);
    getBoardRate(boardId);
    getBoardByFetcher(boardId);
    getCommentCount(boardId);
  };

  const renderStars = (score) => {
    if (!score) return "평가 없음";
    const rounded = Math.round(score); // 소수점 반올림
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  };

  const StarSelector = ({ value, onChange }) => (
    <div className={styles.starSelector}>
      {[1, 2, 3, 4, 5].map((v) => (
        <span
          key={v}
          className={v <= value ? styles.filledStar : styles.emptyStar}
          onClick={() => onChange(v)}
        >
          ★
        </span>
      ))}
    </div>
  );
  
  // 한줄평 조회 함수
  const getCommentList = async (boardId) => {
    const data = { boardId: boardId };
    const commentList = await boardService
      .fetcherGetBoardCommentById(JSON.stringify(data))
      .then((result) => result.data);
      console.log(commentList)
    setComments(commentList);
  };

  // 게시글 평점 함수
  const getBoardRate = async (boardId) => {
    const data = { boardId: boardId };
    const boardRate = await boardService
      .fetcherGetBoardRateById(JSON.stringify(data))
      .then((result) => result.data);

    // ✅ 상태에 저장
    setBoardRate(boardRate || { avgTasteRate: 0, avgPriceRate: 0, avgIngredientRate: 0 });
  };

  // 보충제 정보 조회 함수
  const getBoardByFetcher = async  (boardId) => {
    const data = { boardId: boardId };
    boardMngrService.fetcherBoard(data).then((result) => {
      console.log(result)
      if (result.data && result.data.boardMngrResDto) {
        let priceText = 0;
        if(result.data.nuinfoResDtoList.length > 8){
          priceText = result.data.nuinfoResDtoList[8].value;
        }
        setBoardInfo({
          boardId: result.data.boardMngrResDto.boardId,
          boardName: result.data.boardMngrResDto.boardName,
          imgUrl: result.data.boardMngrResDto.imgUrl || "/no-image.png",
          nutritionInfo: result.data.nuinfoResDtoList || [],
          priceText : priceText
        });
      }
    });
  };

  const getNutriInfoName = (code) =>{
    let codeName = "";
    switch (code) {
      case 'nutritionInformation0101':
        codeName = "단백질";
        break;
      case 'nutritionInformation0102':
        codeName = "당류";
        break;
      case 'nutritionInformation0103':
        codeName = "지방";
        break;  
      case 'nutritionInformation0104':
        codeName = "칼로리";
        break;
      case 'nutritionInformation0105':
        codeName = "콜레스테롤";
        break;  
      case 'nutritionInformation0106':
        codeName = "나트륨";
        break;
      case 'nutritionInformation0107':
        codeName = "칼륨";
        break;
      case 'nutritionInformation0108':
        codeName = "탄수화물";
        break;
      case 'nutritionInformation0109':
        codeName = "가격";
        break;      
      default:
        codeName = "";
    }
    return codeName;
  }

  const fallbackImage = process.env.PUBLIC_URL + "/asset/images/BSN 신타6 엣지 1.92kg 초코 (48회분).png";
  const fallbackImage2 = process.env.PUBLIC_URL + "/asset/images/profileImg.png";
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

  const resolveImageUrl2 = (imgUrl) => {
    if (!imgUrl) return fallbackImage2;
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
        return fallbackImage2;
      }
    }
  };

  const getCommentCount = async (boardId)=>{
    const data = { boardId: boardId, userId: user.id };
    const result = await boardService
      .fetcherGetCountByUserIdAndDelYn(JSON.stringify(data))
      .then((result) => result.data);
    if(result.count > 0){
      const tempData = { commentId: result.commentId, userId: user.id };
      const comment = await boardService
      .fetcherGetCommentbyCommentIdAndDelYn(JSON.stringify(tempData))
      .then((result) => result.data);
      console.log(comment)
      setComment(comment.content);
      setCommentId(comment.commentId)
      setTasteRating(comment.tasteRate);
      setPriceRating(comment.priceRate);
      setIngredientRating(comment.ingredientRate);

    }
    
    setCommentCount(result.count)
  }

  const deleteComment = async (commentId) =>{
      if(window.confirm("한줄평을 삭제하시겠습니까? ")){
        const data = { commentId: commentId };
        const boardList = await boardService
            .deleteComment(JSON.stringify(data)).then((result) => result.data);
        setComment("")
        setIngredientRating(0)
        setPriceRating(0)
        setTasteRating(0)
        getCommentList(boardId);
        getBoardRate(boardId);
        getBoardByFetcher(boardId);
        getCommentCount(boardId);
      }
    }

  useEffect(() => {
    getCommentList(boardId);
    getBoardRate(boardId);
    getBoardByFetcher(boardId);
    getCommentCount(boardId);
    
  }, []);

  useEffect(() => {
    getCommentCount(boardId);
    
  }, []);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>보충제 상세 정보</h3>

      <div className={styles.gridContainer}>
        <div className={styles.leftSection}>
          <div className={styles.imageBox}>
            <div className={styles.imageWrapper}>
              <img
                src={`${resolveImageUrl(boardInfo?.imgUrl)}`}
                alt="보충제 이미지"
                className={styles.image}
              />
            </div>
            <div className={styles.manufacturerBox}>
              <div className={styles.manufacturer}>{boardInfo?.brandCodeId}</div>
              <div className={styles.productName}>{boardInfo?.boardName}</div>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.ratingSection}>
            <div className={styles.ratingItem}>
              <h4 className={styles.sectionTitle}>맛</h4>
              <span className={styles.ratingValue}>
                {boardRate?.avgTasteRate ? boardRate.avgTasteRate.toFixed(1) : "-"} ({renderStars(boardRate?.avgTasteRate)})
              </span>
            </div>
            <div className={styles.ratingItem}>
              <h4 className={styles.sectionTitle}>가격</h4>
              <span className={styles.ratingValue}>
                {boardRate?.avgPriceRate ? boardRate.avgPriceRate.toFixed(1) : "-"} ({renderStars(boardRate?.avgPriceRate)})
              </span>
            </div>
            <div className={styles.ratingItem}>
              <h4 className={styles.sectionTitle}>성분</h4>
              <span className={styles.ratingValue}>
                {boardRate?.avgIngredientRate ? boardRate.avgIngredientRate.toFixed(1) : "-"} ({renderStars(boardRate?.avgIngredientRate)})
              </span>
            </div>
          </div>

          <div className={styles.sectionBlock}>
            <div className={styles.grayBox}>
              <h4 className={styles.sectionTitle}>영양정보</h4>
              <div className={styles.infoInnerBox}>
                {(boardInfo?.nutritionInfo || []).map((nutrient, idx) => (
                  idx !== 8 && (
                    <div key={idx} className={styles.nutritionRow}>
                      <span>{getNutriInfoName(nutrient.codeId)}</span>
                      <span>{nutrient.value}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          <div className={styles.sectionBlock}>
            <div className={styles.grayBox}>
              <h4 className={styles.sectionTitle}>가격</h4>
              <div className={styles.infoInnerBox}>
                <div className={styles.nutritionRow}>
                  <span>가격</span>
                  <span>{boardInfo?.priceText || "정보없음"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 한줄평 영역 그대로 */}
      <div className={styles.bottomCommentSection}>
        <h4 className={styles.sectionTitle}>한줄평</h4>

        <div className={styles.commentRow}>
          <div className={styles.commentListBox}>
            {comments.length === 0 ? (
              <div className={styles.emptyComment}>등록된 한줄평이 없습니다.</div>
            ) : (
              comments.map((c, idx) => (
                <div key={idx} className={styles.commentItem}>
                  <img src={resolveImageUrl2(c.imgUrl)} alt="profile" className={styles.profileImg} />
                  <div className={styles.commentContentBox}>
                    <div className={styles.nickName}>{c.user.nickName}</div>
                    <div className={styles.commentContent}>{c.content}</div>
                  </div>
                  <div className={styles.commentRatings}>
                    <div>맛: {renderStars(c.tasteRate)}</div>
                    <div>가격: {renderStars(c.priceRate)}</div>
                    <div>성분: {renderStars(c.ingredientRate)}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.commentInputBox}>
            <div className={styles.ratingInputRow}>
              <label>맛</label>
              <StarSelector value={tasteRating} onChange={setTasteRating} />
              <label>가격</label>
              <StarSelector value={priceRating} onChange={setPriceRating} />
              <label>성분</label>
              <StarSelector value={ingredientRating} onChange={setIngredientRating} />
            </div>

            <textarea
              className={styles.textarea}
              placeholder="작성 한줄평이 부적절하거나, 서비스 운영 정책에 어긋나는 글의 경우 관리자에 의해 삭제될 수 있습니다.’"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {commentCount !=0 ?
              (
                <div style={{
                  display:"flex",
                  justifyContent: "flex-end",
                  gap:"20"
                }}>
                  <button className={styles.submitButton} onClick={modifyComment}>수정</button>
                  <button className={styles.submitButton} onClick={() => deleteComment(commentId)}>삭제</button>
                </div>
              )
              :
              (
                <button className={styles.submitButton} onClick={saveComment}>등록</button>
              )
            } 
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;