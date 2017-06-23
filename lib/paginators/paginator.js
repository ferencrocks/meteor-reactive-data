import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const Paginator = (PaginatorComponent) => {
  class PaginatorProvider extends Component {
    render() {
      const {
        dataCount,
        rowsPerPage,
        currentPage,
      } = this.context;
      const pageCount = Math.ceil(dataCount / rowsPerPage);

      return (
        <PaginatorComponent
          // paginator state
          dataCount={dataCount}
          pageCount={pageCount}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}

          // flags
          isPreviousAvailable={currentPage > 0}
          isNextAvailable={currentPage < (pageCount - 1)}

          // events
          onPreviousClick={() => {}}
          onNextClick={() => {}}
          onPageClick={() => {}}
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
  };

  return PaginatorProvider;
};