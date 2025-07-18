import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Edit2, Save, X, Filter, Trash2, Building2, Settings } from 'lucide-react';

interface ClientEntry {
  id: string;
  clientName: string;
  agentsProposed: string;
  lastMeetingDate: string;
  [key: string]: any;
}

interface ColumnConfig {
  key: string;
  label: string;
  type: 'text' | 'date' | 'textarea';
}

const ClientOverview: React.FC = () => {
  const [clients, setClients] = useState<ClientEntry[]>([]);
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { key: 'clientName', label: 'Client Name', type: 'text' },
    { key: 'agentsProposed', label: 'Agents Proposed', type: 'textarea' },
    { key: 'lastMeetingDate', label: 'Last Meeting Date', type: 'date' }
  ]);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ClientEntry | null>(null);
  const [editingHeader, setEditingHeader] = useState<string | null>(null);
  const [headerEditValue, setHeaderEditValue] = useState('');
  
  // Multiple filters
  const [filters, setFilters] = useState({
    clientName: '',
    agentsProposed: ''
  });
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddColumnForm, setShowAddColumnForm] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState<'text' | 'date' | 'textarea'>('text');
  const [newClient, setNewClient] = useState<Partial<ClientEntry>>({});

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedClients = localStorage.getItem('clients');
    const savedColumns = localStorage.getItem('clientColumns');
    
    if (savedClients) {
      try {
        setClients(JSON.parse(savedClients));
      } catch (error) {
        console.error('Error parsing saved clients:', error);
        // Set default data if parsing fails
        const defaultClients = [
          {
            id: '1',
            clientName: 'ADIB',
            agentsProposed: 'CxO Concierge, PFM, RM Wealth Assistant, CFO Earnings Analyst',
            lastMeetingDate: '2024-08-12'
          }
        ];
        setClients(defaultClients);
        localStorage.setItem('clients', JSON.stringify(defaultClients));
      }
    } else {
      // Default data
      const defaultClients = [
        {
          id: '1',
          clientName: 'ADIB',
          agentsProposed: 'CxO Concierge, PFM, RM Wealth Assistant, CFO Earnings Analyst',
          lastMeetingDate: '2024-08-12'
        }
      ];
      setClients(defaultClients);
      localStorage.setItem('clients', JSON.stringify(defaultClients));
    }
    
    if (savedColumns) {
      try {
        setColumns(JSON.parse(savedColumns));
      } catch (error) {
        console.error('Error parsing saved columns:', error);
        localStorage.setItem('clientColumns', JSON.stringify(columns));
      }
    } else {
      localStorage.setItem('clientColumns', JSON.stringify(columns));
    }
  }, []);

  // Save data to localStorage whenever clients or columns change
  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem('clients', JSON.stringify(clients));
    }
  }, [clients]);

  useEffect(() => {
    if (columns.length > 0) {
      localStorage.setItem('clientColumns', JSON.stringify(columns));
    }
  }, [columns]);

  const handleEdit = (client: ClientEntry) => {
    setEditingId(client.id);
    setEditForm({ ...client });
  };

  const handleSave = () => {
    if (editForm) {
      const updatedClients = clients.map(client => 
        client.id === editForm.id ? editForm : client
      );
      setClients(updatedClients);
      localStorage.setItem('clients', JSON.stringify(updatedClients));
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      const updatedClients = clients.filter(client => client.id !== id);
      setClients(updatedClients);
      localStorage.setItem('clients', JSON.stringify(updatedClients));
    }
  };

  const handleHeaderEdit = (columnKey: string, currentLabel: string) => {
    setEditingHeader(columnKey);
    setHeaderEditValue(currentLabel);
  };

  const handleHeaderSave = (columnKey: string) => {
    const updatedColumns = columns.map(col => 
      col.key === columnKey ? { ...col, label: headerEditValue } : col
    );
    setColumns(updatedColumns);
    localStorage.setItem('clientColumns', JSON.stringify(updatedColumns));
    setEditingHeader(null);
    setHeaderEditValue('');
  };

  const handleHeaderDelete = (columnKey: string) => {
    if (window.confirm('Are you sure you want to delete this column? This will remove all data in this column.')) {
      const updatedColumns = columns.filter(col => col.key !== columnKey);
      setColumns(updatedColumns);
      
      // Remove the column data from all clients
      const updatedClients = clients.map(client => {
        const { [columnKey]: removed, ...rest } = client;
        return rest;
      });
      setClients(updatedClients);
      
      localStorage.setItem('clientColumns', JSON.stringify(updatedColumns));
      localStorage.setItem('clients', JSON.stringify(updatedClients));
    }
  };

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      const newColumn: ColumnConfig = {
        key: newColumnName.toLowerCase().replace(/\s+/g, '_'),
        label: newColumnName,
        type: newColumnType
      };
      const updatedColumns = [...columns, newColumn];
      setColumns(updatedColumns);
      
      // Add empty values for existing clients
      const updatedClients = clients.map(client => ({
        ...client,
        [newColumn.key]: ''
      }));
      setClients(updatedClients);
      
      localStorage.setItem('clientColumns', JSON.stringify(updatedColumns));
      localStorage.setItem('clients', JSON.stringify(updatedClients));
      
      setNewColumnName('');
      setNewColumnType('text');
      setShowAddColumnForm(false);
    }
  };

  const handleAddClient = () => {
    const hasRequiredFields = columns.some(col => newClient[col.key]);
    if (hasRequiredFields) {
      const client: ClientEntry = {
        id: Date.now().toString(),
        ...columns.reduce((acc, col) => ({
          ...acc,
          [col.key]: newClient[col.key] || ''
        }), {})
      };
      const updatedClients = [...clients, client];
      setClients(updatedClients);
      localStorage.setItem('clients', JSON.stringify(updatedClients));
      setNewClient({});
      setShowAddForm(false);
    }
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  };

  const filteredClients = clients.filter(client => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === '') return true;
      return String(client[key] || '').toLowerCase().includes(value.toLowerCase());
    });
  });

  const renderCell = (client: ClientEntry, column: ColumnConfig) => {
    if (editingId === client.id) {
      if (column.type === 'textarea') {
        return (
          <textarea
            value={editForm?.[column.key] || ''}
            onChange={(e) => setEditForm({ ...editForm!, [column.key]: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
          />
        );
      } else {
        return (
          <input
            type={column.type === 'date' ? 'date' : 'text'}
            value={editForm?.[column.key] || ''}
            onChange={(e) => setEditForm({ ...editForm!, [column.key]: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        );
      }
    } else {
      const value = client[column.key];
      if (column.type === 'date' && value) {
        return (
          <div className="text-sm text-blue-600 font-medium flex items-center">
            <Calendar className="w-4 h-4 text-blue-500 mr-2" />
            {new Date(value).toLocaleDateString()}
          </div>
        );
      }
      return (
        <div className={`text-sm font-medium ${column.key === 'clientName' ? 'text-gray-900' : 'text-blue-600'}`}>
          {value}
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Client & Opportunity Overview
          </h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Client</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 text-gray-900">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Filter by Client Name..."
            value={filters.clientName}
            onChange={(e) => handleFilterChange('clientName', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Filter by Agents Proposed..."
            value={filters.agentsProposed}
            onChange={(e) => handleFilterChange('agentsProposed', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Add Client Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Add New Client</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {columns.map(column => (
              <div key={column.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{column.label}</label>
                {column.type === 'textarea' ? (
                  <textarea
                    value={newClient[column.key] || ''}
                    onChange={(e) => setNewClient({ ...newClient, [column.key]: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Enter ${column.label.toLowerCase()}`}
                    rows={2}
                  />
                ) : (
                  <input
                    type={column.type === 'date' ? 'date' : 'text'}
                    value={newClient[column.key] || ''}
                    onChange={(e) => setNewClient({ ...newClient, [column.key]: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Enter ${column.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddClient}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Client
            </button>
          </div>
        </div>
      )}

      {/* Add Column Form */}
      {showAddColumnForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Add New Column</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Column Name</label>
              <input
                type="text"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter column name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Column Type</label>
              <select
                value={newColumnType}
                onChange={(e) => setNewColumnType(e.target.value as 'text' | 'date' | 'textarea')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="text">Text</option>
                <option value="textarea">Textarea</option>
                <option value="date">Date</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowAddColumnForm(false)}
              className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddColumn}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Column
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Client Entries</h3>
          <button
            onClick={() => setShowAddColumnForm(true)}
            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors flex items-center space-x-1"
          >
            <Settings className="w-3 h-3" />
            <span>Add Column</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                    {editingHeader === column.key ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={headerEditValue}
                          onChange={(e) => setHeaderEditValue(e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
                          onKeyPress={(e) => e.key === 'Enter' && handleHeaderSave(column.key)}
                        />
                        <button
                          onClick={() => handleHeaderSave(column.key)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingHeader(null)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleHeaderDelete(column.key)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                        onClick={() => handleHeaderEdit(column.key, column.label)}
                      >
                        <span>{column.label}</span>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4">
                      {renderCell(client, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientOverview;