import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import InstanceState from './instance-state';
import { defaults } from './config';

import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

/**************** Base Component *******************/
class ContextProvider extends Component
{
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      fields: this.props.fields,
      data: this.props.data,
      dataCount: this.props.dataCount,
      rowsPerPage: this.props.rowsPerPage,
      currentPage: this.props.currentPage,
      dataView: this.props.dataView
    };
  }

  _selectPage(page) {
    Session.set('_mrd_currentPage', page);
  }

  render() {
    return (
      <div className="mrd--reactive-data-container" id={`mrd--reactive-data-instance--${this.props.instanceState.instanceId}`}>
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
  instanceState: PropTypes.object.isRequired,
  data: PropTypes.array,
  dataCount: PropTypes.number,
  activeView: PropTypes.string
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
  selectPage: PropTypes.func
};

/****************** Container *********************/
const Container = createContainer(props => {
  const {
    instanceState,
    collection,
    data,
    localCollection,
    filter,
    fields,
    rowsPerPage,
    ...otherProps
  } = props;

  const currPg = instanceState.get('currentPage') || defaults.currentPage;
  const rpp = instanceState.get('rowsPerPage') || rowsPerPage || defaults.rowsPerPage;

  let _collection = null;
  if (!!data) {
    data.forEach(doc => localCollection.insert(doc));
    _collection = localCollection;
  }
  else if (!!collection) {
    _collection = collection;
  }
  else {
    throw new Error('[MeteorReactiveData] You must provide either a "collection" or a "data" prop to <ReactiveData>');
  }

  const findOptions = {
    fields: fields.reduce((acc, fieldDef) => {
      acc[fieldDef.key] = 1;
      return acc;
    }, {})
  };
  const rowCountCursor = _collection.find(filter, findOptions);
  const cursor = _collection.find(filter, {
    ...findOptions,
    limit: rpp,
    skip: currPg * rpp
  });

  return {
    fields,
    currentPage: currPg,
    rowsPerPage: rpp,
    dataCount: rowCountCursor.count(),
    data: cursor.fetch(),
    instanceState,
    ...otherProps
  };
}, ContextProvider);


/***************** Instance ************************/
export class ReactiveData extends Component
{
  instanceState;
  localCollection;

  constructor(props) {
    super(props);
    this.localCollection = new Meteor.Collection(null);
    this.instanceState = new InstanceState({ persistentStorage: props.persistentStorage });

    this.state = {
      currentPage: 0,
      rowsPerPage: 10
    };
  }

  setInstanceState(key, value) {
    this.setState({ key: value });
  }

  getInstanceState(key) {
    return this.state[key];
  }

  render() {
    const {id, ...props} = this.props;
    return (
      <Container
        instanceId={id}
        instanceState={this.instanceState}
        defaultState={{}}
        localCollection={this.localCollection}
        {...props}
      />
    );
  }
}
ReactiveData.propTypes = {
  id: PropTypes.string.isRequired,
  collection: PropTypes.object,
  reactiveData: PropTypes.bool,
  data: PropTypes.array,
  fields: PropTypes.array.isRequired,
  filter: PropTypes.object,
  persistentStorage: PropTypes.object,
  defaultPage: PropTypes.number,
  rowsPerPage: PropTypes.number,
  dataView: PropTypes.string
};
ReactiveData.defaultProps = {
  filter: {}
};