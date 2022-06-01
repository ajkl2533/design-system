import React from 'react';
import styled from 'styled-components';

import { CalloutProps } from './Callout.types';
import { ColorTypes, SpaceSizes } from '../../theme';
import { getColor, getFontSize, getRadii, pxToRem } from '../../utils';
import { Inline, Padbox } from '../layout';
import { Text } from '../typographyLegacy';
import { Icon } from '../Icon';

const IconContainer = styled.div`
  width: ${pxToRem(36)};
  height: ${pxToRem(36)};
  flex-shrink: 0;
  background-color: ${getColor(ColorTypes.info700)};
  border-radius: ${getRadii('circle')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${getFontSize('mdPlus')};
`;

const Container = styled.div`
  background-color: ${getColor(ColorTypes.info50)};
  border-radius: ${getRadii('default')};
`;

const Callout: React.FC<CalloutProps> = ({ children, icon }) => (
  <Container>
    <Padbox paddingSize={SpaceSizes.md}>
      <Inline gap="md">
        <IconContainer>
          {typeof icon === 'string' ? (
            <Icon color={ColorTypes.neutral0} name={icon} />
          ) : (
            icon
          )}
        </IconContainer>
        <Text
          as="span"
          color="primary"
          size="lg"
          style={{ alignSelf: 'center' }}
        >
          {children}
        </Text>
      </Inline>
    </Padbox>
  </Container>
);

Callout.propTypes = {};

export default Callout;
