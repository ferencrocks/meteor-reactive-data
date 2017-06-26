import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContextProvider extends Component
{
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      // Read state
      fields: this.props.fields,
      data: this.props.data,
      dataCount: this.props.dataCount,
      rowsPerPage: this.props.rowsPerPage,
      currentPage: this.props.currentPage,
      dataView: this.props.dataView,

      // Write state
      setCurrentPage: this.setCurrentPage.bind(this),
      sortBy: this.sortBy.bind(this)
    };
  }

  // Instance state manipulation
  setCurrentPage(page) {
    this.props.setInstanceState('currentPage', page);
  }

  sortBy(fieldKey, direction = 'auto') {
    const nextDirection = direction => {
      switch (direction) {
        case 1: return -1;
        case -1: return null;
        default: return 1;
      }
    };

    const fields = this.props.getInstanceState('fields');
    if (fields === null) return; // the fields are managed, can't change the sort directions

    const fieldFound = fields.find(item => item.key === fieldKey);
    if (fieldFound) {
      if (direction === 'auto') fieldFound.sort = nextDirection(fieldFound.sort);
      else fieldFound.sort = direction;
      this.props.setInstanceState('fields', fields.map(field => field.key === fieldKey ? fieldFound : field));
    }
    else {
      throw new Error(`The field with key ${fieldKey} can't be found!`);
    }
  }

  render() {
    return (
      <div className="mrd--reactive-data-container" id={`mrd--reactive-data-instance--${this.props.instanceId}`}>
        {this.props.children}
      </div>
    );
  }
}
// PropTypes
ContextProvider.propTypes = {
  collection: PropTypes.object,
  fields: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  data: PropTypes.array,
  dataCount: PropTypes.number,
  activeView: PropTypes.string,

  setInstanceState: PropTypes.func.isRequired,
  getInstanceState: PropTypes.func.isRequired
};
ContextProvider.defaultProps = {
  filters: {},
  data: []
};
// Context types
ContextProvider.childContextTypes = {
  fields: PropTypes.array,
  data: PropTypes.array,
  dataCount: PropTypes.number,
  rowsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  dataView: PropTypes.string,

  setCurrentPage: PropTypes.func,
  sortBy: PropTypes.func
};