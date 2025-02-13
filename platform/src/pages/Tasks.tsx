import React, { useState } from 'react';
import { Plus, Calendar, CheckCircle, X } from 'lucide-react';
import type { Task } from '../types';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review Q1 Performance',
      deadline: '2024-03-20',
      status: 'in-progress',
      aiRecommendation: 'Consider focusing on top-performing products based on recent market analysis.'
    },
    {
      id: '2',
      title: 'Update Marketing Strategy',
      deadline: '2024-03-25',
      status: 'pending',
      aiRecommendation: 'Social media engagement shows potential for expansion in Platform X.'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    deadline: new Date().toISOString().split('T')[0],
    status: 'pending' as const
  });

  const addTask = async () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement actual API call
    // const response = await fetch('/api/task/schedule', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newTask)
    // });
    // const data = await response.json();

    // For now, simulate API response
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      aiRecommendation: 'Based on your business goals, consider prioritizing this task for optimal results.'
    };

    setTasks(prev => [...prev, task]);
    setIsModalOpen(false);
    setNewTask({
      title: '',
      deadline: new Date().toISOString().split('T')[0],
      status: 'pending'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks & Schedule</h1>
        <button
          onClick={addTask}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium
                    ${
                      task.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : task.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {task.status}
                </span>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Calendar className="mr-1.5 h-4 w-4" />
                Deadline: {task.deadline}
              </div>
              {task.aiRecommendation && (
                <div className="mt-4 rounded-md bg-blue-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">AI Recommendation</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>{task.aiRecommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Create New Task</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  required
                  value={newTask.deadline}
                  onChange={(e) => setNewTask(prev => ({ ...prev, deadline: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  value={newTask.status}
                  onChange={(e) => setNewTask(prev => ({ ...prev, status: e.target.value as Task['status'] }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}