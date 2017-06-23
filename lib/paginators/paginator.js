import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const Paginator = (PaginatorComponent) => {
  class PaginatorProvider extends Component {
    render() {
      const {
        dataCount,
        rowsPerPage,
        currentPage,
        setCurrentPage
      } = this.context;

      const pageCount = Math.ceil(dataCount / rowsPerPage);
      const isPageAvailable = (page) => page >= 0 && page < pageCount;

      return (
        <PaginatorComponent
          // paginator state
          dataCount={dataCount}
          pageCount={pageCount}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}

          // flags
          isPreviousAvailable={isPageAvailable(currentPage - 1)}
          isNextAvailable={isPageAvailable(currentPage + 1)}

          // events
          handlePreviousClick={() => isPageAvailable(currentPage - 1) && setCurrentPage(currentPage - 1)}
          handleNextClick={() => isPageAvailable(currentPage + 1) && setCurrentPage(currentPage + 1)}
          handlePageClick={page => isPageAvailable(page) && setCurrentPage(page)}
          onRowsPerPageChange={() => {}}

          // everything else
          {...this.props}
        />
      );
    }
  }
  PaginatorProvider.contextTypes = {
    dataCount: PropTypes.number,
    rowsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func
  };

  return PaginatorProvider;
};