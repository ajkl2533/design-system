import React from 'react';
import styled from 'styled-components';

import { Inline } from '../layout';
import { SpaceSizes } from '../../theme';
import { Button, ButtonEnums } from '../Button';
import * as CustomPropTypes from '../../types/customPropTypes';
import {
  AbsoluteLinkActionKind,
  ActionKindsPropType,
  RelativeLinkActionKind,
} from '../../types/action.types';
import { CardActionsProps } from './Card.types';
import { getNegativeSpace } from '../../utils';

const CardActionsWrapper = styled.div`
  && {
    margin-top: 0;
    margin-bottom: ${getNegativeSpace(SpaceSizes.md)};
  }
`;

const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  ({ actions }, ref) => (
    <CardActionsWrapper>
      <Inline ref={ref} gap={SpaceSizes.mdPlus}>
        {actions.map((action) => (
          <Button
            key={action.name}
            href={(action as AbsoluteLinkActionKind<[React.MouseEvent]>).href}
            to={(action as RelativeLinkActionKind<[React.MouseEvent]>).to}
            variant={ButtonEnums.ButtonVariants.text}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </Inline>
    </CardActionsWrapper>
  ),
);

CardActions.propTypes = {
  actions: CustomPropTypes.tuple(ActionKindsPropType, ActionKindsPropType),
};

export default CardActions;
