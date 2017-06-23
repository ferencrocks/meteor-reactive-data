import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Paginator } from './paginator';

class _PrevNextPaginator extends Component
{
  render() {
    return (
      <section className="mrd--pagination">
        <button
          disabled={!this.props.isPreviousAvailable}
        >Previous</button>
        <button disabled={!this.props.isNextAvailable}>Next</button>
      </section>
    );
  }
}
_PrevNextPaginator.propTypes = {
  isPreviousAvailable: PropTypes.bool.isRequired,
  isNextAvailable: PropTypes.bool.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired
};

export const PrevNextPaginator = Paginator(_PrevNextPaginator);