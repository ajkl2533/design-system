import React from 'react';
import styled from 'styled-components';
import usePortal from 'react-cool-portal';
import PropTypes from 'prop-types';

import { getColor, getDepth, getRadii, pxToRem } from '../../utils';
import { ModalSizes } from '../Modal/Modal.enums';
import { WizardModalProps } from './WizardModal.types';
import { Padbox } from '../layout';

const widthVariants = {
  [ModalSizes.xs]: 320,
  [ModalSizes.sm]: 430,
  [ModalSizes.md]: 600,
  [ModalSizes.lg]: 900,
};

const BlurredOverlay = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${getDepth('modal')};
`;
const BaseModal = styled(Padbox)<{ $maxWidth: number }>`
  max-height: 66vh;
  width: 100%;
  max-width: ${({ $maxWidth }) => pxToRem($maxWidth)};
  border-radius: ${getRadii('default')};
  background-color: ${getColor('neutral.0')};
  overflow: auto;
  > * {
    height: 100%;
  }
`;

const WizardModal: React.FC<WizardModalProps> = ({ children, size = 'lg' }) => {
  const { Portal } = usePortal();

  return (
    <Portal>
      <BlurredOverlay>
        <BaseModal $maxWidth={widthVariants[size]}>{children}</BaseModal>
      </BlurredOverlay>
    </Portal>
  );
};

export default WizardModal;

WizardModal.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(Object.values(ModalSizes)),
};
