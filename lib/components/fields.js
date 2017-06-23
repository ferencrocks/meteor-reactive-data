import React, { Component } from 'react';
import PropTyes from 'prop-types';

notHidden = fields => fields.filter(field => !field.hidden);

export class Fields extends Component
{
  renderFieldsAtOnce() {
    return this.props.renderAllAtOnce( notHidden(this.context.fields) );
  }

  renderEachField() {
    const fields = notHidden(this.context.fields).map(
      field => React.cloneElement(this.props.render(field), { key: field.key })
    );
    return this.props.wrapper(fields);
  }

  render() {
    if (_.isFunction(this.props.render)) return this.renderEachField();
    else if (_.isFunction(this.props.renderAllAtOnce)) return this.renderFieldsAtOnce();
    else return null;
  }
}
Fields.propTypes = {
  render: PropTyes.func,
  renderAtOnce: PropTyes.func,
  wrapper: PropTyes.func
};
Fields.defaultProps = {
  wrapper: content => <div>{content}</div>
};
Fields.contextTypes = {
  fields: PropTyes.array
};