import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { transparentize } from 'polished';

import {
  getColor,
  getFontFamily,
  getFontSize,
  getLineHeight,
  getRadii,
} from '../../utils';
import { useOuterClick } from '../useOuterCallback';
import { DropdownPaneProps, DropdownPaneStyles } from './DropdownPane.types';

export const StyledDropdownPane = styled.div<DropdownPaneStyles>`
  position: absolute;
  background: ${getColor('neutral.0')};
  color: ${getColor('neutral.900')};
  font-family: ${getFontFamily('base')};
  font-size: ${getFontSize('md')};
  line-height: ${getLineHeight('md')};
  border: 1px solid ${getColor('neutral.600')};
  border-radius: ${getRadii('default')};

  ${({ $isElevated }) =>
    $isElevated && `box-shadow: 0 2px 6px 0 ${transparentize(0.85, '#000')}`};
`;

const DropdownPane: React.FC<DropdownPaneProps> = ({
  children,
  onClickOut,
  isElevated = false,
  ...props
}) => {
  const dropdownPaneRef = useOuterClick<HTMLDivElement>(onClickOut);

  return (
    <StyledDropdownPane
      ref={dropdownPaneRef}
      $isElevated={isElevated}
      {...props}
    >
      {children}
    </StyledDropdownPane>
  );
};

DropdownPane.propTypes = {
  onClickOut: PropTypes.func.isRequired,
  isElevated: PropTypes.bool,
};

export default DropdownPane;
