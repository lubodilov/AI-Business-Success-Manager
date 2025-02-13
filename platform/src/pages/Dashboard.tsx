import React from 'react';
import { TrendingUp, Target, Clock, Brain } from 'lucide-react';

export default function Dashboard() {
  const insights = [
    {
      title: "Revenue Growth Potential",
      description: "AI analysis suggests 15% growth opportunity in Q2 through market expansion.",
      icon: TrendingUp
    },
    {
      title: "Goal Progress",
      description: "Team productivity increased by 23% after implementing AI recommendations.",
      icon: Target
    },
    {
      title: "Time Optimization",
      description: "Workflow automation could save 12 hours per week per employee.",
      icon: Clock
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <button className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Brain className="mr-2 h-4 w-4" />
          Generate New Insights
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900">Active Goals</h3>
          <p className="mt-2 text-3xl font-semibold text-indigo-600">8</p>
          <p className="mt-2 text-sm text-gray-500">3 goals near completion</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900">Knowledge Base</h3>
          <p className="mt-2 text-3xl font-semibold text-indigo-600">24</p>
          <p className="mt-2 text-sm text-gray-500">Documents processed</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900">AI Interactions</h3>
          <p className="mt-2 text-3xl font-semibold text-indigo-600">156</p>
          <p className="mt-2 text-sm text-gray-500">This month</p>
        </div>
      </div>

      {/* AI Insights */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">AI-Generated Business Insights</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-900">{insight.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}