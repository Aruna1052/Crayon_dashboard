import React, { useState } from 'react';
import { Calendar, Plus, Edit2, Save, X, Search, Filter, Trash2, Building2 } from 'lucide-react';

interface ClientEntry {
  id: string;
  clientName: string;
  agentsProposed: string;
  lastMeetingDate: string;
}

const ClientOverview: React.FC = () => {
  const [clients, setClients] = useState<ClientEntry[]>([
    {
      id: '1',
      clientName: 'ADIB',
      agentsProposed: 'CxO Concierge, PFM, RM Wealth Assistant, CFO Earnings Analyst',
      lastMeetingDate: '2024-08-12'
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ClientEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClient, setNewClient] = useState<Omit<ClientEntry, 'id'>>({
    clientName: '',
    agentsProposed: '',
    lastMeetingDate: ''
  });

  const handleEdit = (client: ClientEntry) => {
    setEditingId(client.id);
    setEditForm({ ...client });
  };

  const handleSave = () => {
    if (editForm) {
      setClients(clients.map(client => 
        client.id === editForm.id ? editForm : client
      ));
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
      setClients(clients.filter(client => client.id !== id));
    }
  };

  const handleAddClient = () => {
    if (newClient.clientName && newClient.agentsProposed && newClient.lastMeetingDate) {
      const client: ClientEntry = {
        ...newClient,
        id: Date.now().toString()
      };
      setClients([...clients, client]);
      setNewClient({ clientName: '', agentsProposed: '', lastMeetingDate: '' });
      setShowAddForm(false);
    }
  };

  const filteredClients = clients.filter(client =>
    client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.agentsProposed.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients or agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          />
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Add New Client</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input
                type="text"
                value={newClient.clientName}
                onChange={(e) => setNewClient({ ...newClient, clientName: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Agents Proposed</label>
              <input
                type="text"
                value={newClient.agentsProposed}
                onChange={(e) => setNewClient({ ...newClient, agentsProposed: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter agents proposed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Meeting Date</label>
              <input
                type="date"
                value={newClient.lastMeetingDate}
                onChange={(e) => setNewClient({ ...newClient, lastMeetingDate: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
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

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Agents Proposed
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Last Meeting Date
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === client.id ? (
                      <input
                        type="text"
                        value={editForm?.clientName || ''}
                        onChange={(e) => setEditForm({ ...editForm!, clientName: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="text-sm font-semibold text-gray-900">{client.clientName}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === client.id ? (
                      <textarea
                        value={editForm?.agentsProposed || ''}
                        onChange={(e) => setEditForm({ ...editForm!, agentsProposed: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={2}
                      />
                    ) : (
                      <div className="text-sm text-blue-600 font-medium">{client.agentsProposed}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === client.id ? (
                      <input
                        type="date"
                        value={editForm?.lastMeetingDate || ''}
                        onChange={(e) => setEditForm({ ...editForm!, lastMeetingDate: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="text-sm text-blue-600 font-medium flex items-center">
                        <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                        {new Date(client.lastMeetingDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingId === client.id ? (
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800 p-1"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(client)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
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