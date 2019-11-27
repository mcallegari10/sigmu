import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import Loading from '../Spinner/components/loading';

import { DEFAULT_MAX_DURATION } from './constants';

function CustomSuspense({ fallback, children }) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

CustomSuspense.defaultProps = {
  fallback: <Loading />,
  maxDuration: DEFAULT_MAX_DURATION
};

CustomSuspense.propTypes = {
  fallback: PropTypes.element,
  maxDuration: PropTypes.number
};

export default CustomSuspense;
