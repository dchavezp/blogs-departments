import {
  Pagination as PaginationH,
  usePagination,
  DOTS,
} from "@/hooks/usePagination";
import React from "react";
import IconButton from "../IconButton";
import { FcPrevious, FcNext } from "react-icons/fc";
import styles from "./pagination.module.css";
interface PaginationProps extends PaginationH {
  onPageChange: (page: number | string) => void;
}

function Pagination({
  totalCount,
  currentPage,
  siblingCount = 1,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (currentPage === 0 || paginationRange.length < 1) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className={styles.container}>
      <IconButton
        active={false}
        onClick={currentPage !== 1 ? onPrevious : () => {}}
      >
        <FcPrevious />
      </IconButton>
      <div className={styles.pages}>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <div key={`dots-${index}`} className="px-3 py-1">
                &#8230;
              </div>
            );
          }
          return (
            <IconButton
              key={`pi-${index}`}
              active={pageNumber === currentPage}
              onClick={() => {
                onPageChange(pageNumber);
              }}
            >
              {pageNumber}
            </IconButton>
          );
        })}
      </div>
      <IconButton
        active={false}
        onClick={currentPage !== lastPage ? onNext : () => {}}
      >
        <FcNext />
      </IconButton>
    </div>
  );
}

export default Pagination;
