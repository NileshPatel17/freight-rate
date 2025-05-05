import React from 'react';
import { GripVertical, Loader, MoreHorizontal } from 'lucide-react';
import { Spinner } from './Spinner';

interface TableProps {
  isLoading: boolean,
  data: Array<any> | null
}

const QuotesTable: React.FC<TableProps> = ({
  isLoading,
  data
}) => {
  return (
    <div className="max-w-full py-2">
      <div className="overflow-x-auto">
        {
          false ? (
            <div className='flex justify-center items-center w-full h-[50px] p-2'>
              <Spinner />
            </div>
          ) : (<table className="bg-gray-200 w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="bg-white">
              <tr className="text-left">
                <th className="p-3 border-r">
                  <div className="flex justify-between items-center">
                    Shipment Id
                    <GripVertical size={14} />
                  </div>
                </th>
                <th className="p-3 border-r">
                  <div className="flex justify-between items-center">
                    Origin
                    <GripVertical size={14} />
                  </div>
                </th>
                <th className="p-3 border-r">
                  <div className="flex justify-between items-center">
                    Destination
                    <GripVertical size={14} />
                  </div>
                </th>
                <th className="p-3 border-r">
                  <div className="flex justify-between items-center">
                    Container Type
                    <GripVertical size={14} />
                  </div>
                </th>
                <th className="p-3 border-r">
                  <div className="flex justify-between items-center">
                    Carrrier
                    <GripVertical size={14} />
                  </div>
                </th>
                <th className="p-3 border-r text-nowrap">
                  <div className="flex justify-between items-center">
                    Rate
                    <GripVertical size={14} />
                  </div>
                </th>
                <th className="p-3 border-r">
                  <div className="flex justify-between items-center">
                    Effective Date
                    <GripVertical size={14} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data?.map((item, index) => {
                  return (
                    <tr key={`item_${index}`} className="border-b border-opacity-20 border-gray-300">
                      <td className="p-3 border-r border-gray-300">
                        <p>{item.shipment_id}</p>
                      </td>
                      <td className="p-3 border-r border-gray-300">
                        <p>{item.origin_port}</p>
                      </td>
                      <td className="p-3 border-r border-gray-300">
                        <p>{item.destination_port}</p>
                      </td>
                      <td className="p-3 border-r border-gray-300">
                        <p>{item.carrier}</p>
                      </td>
                      <td className="p-3 border-r border-gray-300">
                        <p>{item.container_type}</p>
                      </td>
                      <td className="p-3 border-r border-gray-300">
                        <p>${item.fright_rate}</p>
                      </td>
                      <td className="p-3 border-r border-gray-300">
                        <p>{item.effective_date}</p>
                      </td>
                    </tr>
                  )
                })
              }
              {
                data?.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-2 font-normal text-base">No data has been added!</td>
                  </tr>
                )
              }
              {
                isLoading && (
                  <tr>
                    <td colSpan={8} className="py-2">
                      <Spinner />
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>)}
      </div>
    </div>
  )
};

export default QuotesTable;