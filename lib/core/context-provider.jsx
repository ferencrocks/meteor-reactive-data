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

  sortBy(fieldKey, direction) {
    const fields = this.props.getInstanceState('fields');
    if (fields && fields[fieldKey]) {
      this.props.setInstanceState('fields', {...fields, [fieldKey]: {}});
    }
    else {
      throw new Error(`The fields are managed or the field with key ${fieldKey} can't be found!`);
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