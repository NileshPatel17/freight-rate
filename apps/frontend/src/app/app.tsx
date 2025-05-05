import { useEffect, useState } from 'react';
import { Upload, ChevronDown } from "lucide-react";
import Header from '../components/Header';
import UploadModal from '../components/UploadModal';
import { wait } from '../utils';
import { useToast } from '../components/Toast';
import { Quote } from '../types';
import { Table } from '../components/Table';

const columns = [
  {
    id: 'shipment_id',
    header: 'Shipment Id',
    accessor: (quote: Quote) => quote.shipment_id,
  },
  {
    id: 'origin_port',
    header: 'Origin',
    accessor: (quote: Quote) => quote.origin_port,
  },
  {
    id: 'destination_port',
    header: 'Destination',
    accessor: (quote: Quote) => quote.destination_port,
  },
  {
    id: 'container_type',
    header: 'Container Type',
    accessor: (quote: Quote) => quote.container_type,
  },
  {
    id: 'carrier',
    header: 'Carrier',
    accessor: (quote: Quote) => quote.carrier,
  },
  {
    id: 'freight_rate',
    header: 'Freight Rate',
    accessor: (quote: Quote) => `$${quote.fright_rate}`,
  },
  {
    id: 'effective_date',
    header: 'Effective Date',
    accessor: (quote: Quote) => quote.effective_date,
  }
];

export function App() {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState<Quote[] | null>(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchQuotes = () => {
    const baseUrl = import.meta.env.VITE_API_HOST_URL;
    setIsLoading(true)
    fetch(`${baseUrl}fright/quotes`).then(resp => resp.json())
      .then(async res => {
        await wait(2000)  //stimulate delay to show loader
        setQuotes(res)
      })
      .catch(err => {
        showToast('Server Error!', 'error');
        setQuotes([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const uploadQuotes = (payload: Quote[]) => {
    const baseUrl = import.meta.env.VITE_API_HOST_URL;
    setIsLoading(true)
    fetch(`${baseUrl}fright/quotes/bulk`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(async response => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'Bad Request'}`);
      }
      return response.json();
    })
      .then(async res => {
        showToast('Quote uploaded successfully!', 'success');
        fetchQuotes();
        setIsModal2Open(false)
      })
      .catch(err => {
        showToast('Server Error!' , 'error');
        setQuotes([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    fetchQuotes()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-300 p-2 flex flex-col gap-y-2">
      <Header username='John' />
      <div className='flex justify-between'>
        <div>Quotes</div>
        <button
          className="bg-gray-200 text-xs px-2 py-1 rounded-md flex items-center justify-betweeen gap-1 hover:text-gray-500"
          onClick={() => openModal()}>
          <Upload size={14} />
          import file
          <ChevronDown size={14} />
        </button>
        {
          isModalOpen && (
            <UploadModal
              onOk={() => {
                fetchQuotes()
                setIsModalOpen(false)
              }}
              onClose={() => closeModal()} />
          )
        }
      </div>
      <Table
        isLoading={isLoading}
        data={quotes}
        columns={columns}
        keyExtractor={(item) => item.shipment_id}
        pageSize={6}
        striped
        bordered
      />
      {/* <QuotesTable isLoading={isLoading} data={quotes} /> */}
    </div>
  );
}

export default App;
