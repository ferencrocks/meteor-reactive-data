import React, { Component } from 'react';
import PropTyes from 'prop-types';

export class DataItems extends Component
{
  renderAllAtOnce() {
    return this.props.renderAllAtOnce(this.context.data, this.context.fields);
  }

  renderEachItem() {
    // const indexedFields = this.context.fields.reduce((acc, field) => {
    //   acc[field.key] = field;
    //   return field;
    // }, {});

    const items = this.context.data.map(
      item => React.cloneElement(this.props.render(item), { key: item._id })
    );
    return this.props.wrapper(items)
  }

  render() {
    if (_.isFunction(this.props.render)) return this.renderEachItem();
    else if (_.isFunction(this.props.renderAllAtOnce)) return this.renderAllAtOnce();
    else return null;
  }
}
DataItems.propTypes = {
  render: PropTyes.func,
  renderAtOnce: PropTyes.func,
  wrapper: PropTyes.func
};
DataItems.defaultProps = {
  wrapper: content => <div>{content}</div>
};
DataItems.contextTypes = {
  data: PropTyes.array,
  fields: PropTyes.array
};