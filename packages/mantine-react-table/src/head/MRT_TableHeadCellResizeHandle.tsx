import React, { FC } from 'react';
import { Box, Divider } from '@mantine/core';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableHeadCellResizeHandle: FC<Props> = ({ header, table }) => {
  const {
    getState,
    options: { columnResizeMode },
  } = table;
  const { showColumnFilters } = getState();
  const { column } = header;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  return (
    <Box
      onDoubleClick={() => column.resetSize()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      sx={(theme) => ({
        cursor: 'col-resize',
        marginRight: '-0.5rem',
        position: 'absolute',
        right: '1px',
        paddingLeft: '4px',
        paddingRight: '4px',
        '&:active > .mantine-Divider-vertical': {
          backgroundColor: theme.colors[theme.primaryColor][7],
          opacity: 1,
        },
      })}
      style={{
        transform: column.getIsResizing()
          ? `translateX(${
              (getState().columnSizingInfo.deltaOffset ?? 0) /
              (columnResizeMode === 'onChange' ? 16 : 1)
            }px)`
          : undefined,
      }}
    >
      <Divider
        orientation="vertical"
        size="lg"
        sx={{
          borderRadius: '2px',
          borderWidth: '2px',
          height:
            showColumnFilters && columnDefType === 'data' ? '3.5rem' : '1.5rem',
          touchAction: 'none',
          transition: column.getIsResizing()
            ? undefined
            : 'all 150ms ease-in-out',
          userSelect: 'none',
          zIndex: 4,
        }}
      />
    </Box>
  );
};
