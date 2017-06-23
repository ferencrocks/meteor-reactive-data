import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import ReactiveData, { Fields, DataView, DataItems, PrevNextPaginator } from 'meteor/ferencrocks:meteor-reactive-data';

const CustomPaginator = props => {
  return null;
};

const App = () => (
  <ReactiveData
    id="users"
    fields={[
      {key: 'firstName'},
      {key: 'lastName'}
    ]}
    data={[
      {firstName: 'Faluvegi', lastName: 'Ferenc'},
      {firstName: 'Zsiros', lastName: 'Miska'},
      {firstName: 'Faluvegi', lastName: 'Ferenc'},
      {firstName: 'Zsiros', lastName: 'Miska'},
      {firstName: 'Faluvegi', lastName: 'Ferenc'},
      {firstName: 'Zsiros', lastName: 'Miska'},
      {firstName: 'Faluvegi', lastName: 'Ferenc'},
      {firstName: 'Zsiros', lastName: 'Miska'},
      {firstName: 'Faluvegi', lastName: 'Ferenc'},
      {firstName: 'Zsiros', lastName: 'Miska'},
      {firstName: 'Faluvegi', lastName: 'Ferenc'},
      {firstName: 'Zsiros', lastName: 'Miska'}
    ]}
    rowsPerPage={5}
    dataView="table"
  >
    <DataView name="table">
      <table className="table table-bordered">
        <Fields
          render={field => <th>{field.key}</th>}
          wrapper={thead => (
            <thead>
            <tr>{thead}</tr>
            </thead>
          )}
        />

        <DataItems
          render={doc => (
            <Fields
              render={field => <td>{doc[field.key]}</td>}
              wrapper={row => <tr>{row}</tr>}
            />
          )}
          wrapper={content => <tbody>{content}</tbody>}
        />
      </table>

      <PrevNextPaginator />
    </DataView>
  </ReactiveData>
);

Meteor.startup(() => {
  render(<App />, document.getElementById('test-root'));
});