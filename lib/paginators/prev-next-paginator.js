import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Paginator } from './paginator';

class PrevNext extends Component
{
  render() {
    return (
      <section className="mrd--pagination">
        <button
            disabled={!this.props.isPreviousAvailable}
            onClick={this.props.handlePreviousClick}
        >Previous</button>
        <button
            disabled={!this.props.isNextAvailable}
            onClick={this.props.handleNextClick}
        >Next</button>
      </section>
    );
  }
}
PrevNext.propTypes = {
  isPreviousAvailable: PropTypes.bool.isRequired,
  isNextAvailable: PropTypes.bool.isRequired,

  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired
};

export const PrevNextPaginator = Paginator(PrevNext);