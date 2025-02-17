import { mergeDeepRight } from 'ramda';
import { noop } from 'ramda-adjunct';

import { ControlsConfig } from './ControlsModule/ControlsModule.types';
import { TableConfig } from './Table/Table.types';
import { NoMatchingData } from './Table/components';
import { NoData } from '../_internal/BaseTable';

export const defaultTableConfig: TableConfig<Record<string, unknown>> = {
  hasSelection: true,
  isMultiSelect: true,
  onSelect: noop,
  isCancelDisabled: true,
  onCancelLoading: noop,
  isDataLoading: false,
  hasOnlyPerPageSelection: true,
  defaultSelectedRowIds: [],
  pageButtonsCount: undefined,
  hasPagination: true,
  hasServerSidePagination: true,
  defaultPageSize: 50,
  defaultPageIndex: 0,
  hasSorting: true,
  hasServerSideSorting: true,
  defaultSortBy: [],
  defaultColumnOrder: [],
  // defaultHiddenColumns: [],
  rowActions: [],
  NoMatchingDataComponent: NoMatchingData,
  NoDataComponent: NoData,
};
export const mergeTableConfig = mergeDeepRight(defaultTableConfig);

// TODO: commented part will be enabled when functionality is implemented
export const defaultControlsConfig: ControlsConfig<Record<string, unknown>> = {
  onControlToggle: noop,
  hasSearch: true,
  searchConfig: {
    // hasSuggestions: false,
    placeholder: 'Search',
    onSearch: noop,
    onClear: noop,
    // onSuggestionsFetch: noop,
  },
  hasFiltering: true,
  isDataLoading: false,
  filteringConfig: {
    onChange: noop,
    onApply: noop,
    onClose: noop,
    state: [],
    fields: [],
    isCancelDisabled: false,
  },
  defaultIsFilteringOpen: false,
  defaultIsFilteringApplied: false,
  // hasColumnVisibility: true,
  // defaultIsColumnVisibilityOpen: false,
  // defaultIsColumnVisibilityApplied: false,
  hasColumnOrdering: true,
  defaultIsColumnOrderingOpen: false,
  defaultIsColumnOrderingApplied: false,
  onCancelLoading: noop,
  onColumnOrderChange: noop,
  // hasGrouping: true,
  // defaultIsGroupingOpen: false,
  // defaultIsGroupingApplied: false,
  // hasCustomViews: true,
  // defaultIsustomViewsOpen: false,
  // defaultIsustomViewsApplied: false,
};
export const mergeControlsConfig = mergeDeepRight(defaultControlsConfig);
