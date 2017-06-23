import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const Sortable = (SortableComponent) => {
  class SortableProvider extends Component {
    handleSort(direction) {
      this.context.sortBy(this.props.key, direction);
    }

    render() {
      const { key, direction } = this.props;
      return (
        <SortableComponent
          {...this.props}
          key={this.props.key}
          direction={this.props.direction}
          handleSort={this.handleSort.bind(this)}
        />
      );
    }
  }
  SortableProvider.propTypes = {
    key: PropTypes.string
  };
  SortableProvider.contextTypes = {
    getInstanceState: PropTypes.func,
    fields: PropTypes.array,
    sortBy: PropTypes.func
  };

  return SortableProvider;
};