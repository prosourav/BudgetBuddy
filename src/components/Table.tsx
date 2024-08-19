import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';

import { Transaction } from '@/types';

// Define the props type for the table
interface TransactionTableProps {
  columns: ColumnDef<Transaction>[]; // Array of column definitions
  dataSource: Transaction[]; // Array of transaction objects
}

const TransactionTable: React.FC<TransactionTableProps> = ({ columns, dataSource }) => {
  const table = useReactTable({
    data: dataSource,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} style={{ backgroundColor: '#f4f4f4' }}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} style={{ borderBottom: '1px solid #ddd' }}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    textAlign: 'center',
                    fontSize: '14px',
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ height: '16px' }} />
    </div>
  );
}

export default TransactionTable;
