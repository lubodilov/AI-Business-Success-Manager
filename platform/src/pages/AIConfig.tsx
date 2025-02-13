import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import type { AIAssistantConfig } from '../types';

export default function AIConfig() {
  const [config, setConfig] = useState<AIAssistantConfig>({
    businessGoals: ['Increase revenue by 20%', 'Expand to new markets'],
    industry: 'Technology',
    preferredStyle: 'balanced',
    focusAreas: ['Sales', 'Marketing', 'Operations']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call
    // await fetch('/api/assistant/create', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(config)
    // });
  };

  const addGoal = () => {
    setConfig(prev => ({
      ...prev,
      businessGoals: [...prev.businessGoals, '']
    }));
  };

  const removeGoal = (index: number) => {
    setConfig(prev => ({
      ...prev,
      businessGoals: prev.businessGoals.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">AI Assistant Configuration</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Business Goals</h2>
          </div>
          <div className="p-6 space-y-4">
            {config.businessGoals.map((goal, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={goal}
                  onChange={e => {
                    const newGoals = [...config.businessGoals];
                    newGoals[index] = e.target.value;
                    setConfig(prev => ({ ...prev, businessGoals: newGoals }));
                  }}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => removeGoal(index)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addGoal}
              className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Goal
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Assistant Preferences</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <select
                value={config.industry}
                onChange={e => setConfig(prev => ({ ...prev, industry: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Retail</option>
                <option>Manufacturing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">AI Style</label>
              <select
                value={config.preferredStyle}
                onChange={e => setConfig(prev => ({ ...prev, preferredStyle: e.target.value as any }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="conservative">Conservative</option>
                <option value="balanced">Balanced</option>
                <option value="innovative">Innovative</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Save className="mr-2 h-4 w-4" />
            Generate AI Assistant
          </button>
        </div>
      </form>
    </div>
  );
}