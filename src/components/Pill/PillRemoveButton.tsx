import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getColor, getLineHeight, getRadii, pxToRem } from '../../utils';
import { SSCIconNames } from '../../theme/icons/icons.enums';
import { Icon } from '../Icon';
import { PillRemoveButtonProps } from './Pill.types';

const PillRemoveButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  border: 0 none;
  background: transparent;
  width: ${pxToRem(16)};
  height: ${pxToRem(16)};
  font-size: ${pxToRem(12)};
  line-height: ${getLineHeight('md')};
  color: ${getColor('neutral.700')};
  cursor: pointer;
  border-radius: ${getRadii('circle')};

  &:hover,
  &:focus {
    color: ${getColor('neutral.0')};
    background-color: ${getColor('error.500')};
  }
`;

const PillRemoveButton: React.FC<PillRemoveButtonProps> = ({
  pillLabel,
  ...props
}) => (
  <PillRemoveButtonWrapper
    aria-label={`Remove ${pillLabel}`}
    type="button"
    {...props}
  >
    <Icon name={SSCIconNames.times} />
  </PillRemoveButtonWrapper>
);

PillRemoveButton.propTypes = {
  pillLabel: PropTypes.string.isRequired,
};

export default PillRemoveButton;
