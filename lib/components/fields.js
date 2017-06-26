import React, { Component } from 'react';
import PropTyes from 'prop-types';

const notHidden = fields => fields.filter(field => !field.hidden);

export class Fields extends Component
{
  renderFields() {
    return this.props.render( notHidden(this.context.fields) );
  }

  renderEachField() {
    const fields = notHidden(this.context.fields).map(
      field => React.cloneElement(this.props.renderEach(field), { key: field.key })
    );
    return this.props.wrapper(fields);
  }

  render() {
    if (_.isFunction(this.props.renderEach)) return this.renderEachField();
    else if (_.isFunction(this.props.render)) return this.renderFields();
    else return null;
  }
}
Fields.propTypes = {
  renderEach: PropTyes.func,
  render: PropTyes.func,
  wrapper: PropTyes.func
};
Fields.defaultProps = {
  wrapper: content => <div>{content}</div>
};
Fields.contextTypes = {
  fields: PropTyes.array
};