import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { map } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';

import { ColorTypes, SpaceSizes } from '../../../../theme';
import { SSCIconNames } from '../../../../theme/icons/icons.enums';
import { pxToRem } from '../../../../utils';
import { Inline } from '../../../layout';
import { Button } from '../../../Button';
import { ButtonVariants } from '../../../Button/Button.enums';
import { Icon } from '../../../Icon';
import { ActionPropType } from '../../types/Action.types';
import {
  AbsoluteLinkActionKind,
  ActionWithSubactions,
  RelativeLinkActionKind,
} from '../../../../types/action.types';
import { DropdownMenu } from '../../../_internal/BaseDropdownMenu';
import { BatchActionsProps } from './BatchActions.types';
import { DatatableStore } from '../../Datatable.store';

const BatchActionButton = styled(Button).attrs((props) => ({
  variant: ButtonVariants.text,
  ...props,
}))`
  padding: ${pxToRem(9.5, 16)};
  line-height: ${pxToRem(13)};
  height: ${pxToRem(32)};
`;

const BatchActions: React.FC<BatchActionsProps> = ({ actions }) => {
  const { selectedIds, hasExclusiveSelection } = DatatableStore.useState(
    (s) => ({
      selectedIds: s.selectedIds,
      hasExclusiveSelection: s.hasExclusiveSelection,
    }),
  );

  const handleOnActionClick = useCallback(
    (onClick) => {
      onClick(selectedIds, hasExclusiveSelection);
    },
    [selectedIds, hasExclusiveSelection],
  );

  return (
    <Inline>
      {actions.map((action) => {
        if (
          isNotUndefined(
            (action as ActionWithSubactions<string[], boolean>).subActions,
          )
        ) {
          const subActions = map((subAction) => ({
            ...subAction,
            onClick: () => handleOnActionClick(subAction.onClick),
          }))((action as ActionWithSubactions<string[], boolean>).subActions);

          return (
            <DropdownMenu
              key={action.name}
              actions={subActions}
              paneWidth={140}
              placement="bottom-end"
            >
              <BatchActionButton name={action.name} onClick={action.onClick}>
                <Inline gap={SpaceSizes.xs}>
                  <span>{action.label}</span>
                  <Icon
                    color={ColorTypes.neutral700}
                    margin={{ left: 0.25 }}
                    name={SSCIconNames.caretDown}
                  />
                </Inline>
              </BatchActionButton>
            </DropdownMenu>
          );
        }

        return (
          <BatchActionButton
            key={action.name}
            href={(action as AbsoluteLinkActionKind<string[], boolean>).href}
            name={action.name}
            to={(action as RelativeLinkActionKind<string[], boolean>).to}
            onClick={() => handleOnActionClick(action.onClick)}
          >
            {action.label}
          </BatchActionButton>
        );
      })}
    </Inline>
  );
};

BatchActions.propTypes = {
  actions: PropTypes.arrayOf(ActionPropType).isRequired,
};

export default BatchActions;
