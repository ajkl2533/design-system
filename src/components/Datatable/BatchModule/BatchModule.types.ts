import { BatchActionsProps } from './BatchActions/BatchActions.types';
import { ElementCounterProps } from './ElementCounter/ElementCounter.types';

export interface BatchModuleProps
  extends BatchActionsProps,
    ElementCounterProps {
  columns: {
    isButtonDisplayed: boolean;
    defaultIsColumnOrderingOpen?: boolean;
    defaultIsColumnOrderingApplied?: boolean;
  };
}
