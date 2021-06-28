import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'ramda-adjunct';

import { ControlDropdown } from '../ControlDropdown';
import { ColumnsControlsProps } from './ColumnsControls.types';
import ColumnsList from './components/ColumnsList';
import { useColumnOrder } from './hooks/useColumnOrder';

const ColumnsControls: React.FC<ColumnsControlsProps> = ({
  children,
  isOpen = false,
  onOpen = noop,
  onClose = noop,
  onApply = noop,
  onReset = noop,
}) => {
  const parentRef = useRef(null);
  const {
    orderedColumns,
    setLocalColumnOrder,
    storeOrderedColumns,
    reinitializeOrderedColumns,
    resetOrderedColumns,
    isInDefaultOrder,
  } = useColumnOrder();

  const handleOpenColumnsControl = () => {
    onOpen();
  };
  const handleCloseColumnsControl = () => {
    onClose();
    reinitializeOrderedColumns();
  };
  const handleApplyColumnsControl = () => {
    onApply(!isInDefaultOrder);
    storeOrderedColumns();
  };

  const handleResetColumnsControl = () => {
    onReset();
    resetOrderedColumns();
  };

  return (
    <span ref={parentRef}>
      {children}
      <ControlDropdown
        isControlPaneOpen={isOpen}
        parentRef={parentRef}
        title="Columns"
        onApply={handleApplyColumnsControl}
        onClose={handleCloseColumnsControl}
        onOpen={handleOpenColumnsControl}
        onReset={handleResetColumnsControl}
      >
        <ColumnsList
          columns={orderedColumns}
          setColumns={setLocalColumnOrder}
        />
      </ControlDropdown>
    </span>
  );
};

ColumnsControls.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onReset: PropTypes.func,
};

export default ColumnsControls;
