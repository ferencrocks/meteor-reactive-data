import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import ContextProvider from './context-provider';
import { defaults } from '../config';

export const DataContainer = createContainer(props => {
  const {
    collection,
    data,

    fields,
    defaultFields,
    filter,
    isReactive,

    page,
    defaultPage,

    defaultRowsPerPage,
    rowsPerPage,

    getInstanceState,
    setInstanceState,

    ...otherProps
  } = props;

  // Managed/instance state/default ?
  const _page = page || getInstanceState('currentPage') || defaultPage || defaults.currentPage;
  const _rowsPerPage = rowsPerPage || getInstanceState('rowsPerPage') || defaultRowsPerPage || defaults.rowsPerPage;
  const _fields = fields || getInstanceState('fields') || defaultFields;

  // Mongo collection or local collection
  let _collection = null;
  if (!!data) {
    _collection = new Meteor.Collection(null);
    data.forEach(doc => _collection.insert(doc));
  }
  else if (!!collection) {
    _collection = collection;
  }
  else {
    throw new Error('[MeteorReactiveData] You must provide either a "collection" or a "data" prop to <ReactiveData>');
  }

  // Building the query
  const findOptions = {
    reactive: !!isReactive,

    fields: _fields.reduce((acc, fieldDef) => {
      acc[fieldDef.key] = 1;
      return acc;
    }, {}),

    sort: _fields.reduce((acc, fieldDef) => {
      if (fieldDef.sort) acc[fieldDef.key] = fieldDef.sort;
      return acc;
    }, {}),
  };

  // Executing the queries
  const _filter = filter || {};
  const rowCountCursor = _collection.find(_filter, findOptions);
  const cursor = _collection.find(_filter, {
    ...findOptions,
    limit: _rowsPerPage,
    skip: _page * _rowsPerPage
  });

  // Returning the props
  return {
    fields: _fields,
    currentPage: _page,
    rowsPerPage: _rowsPerPage,
    dataCount: rowCountCursor.count(),
    data: cursor.fetch(),
    ...otherProps
  };
}, ContextProvider);