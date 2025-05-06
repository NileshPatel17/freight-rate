import React, { useState, useMemo } from 'react';
import TablePagination from './TablePagination';

export interface Column<T> {
  id: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface TableProps<T> {
  isLoading: boolean;
  data: T[] | null;
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  pageSize?: number;
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
}

function Table<T>({
  isLoading,
  data,
  columns,
  keyExtractor,
  pageSize = 10,
  className = '',
  striped = true,
  hoverable = true,
  bordered = false,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = useMemo(() => {
    const sortableData = data ? [...data] : [];
    return sortableData;
  }, [data]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);


  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className={`overflow-hidden ${bordered ? 'border border-gray-200 rounded-lg' : ''}`}>
            <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
              <thead className="bg-white">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      scope="col"
                      className={`px-6 py-3 text-left text-base font-bold text-gray-600 tracking-wider ${column.sortable ? 'cursor-pointer select-none' : ''
                        } ${column.className || ''}`}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column.header}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  isLoading && (
                    <tr>
                      <td colSpan={columns.length} className="text-center py-2">
                        Loading...
                      </td>
                    </tr>
                  )
                }
                {(!isLoading && paginatedData.length > 0) ? (
                  paginatedData.map((row, index) => (
                    <tr
                      key={keyExtractor(row)}
                      className={`
                        ${striped && index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-100'}
                        ${hoverable ? 'hover:bg-gray-100 transition-colors duration-150' : ''}
                      `}
                    >
                      {columns.map((column) => (
                        <td
                          key={`${keyExtractor(row)}-${column.id}`}
                          className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${column.className || ''}`}
                        >
                          {column.accessor(row)}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : !isLoading ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-4"
        />
      )}
    </div>
  );
}

export default Table;