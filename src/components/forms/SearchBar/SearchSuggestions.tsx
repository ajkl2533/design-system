import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isNotNull } from 'ramda-adjunct';

import {
  getColor,
  getDepth,
  getFontSize,
  getRadii,
  pxToRem,
} from '../../../utils';
import { useOuterClick } from '../../../hooks/useOuterCallback';
import {
  SearchSuggestionPropType,
  SearchSuggestionsPaneProps,
} from './SearchSuggestions.types';

const SearchSuggestionsPane = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid ${getColor('neutral.600')};
  border-radius: ${getRadii('default')};
  background-color: ${getColor('neutral.0')};
  padding: ${pxToRem(8, 0)};
  z-index: ${getDepth('dropdown')};
  min-width: 100%;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SearchSuggestionsLink = styled.button`
  width: 100%;
  display: block;
  padding: ${pxToRem(4, 16)};
  height: ${pxToRem(24)};
  font-size: ${getFontSize('md')};
  line-height: ${pxToRem('md')};
  color: ${getColor('neutral.900')};
  cursor: pointer;
  background: transparent;
  border: 0 none;
  text-align: left;

  &:hover {
    background: ${getColor('neutral.200')};
  }
`;

const SearchSuggestions: React.FC<SearchSuggestionsPaneProps> = ({
  suggestions,
  onClickOut,
  renderSearchSuggestion,
}) => {
  const searchSuggestionsPaneRef = useOuterClick<HTMLDivElement>(onClickOut);

  return (
    <SearchSuggestionsPane ref={searchSuggestionsPaneRef}>
      <List>
        {suggestions.map((suggestion) => {
          return (
            isNotNull(suggestion) && (
              <li key={suggestion.name}>
                <SearchSuggestionsLink
                  aria-label={suggestion.name}
                  onClick={suggestion.onClick}
                >
                  {renderSearchSuggestion(suggestion)}
                </SearchSuggestionsLink>
              </li>
            )
          );
        })}
      </List>
    </SearchSuggestionsPane>
  );
};

SearchSuggestions.propTypes = {
  suggestions: PropTypes.arrayOf(SearchSuggestionPropType).isRequired,
  renderSearchSuggestion: PropTypes.func.isRequired,
  onClickOut: PropTypes.func.isRequired,
};

export default SearchSuggestions;
