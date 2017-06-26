import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const DataAware = (WrappedComponent) => {
  class DataProvider extends Component {
    render() {
      return (
        <WrappedComponent
          data={this.context.data}
          {...this.props}
        />
      );
    }
  }
  DataProvider.contextTypes = {
    data: PropTypes.array
  };
  return DataProvider;
};