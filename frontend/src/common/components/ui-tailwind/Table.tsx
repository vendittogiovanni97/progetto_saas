import React from 'react';

interface Column {
  header: string;
  accessor: string;
  cell?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  className?: string;
}

export function Table({ columns, data, className = '' }: TableProps) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#2A2B2E]">
            {columns.map((column, index) => (
              <th 
                key={index} 
                className="px-4 py-3 text-left text-sm text-[#A0A0A0]"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className="border-b border-[#2A2B2E] hover:bg-[#1C1D1F]/50 transition-colors"
            >
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex}
                  className="px-4 py-4 text-sm text-[#E6E6E6]"
                >
                  {column.cell 
                    ? column.cell(row[column.accessor], row)
                    : row[column.accessor]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-12 text-[#6B6B6B]">
          <p>Nessun dato disponibile</p>
        </div>
      )}
    </div>
  );
}
