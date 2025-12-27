import React, { FC } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  onPageChange: (event: { selected: number }) => void;
  pageCount: number;
  forcePage?: number;
}

export default function Pagination({ onPageChange, pageCount, forcePage }: PaginationProps) {
    return (
    <ReactPaginate
      activeClassName={`${styles.item} ${styles.active}`}
      containerClassName={styles.pagination}
      disabledClassName={`${styles["disabled-page"]}`}
      onPageChange={onPageChange}
      marginPagesDisplayed={2}
       pageCount={pageCount}
      nextClassName={`${styles.item} ${styles.next}`}
      pageClassName={`${styles.item} ${styles["pagination-page"]}`}
      previousClassName={`${styles.item} ${styles.previous}`}
      breakLabel="..."
      nextLabel=">"
      pageRangeDisplayed={2}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={forcePage}
    />
  );
}