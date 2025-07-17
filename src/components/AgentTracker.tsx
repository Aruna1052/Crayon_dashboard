import React, { useState } from 'react';
import { CheckCircle, XCircle, Plus, Edit2, Save, X, Search, User, Trash2, Bot } from 'lucide-react';

interface AgentEntry {
  id: string;
  agentName: string;
  demoReady: boolean;
  internalOwner: string;
  estimatedTimeline: string;
  dependencies: string;
}

const AgentTracker: React.FC = () => {
  const [agents, setAgents] = useState<AgentEntry[]>([
    {
      id: '1',
      agentName: 'CxO Concierge',
      demoReady: true,
      internalOwner: 'Chinmoy, Ashvath',
      estimatedTimeline: 'Ready',
      dependencies: 'None'
    },
    {
      id: '2',
      agentName: 'Personal Finance Assistant',
      demoReady: true,
      internalOwner: 'Chinmoy',
      estimatedTimeline: 'Ready',
      dependencies: 'None'
    },
    {
      id: '3',
      agentName: 'RM Wealth Assistant',
      demoReady: true,
      internalOwner: 'Vignesh GM, Arun Changotra',
      estimatedTimeline: 'Ready',
      dependencies: 'None'
    },
    {
      id: '4',
      agentName: 'CFO Earnings Analyst',
      demoReady: false,
      internalOwner: 'Vignesh GM, Arun Changotra',
      estimatedTimeline: '2 weeks',
      dependencies: 'Data integration pending'
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<AgentEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAgent, setNewAgent] = useState<Omit<AgentEntry, 'id'>>({
    agentName: '',
    demoReady: false,
    internalOwner: '',
    estimatedTimeline: '',
    dependencies: ''
  });

  const handleEdit = (agent: AgentEntry) => {
    setEditingId(agent.id);
    setEditForm({ ...agent });
  };

  const handleSave = () => {
    if (editForm) {
      setAgents(agents.map(agent => 
        agent.id === editForm.id ? editForm : agent
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
    if (window.confirm('Are you sure you want to delete this agent?')) {
      setAgents(agents.filter(agent => agent.id !== id));
    }
  };

  const handleAddAgent = () => {
    if (newAgent.agentName && newAgent.internalOwner) {
      const agent: AgentEntry = {
        ...newAgent,
        id: Date.now().toString()
      };
      setAgents([...agents, agent]);
      setNewAgent({
        agentName: '',
        demoReady: false,
        internalOwner: '',
        estimatedTimeline: '',
        dependencies: ''
      });
      setShowAddForm(false);
    }
  };

  const filteredAgents = agents.filter(agent =>
    agent.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.internalOwner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-green-50 p-2 rounded-lg border border-green-200">
            <Bot className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Agent Readiness & Deployment Tracker
          </h2>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Agent</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search agents or owners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
          />
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Add New Agent</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
              <input
                type="text"
                value={newAgent.agentName}
                onChange={(e) => setNewAgent({ ...newAgent, agentName: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter agent name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Internal Owner</label>
              <input
                type="text"
                value={newAgent.internalOwner}
                onChange={(e) => setNewAgent({ ...newAgent, internalOwner: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter internal owner(s)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Timeline</label>
              <input
                type="text"
                value={newAgent.estimatedTimeline}
                onChange={(e) => setNewAgent({ ...newAgent, estimatedTimeline: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter timeline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dependencies</label>
              <input
                type="text"
                value={newAgent.dependencies}
                onChange={(e) => setNewAgent({ ...newAgent, dependencies: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter dependencies"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="demoReady"
                checked={newAgent.demoReady}
                onChange={(e) => setNewAgent({ ...newAgent, demoReady: e.target.checked })}
                className="mr-2 h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="demoReady" className="text-sm font-medium text-gray-700">Demo Ready</label>
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
              onClick={handleAddAgent}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Agent
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
                  Agent Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Demo Ready
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Internal Owner
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Estimated Timeline
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Dependencies
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === agent.id ? (
                      <input
                        type="text"
                        value={editForm?.agentName || ''}
                        onChange={(e) => setEditForm({ ...editForm!, agentName: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <div className="text-sm font-semibold text-gray-900">{agent.agentName}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === agent.id ? (
                      <input
                        type="checkbox"
                        checked={editForm?.demoReady || false}
                        onChange={(e) => setEditForm({ ...editForm!, demoReady: e.target.checked })}
                        className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                    ) : (
                      <div className="flex items-center">
                        {agent.demoReady ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className={`ml-2 text-sm font-semibold ${agent.demoReady ? 'text-green-700' : 'text-red-700'}`}>
                          {agent.demoReady ? 'Yes' : 'No'}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === agent.id ? (
                      <input
                        type="text"
                        value={editForm?.internalOwner || ''}
                        onChange={(e) => setEditForm({ ...editForm!, internalOwner: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <div className="text-sm text-blue-600 font-medium flex items-center">
                        <User className="w-4 h-4 text-blue-500 mr-2" />
                        {agent.internalOwner}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === agent.id ? (
                      <input
                        type="text"
                        value={editForm?.estimatedTimeline || ''}
                        onChange={(e) => setEditForm({ ...editForm!, estimatedTimeline: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <div className="text-sm text-amber-600 font-medium">{agent.estimatedTimeline}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === agent.id ? (
                      <textarea
                        value={editForm?.dependencies || ''}
                        onChange={(e) => setEditForm({ ...editForm!, dependencies: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        rows={1}
                      />
                    ) : (
                      <div className="text-sm text-gray-600 font-medium">{agent.dependencies}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingId === agent.id ? (
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
                          onClick={() => handleEdit(agent)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(agent.id)}
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

export default AgentTracker;