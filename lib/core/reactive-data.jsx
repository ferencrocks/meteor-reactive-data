import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { DataContainer } from '../core/data-container';

export default class ReactiveData extends Component
{
  constructor(props) {
    super(props);

    // Internal state is used if one (or more) of these states aren't controlled from outside
    this.state = {
      currentPage: 0,
      rowsPerPage: 10,
      fields: props.defaultFields
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.defaultFields) {
      this.setState({ fields: newProps.defaultFields });
    }
  }

  setInstanceState(key, value) {
    const stateChange = {[key]: value};
    this.setState(stateChange);
    if (typeof this.props.onStateChange === 'function') {
      this.props.onStateChange(stateChange, {...this.state, ...stateChange});
    }
  }

  getInstanceState(key) {
    return this.state[key];
  }

  render() {
    const {id, ...props} = this.props;
    return (
      <DataContainer
        instanceId={id}
        setInstanceState={this.setInstanceState.bind(this)}
        getInstanceState={this.getInstanceState.bind(this)}
        {...props}
      />
    );
  }
}
ReactiveData.propTypes = {
  id: PropTypes.string.isRequired,

  data: PropTypes.array,
  collection: PropTypes.object,
  isReactive: PropTypes.bool,

  fields: PropTypes.array,
  defaultFields: PropTypes.array,

  page: PropTypes.number,
  defaultPage: PropTypes.number,

  rowsPerPage: PropTypes.number,
  defaultRowsPerPage: PropTypes.number,

  dataView: PropTypes.string,

  // Events
  onStateChange: PropTypes.func
};
ReactiveData.defaultProps = {
  defaultFields: []
};