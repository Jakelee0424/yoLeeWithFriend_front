import { useEffect, React, useState } from "react";
import { useSelector } from "react-redux";
import styles from "style/boardDetail.module.css";
import * as boardService from "service/user/boardMngr/boardService";
import * as boardMngrService from "service/admin/boardMngr/boardMngrService";

const BoardDetail = ({ item, onChange }) => {
  const user = useSelector((state) => state.login);
  const boardId = 6;
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

  // ✅ 게시글 평균 평점 상태
  const [boardRate, setBoardRate] = useState({
    avgTasteRate: 0,
    avgPriceRate: 0,
    avgIngredientRate: 0,
  });

  const saveComment = async () => {
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
      getBoardRate(boardId); // ✅ 저장 후 평점 다시 조회
    }

    setComment("");
    setTasteRating(0);
    setPriceRating(0);
    setIngredientRating(0);
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
      if (result && result.boardMngrResDto) {
        setBoardInfo({
          boardId: result.boardMngrResDto.boardId,
          boardName: result.boardMngrResDto.boardName,
          imgUrl: result.boardMngrResDto.imgUrl || "/no-image.png",
          nutritionInfo: result.nuinfoResDtoList || [],
        });
      }
    });
  };

  useEffect(() => {
    getCommentList(boardId);
    getBoardRate(boardId);
    getBoardByFetcher(boardId);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>보충제 상세 정보</h3>

      <div className={styles.gridContainer}>
        <div className={styles.leftSection}>
          <div className={styles.imageBox}>
            <div className={styles.imageWrapper}>
              <img
                src={boardInfo?.imageUrl || "/no-image.png"}
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
                {(item?.nutritionInfo || []).map((nutrient, idx) => (
                  <div key={idx} className={styles.nutritionRow}>
                    <span>{nutrient.name}</span>
                    <span>{nutrient.value}</span>
                  </div>
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
                  <span>{item?.priceText || "정보 없음"}</span>
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
                  <img src={c.user.profilePath} alt="profile" className={styles.profileImg} />
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
              placeholder="이 보충제에 대한 한줄평을 작성해보세요!"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className={styles.submitButton} onClick={saveComment}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;