import React, { useState } from 'react';
import { Users, Calendar, CheckCircle, Search, Plus, Filter, Building, User, Briefcase, Sparkles } from 'lucide-react';
import ClientOverview from './components/ClientOverview';
import AgentTracker from './components/AgentTracker';
import ResourceDashboard from './components/ResourceDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('clients');

  const tabs = [
    { id: 'clients', label: 'Client Overview', icon: Building },
    { id: 'agents', label: 'Agent Tracker', icon: CheckCircle },
    { id: 'resources', label: 'Resources', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Client & Agent Management</h1>
                <p className="text-gray-600">Comprehensive Resource & Project Dashboard</p>
              </div>
            </div>
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'clients' && <ClientOverview />}
        {activeTab === 'agents' && <AgentTracker />}
        {activeTab === 'resources' && <ResourceDashboard />}
      </div>
    </div>
  );
}

export default App;