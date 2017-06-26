import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const SortAware = (WrappedComponent) => {
  class SortableProvider extends Component {
    handleSort(direction) {
      if (this.props.direction) console.warn(`Field ${this.props.fieldKey} sort direction is managed!`);
      else this.context.sortBy(this.props.fieldKey, direction);
    }

    render() {
      const { fieldKey, direction, ...otherProps } = this.props;
      const field = this.context.fields.find(field => field.key === fieldKey);

      return (
        <WrappedComponent
          fieldKey={fieldKey}
          direction={direction || field.sort}
          handleSort={this.handleSort.bind(this)}
          {...otherProps}
        />
      );
    }
  }
  SortableProvider.propTypes = {
    fieldKey: PropTypes.string.isRequired,
    direction: PropTypes.number,
  };
  SortableProvider.contextTypes = {
    getInstanceState: PropTypes.func,
    fields: PropTypes.array,
    sortBy: PropTypes.func
  };

  return SortableProvider;
};