import React, { ChangeEvent, FC } from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row?: MRT_Row;
  selectAll?: boolean;
  instance: MRT_TableInstance;
}

export const MRT_SelectCheckbox: FC<Props> = ({ row, selectAll, instance }) => {
  const {
    getRowModel,
    getPaginationRowModel,
    getSelectedRowModel,
    getState,
    options: {
      localization,
      muiSelectCheckboxProps,
      muiSelectAllCheckboxProps,
      onRowSelectionChanged,
      onRowSelectAllChanged,
      selectAllMode,
    },
  } = instance;

  const { density } = getState();

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (selectAll) {
      if (selectAllMode === 'all') {
        instance.getToggleAllRowsSelectedHandler()(event as any);
      } else if (selectAllMode === 'page') {
        instance.getToggleAllPageRowsSelectedHandler()(event as any);
      }
      onRowSelectAllChanged?.({
        event,
        selectedRows: event.target.checked
          ? selectAllMode === 'all'
            ? getRowModel().flatRows
            : getPaginationRowModel().flatRows
          : [],
        instance,
      });
    } else if (row) {
      row?.getToggleSelectedHandler()(event as any);
      onRowSelectionChanged?.({
        event,
        row,
        selectedRows: event.target.checked
          ? [...getSelectedRowModel().flatRows, row]
          : getSelectedRowModel().flatRows.filter(
              (selectedRow) => selectedRow.id !== row.id,
            ),
        instance,
      });
    }
  };

  const checkboxProps = selectAll
    ? muiSelectAllCheckboxProps instanceof Function
      ? muiSelectAllCheckboxProps({ instance })
      : muiSelectAllCheckboxProps
    : muiSelectCheckboxProps instanceof Function
    ? muiSelectCheckboxProps({ row: row as MRT_Row, instance })
    : muiSelectCheckboxProps;

  return (
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      title={
        selectAll ? localization.toggleSelectAll : localization.toggleSelectRow
      }
    >
      <Checkbox
        checked={
          selectAll ? instance.getIsAllRowsSelected() : row?.getIsSelected()
        }
        indeterminate={
          selectAll
            ? instance.getIsSomeRowsSelected()
            : row?.getIsSomeSelected()
        }
        inputProps={{
          'aria-label': selectAll
            ? localization.toggleSelectAll
            : localization.toggleSelectRow,
        }}
        onChange={handleSelectChange}
        size={density === 'compact' ? 'small' : 'medium'}
        {...checkboxProps}
        sx={{
          height: density === 'compact' ? '1.75rem' : '2.25rem',
          width: density === 'compact' ? '1.75rem' : '2.25rem',
          ...checkboxProps?.sx,
        }}
      />
    </Tooltip>
  );
};
