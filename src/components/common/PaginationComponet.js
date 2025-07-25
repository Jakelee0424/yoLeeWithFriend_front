import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const ITEMS_PER_PAGE = 10;
const TOTAL_COUNT = 123; // 예: 서버에서 받은 전체 데이터 개수
const PAGE_BLOCK_SIZE = 10; // 한 번에 보여줄 페이지 수

const PaginationComponet = ({itemsPerPage, totalCount, pageBlockSize, currentPage, setCurrentPage}) => {
  

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const dispatch = useDispatch();
  const searchState = useSelector(state => state.search);
  const handleClick = (page) => {
    setCurrentPage(page);
    
    dispatch({
      type: "search",
      payload: {
        data: {
          ...searchState.data,    // 현재 상태를 직접 병합
          currentPage: page
        }
      }
    });

  };


  const renderPagination = () => {
    const pages = [];
    const currentBlock = Math.floor((currentPage - 1) / pageBlockSize);
    const startPage = currentBlock * pageBlockSize + 1;
    const endPage = Math.min(startPage + pageBlockSize - 1, totalPages);
     // 처음 / 이전
    pages.push(
      <PaginationItem disabled={currentPage === 1} key="first">
        <PaginationLink first onClick={() => handleClick(1)} />
      </PaginationItem>
    );
    pages.push(
      <PaginationItem disabled={currentPage === 1} key="prev">
        <PaginationLink previous onClick={() => handleClick(currentPage - 1)} />
      </PaginationItem>
    );

    // 블록 페이지들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem active={i === currentPage} key={i}>
          <PaginationLink onClick={() => handleClick(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }

    // 다음 / 마지막
    pages.push(
      <PaginationItem disabled={currentPage === totalPages} key="next">
        <PaginationLink next onClick={() => handleClick(currentPage + 1)} />
      </PaginationItem>
    );
    pages.push(
      <PaginationItem disabled={currentPage === totalPages} key="last">
        <PaginationLink last onClick={() => handleClick(totalPages)} />
      </PaginationItem>
    );

    return <Pagination>{pages}</Pagination>;
  };

  return (
    <div className="p-4">
      <div className="mt-3">{renderPagination()}</div>
    </div>
  );
};

export default PaginationComponet;