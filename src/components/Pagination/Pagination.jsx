import style from "./Pagination.module.css";

export const Pagination = ({
    dogsCardsPerPage,
    allDogs,
    pagination,
    paginationPrev,
    paginationNext,
    currentPage,
  }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(allDogs / dogsCardsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
  
      <div className={style.margin}>
        <div className={style.pagination} onClick={paginationPrev}>
          <a>{`<`}</a>
        </div>
        &nbsp;
        {pageNumbers.map((number) => (
          <div className={currentPage === number? style.currentPage : style.pagination}
            key={number}
            onClick={() => pagination(number)}
          >
            {number}
          </div>
        ))}
        &nbsp;
        <div className={style.pagination} onClick={paginationNext}>
          <a>{`>`}</a>
        </div>
      </div>
    );
  };