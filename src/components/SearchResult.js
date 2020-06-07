import React from "react";
import PropTypes from 'prop-types';

const SearchResult = ({result}) => {
  return (
    <div>{result}</div>
  );
}

SearchResult.propTypes = {
  result: PropTypes.object
};

export default SearchResult;
