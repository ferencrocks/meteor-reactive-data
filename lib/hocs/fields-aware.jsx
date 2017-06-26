import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const FieldsAware = (WrappedComponent) => {
  class FieldsProvider extends Component {
    render() {
      return (
        <WrappedComponent
          fields={this.context.fields}
          {...this.props}
        />
      );
    }
  }
  FieldsProvider.contextTypes = {
    fields: PropTypes.array
  };

  return FieldsProvider;
};