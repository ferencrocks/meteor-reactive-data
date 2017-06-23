import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class DataView extends Component
{
  render() {
    const isVisible = (this.context.dataView && this.props.name === this.context.dataView) || (!this.props.dataView && this.props.default);
    if (isVisible)
      return (
        <div className="mrd--view-container">
          {this.props.children}
        </div>
      );
    else
      return null;
  }
}
DataView.propTypes = {
  name: PropTypes.string,
  default: PropTypes.string
};
DataView.contextTypes = {
  dataView: PropTypes.string
};