import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import TablePagination from './TablePagination';
import { Spinner } from '../Spinner';

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
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc' | null;
  }>({ key: null, direction: null });

  // Sort data if sortConfig is set
  const sortedData = useMemo(() => {
    const sortableData = data ? [...data] : [];
    if (sortConfig.key && sortConfig.direction) {
      sortableData.sort((a: any, b: any) => {
        const aValue = a[sortConfig.key as keyof T];
        const bValue = b[sortConfig.key as keyof T];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Handle sorting
  const handleSort = (columnId: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';

    if (sortConfig.key === columnId) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }

    setSortConfig({ key: direction ? columnId : null, direction });
  };

  // Get sort icon
  const getSortIcon = (columnId: string) => {
    if (sortConfig.key !== columnId) return <ChevronsUpDown size={16} />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };
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
                      onClick={column.sortable ? () => handleSort(column.id) : undefined}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column.header}</span>
                        {column.sortable && (
                          <span className="inline-flex">{getSortIcon(column.id)}</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  isLoading && (
                    <tr>
                      <td colSpan={columns.length} className="py-2">
                        <Spinner />
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