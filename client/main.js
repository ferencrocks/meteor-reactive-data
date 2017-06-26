import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { render } from 'react-dom';

import ReactiveData, { FieldsAware, SortAware, DataAware, DataView, PrevNextPaginator, Sortable } from 'meteor/ferencrocks:meteor-reactive-data';

const dummyData = [];
for (let i = 0; i < 100; i++) dummyData.push({
    firstName: 'First Name #' + i,
    lastName: 'Last Name #' + i
});

const TableHead = SortAware(
  ({ direction, handleSort, children }) => {
    const directionArrow = direction => {
      if (direction === 1) return (<span>&uarr;</span>);
      else if (direction === -1) return (<span>&darr;</span>);
      else return null;
    };

    return (
      <th onClick={() => handleSort()}>
        {children} {directionArrow(direction)}
      </th>
    )
  }
);

const TableHeadRow = FieldsAware(
  ({fields}) => {
    return (
      <thead>
        <tr>{fields.map(field => <TableHead key={field.key} fieldKey={field.key}>{field.key}</TableHead>)}</tr>
      </thead>
    );
  }
);

const TableBody = ({ data, fields }) => {
  return (
    <tbody>
    {data.map(row => (
      <tr key={row._id}>
        {fields.map(field => (
          <td key={field.key}>{row[field.key]}</td>
        ))}
      </tr>
    ))}
    </tbody>
  );
};
const TableData = DataAware(FieldsAware(TableBody));


const App = () => (
  <ReactiveData
    id="users"
    defaultFields={[
      {key: 'firstName'},
      {key: 'lastName', sort: 1}
    ]}
    filter={{firstName: new RegExp('5')}}
    data={dummyData}
    rowsPerPage={5}
    dataView="table"
    onStateChange={(change, newState) => console.log(change, newState)}
  >
    <DataView name="table">
      <table className="table table-bordered">
        <TableHeadRow />
        <TableData />
      </table>
      <PrevNextPaginator />
    </DataView>
  </ReactiveData>
);

Meteor.startup(() => {
  render(<App />, document.getElementById('test-root'));
});