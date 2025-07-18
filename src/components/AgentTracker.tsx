import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Plus, Edit2, Save, X, User, Trash2, Bot, Settings } from 'lucide-react';

interface AgentEntry {
  id: string;
  agentName: string;
  demoReady: boolean;
  internalOwner: string;
  estimatedTimeline: string;
  dependencies: string;
  [key: string]: any;
}

interface ColumnConfig {
  key: string;
  label: string;
  type: 'text' | 'boolean' | 'textarea';
}

const AgentTracker: React.FC = () => {
  const [agents, setAgents] = useState<AgentEntry[]>([]);
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { key: 'agentName', label: 'Agent Name', type: 'text' },
    { key: 'demoReady', label: 'Demo Ready', type: 'boolean' },
    { key: 'internalOwner', label: 'Internal Owner', type: 'text' },
    { key: 'estimatedTimeline', label: 'Estimated Timeline', type: 'text' },
    { key: 'dependencies', label: 'Dependencies', type: 'textarea' }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<AgentEntry | null>(null);
  const [editingHeader, setEditingHeader] = useState<string | null>(null);
  const [headerEditValue, setHeaderEditValue] = useState('');
  
  // Multiple filters
  const [filters, setFilters] = useState({
    agentName: '',
    internalOwner: '',
    estimatedTimeline: '',
    dependencies: '',
    demoReady: ''
  });
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddColumnForm, setShowAddColumnForm] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState<'text' | 'boolean' | 'textarea'>('text');
  const [newAgent, setNewAgent] = useState<Partial<AgentEntry>>({});

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedAgents = localStorage.getItem('agents');
    const savedColumns = localStorage.getItem('agentColumns');
    
    if (savedAgents) {
      try {
        setAgents(JSON.parse(savedAgents));
      } catch (error) {
        console.error('Error parsing saved agents:', error);
        // Set default data if parsing fails
        const defaultAgents = [
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
        ];
        setAgents(defaultAgents);
        localStorage.setItem('agents', JSON.stringify(defaultAgents));
      }
    } else {
      // Default data
      const defaultAgents = [
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
      ];
      setAgents(defaultAgents);
      localStorage.setItem('agents', JSON.stringify(defaultAgents));
    }
    
    if (savedColumns) {
      try {
        setColumns(JSON.parse(savedColumns));
      } catch (error) {
        console.error('Error parsing saved columns:', error);
        localStorage.setItem('agentColumns', JSON.stringify(columns));
      }
    } else {
      localStorage.setItem('agentColumns', JSON.stringify(columns));
    }
  }, []);

  // Save data to localStorage whenever agents or columns change
  useEffect(() => {
    if (agents.length > 0) {
      localStorage.setItem('agents', JSON.stringify(agents));
    }
  }, [agents]);

  useEffect(() => {
    if (columns.length > 0) {
      localStorage.setItem('agentColumns', JSON.stringify(columns));
    }
  }, [columns]);

  const handleEdit = (agent: AgentEntry) => {
    setEditingId(agent.id);
    setEditForm({ ...agent });
  };

  const handleSave = () => {
    if (editForm) {
      const updatedAgents = agents.map(agent => 
        agent.id === editForm.id ? editForm : agent
      );
      setAgents(updatedAgents);
      localStorage.setItem('agents', JSON.stringify(updatedAgents));
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
      const updatedAgents = agents.filter(agent => agent.id !== id);
      setAgents(updatedAgents);
      localStorage.setItem('agents', JSON.stringify(updatedAgents));
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
    localStorage.setItem('agentColumns', JSON.stringify(updatedColumns));
    setEditingHeader(null);
    setHeaderEditValue('');
  };

  const handleHeaderDelete = (columnKey: string) => {
    if (window.confirm('Are you sure you want to delete this column? This will remove all data in this column.')) {
      const updatedColumns = columns.filter(col => col.key !== columnKey);
      setColumns(updatedColumns);
      
      // Remove the column data from all agents
      const updatedAgents = agents.map(agent => {
        const { [columnKey]: removed, ...rest } = agent;
        return rest;
      });
      setAgents(updatedAgents);
      
      localStorage.setItem('agentColumns', JSON.stringify(updatedColumns));
      localStorage.setItem('agents', JSON.stringify(updatedAgents));
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
      
      // Add empty values for existing agents
      const updatedAgents = agents.map(agent => ({
        ...agent,
        [newColumn.key]: newColumn.type === 'boolean' ? false : ''
      }));
      setAgents(updatedAgents);
      
      localStorage.setItem('agentColumns', JSON.stringify(updatedColumns));
      localStorage.setItem('agents', JSON.stringify(updatedAgents));
      
      setNewColumnName('');
      setNewColumnType('text');
      setShowAddColumnForm(false);
    }
  };

  const handleAddAgent = () => {
    const hasRequiredFields = columns.some(col => newAgent[col.key] !== undefined && newAgent[col.key] !== '');
    if (hasRequiredFields) {
      const agent: AgentEntry = {
        id: Date.now().toString(),
        ...columns.reduce((acc, col) => ({
          ...acc,
          [col.key]: newAgent[col.key] !== undefined ? newAgent[col.key] : (col.type === 'boolean' ? false : '')
        }), {})
      };
      const updatedAgents = [...agents, agent];
      setAgents(updatedAgents);
      localStorage.setItem('agents', JSON.stringify(updatedAgents));
      setNewAgent({});
      setShowAddForm(false);
    }
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  };

  const filteredAgents = agents.filter(agent => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === '') return true;
      if (key === 'demoReady') {
        if (value === 'true') return agent[key] === true;
        if (value === 'false') return agent[key] === false;
        return true;
      }
      return String(agent[key] || '').toLowerCase().includes(value.toLowerCase());
    });
  });

  const renderCell = (agent: AgentEntry, column: ColumnConfig) => {
    if (editingId === agent.id) {
      if (column.type === 'boolean') {
        return (
          <input
            type="checkbox"
            checked={editForm?.[column.key] || false}
            onChange={(e) => setEditForm({ ...editForm!, [column.key]: e.target.checked })}
            className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
        );
      } else if (column.type === 'textarea') {
        return (
          <textarea
            value={editForm?.[column.key] || ''}
            onChange={(e) => setEditForm({ ...editForm!, [column.key]: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={1}
          />
        );
      } else {
        return (
          <input
            type="text"
            value={editForm?.[column.key] || ''}
            onChange={(e) => setEditForm({ ...editForm!, [column.key]: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        );
      }
    } else {
      const value = agent[column.key];
      if (column.type === 'boolean') {
        return (
          <div className="flex items-center">
            {value ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className={`ml-2 text-sm font-semibold ${value ? 'text-green-700' : 'text-red-700'}`}>
              {value ? 'Yes' : 'No'}
            </span>
          </div>
        );
      } else if (column.key === 'internalOwner') {
        return (
          <div className="text-sm text-blue-600 font-medium flex items-center">
            <User className="w-4 h-4 text-blue-500 mr-2" />
            {value}
          </div>
        );
      } else if (column.key === 'agentName') {
        return <div className="text-sm font-semibold text-gray-900">{value}</div>;
      } else if (column.key === 'estimatedTimeline') {
        return <div className="text-sm text-amber-600 font-medium">{value}</div>;
      } else {
        return <div className="text-sm text-gray-600 font-medium">{value}</div>;
      }
    }
  };

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
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Agent</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 text-gray-900">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {columns.map(column => (
            column.type === 'boolean' ? (
              <select
                key={column.key}
                value={filters[column.key] || ''}
                onChange={(e) => handleFilterChange(column.key, e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">All {column.label}</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            ) : (
              <input
                key={column.key}
                type="text"
                placeholder={`Filter by ${column.label}...`}
                value={filters[column.key] || ''}
                onChange={(e) => handleFilterChange(column.key, e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            )
          ))}
        </div>
      </div>

      {/* Add Agent Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Add New Agent</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {columns.map(column => (
              <div key={column.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{column.label}</label>
                {column.type === 'boolean' ? (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newAgent[column.key] as boolean || false}
                      onChange={(e) => setNewAgent({ ...newAgent, [column.key]: e.target.checked })}
                      className="mr-2 h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="text-sm font-medium text-gray-700">{column.label}</label>
                  </div>
                ) : column.type === 'textarea' ? (
                  <textarea
                    value={newAgent[column.key] as string || ''}
                    onChange={(e) => setNewAgent({ ...newAgent, [column.key]: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={`Enter ${column.label.toLowerCase()}`}
                    rows={2}
                  />
                ) : (
                  <input
                    type="text"
                    value={newAgent[column.key] as string || ''}
                    onChange={(e) => setNewAgent({ ...newAgent, [column.key]: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
              onClick={handleAddAgent}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Agent
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter column name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Column Type</label>
              <select
                value={newColumnType}
                onChange={(e) => setNewColumnType(e.target.value as 'text' | 'boolean' | 'textarea')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="text">Text</option>
                <option value="textarea">Textarea</option>
                <option value="boolean">Yes/No</option>
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
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Column
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Agent Entries</h3>
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
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500"
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
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                      {renderCell(agent, column)}
                    </td>
                  ))}
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