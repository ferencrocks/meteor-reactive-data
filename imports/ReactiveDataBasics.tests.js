import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import ReactiveData, { Fields, DataView, DataItems, PrevNextPaginator, Sortable } from 'meteor/ferencrocks:meteor-reactive-data';

describe('ReactiveData basics', function() {
  it('should render', function() {
    const reactiveData = shallow(<ReactiveData id="test" />);

  });
});