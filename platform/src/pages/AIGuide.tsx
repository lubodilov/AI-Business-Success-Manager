import React from 'react';
import { BookOpen, User, FileText, Calendar, MessageSquare, CheckCircle, Target } from 'lucide-react';

export default function AIGuide() {
  const sections = [
    {
      title: 'Getting Started',
      icon: Target,
      content: [
        'Set clear business goals and objectives',
        'Prepare relevant business documents and market research',
        'Plan your daily tasks and success metrics',
        'Choose the right AI mode for your needs'
      ]
    },
    {
      title: 'Knowledge Base Best Practices',
      icon: FileText,
      content: [
        'Include detailed business plans and strategies',
        'Add market research and competitor analysis',
        'Upload customer feedback and survey results',
        'Include industry reports and trend analysis',
        'Keep documents up-to-date and well-organized'
      ]
    },
    {
      title: 'Success Manager Mode Tips',
      icon: BookOpen,
      content: [
        'Ask specific questions about business challenges',
        'Request data-driven insights and recommendations',
        'Discuss strategic planning and growth opportunities',
        'Seek advice on operational improvements',
        'Use for decision-making support'
      ]
    },
    {
      title: 'Persona AI Mode Tips',
      icon: User,
      content: [
        'Upload detailed customer persona documents',
        'Include customer journey maps and pain points',
        'Add voice-of-customer research',
        'Test marketing messages and product ideas',
        'Gather feedback on user experience'
      ]
    },
    {
      title: 'Task Management',
      icon: Calendar,
      content: [
        'Review and update tasks daily',
        'Set clear deadlines and priorities',
        'Break down large goals into smaller tasks',
        'Track progress and adjust as needed',
        'Schedule regular strategy reviews'
      ]
    },
    {
      title: 'Effective Communication',
      icon: MessageSquare,
      content: [
        'Be specific in your questions',
        'Provide context for better responses',
        'Follow up on recommendations',
        'Document important insights',
        'Share findings with your team'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">AI Success Guide</h1>
          <p className="mt-1 text-sm text-gray-500">
            Learn how to maximize the value of your AI Business Success Manager
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow-lg text-white p-6">
        <h2 className="text-xl font-semibold mb-2">🌟 Quick Start Guide</h2>
        <p className="text-white/90">
          Your AI Business Success Manager is designed to help you achieve your business goals through
          strategic insights and personalized guidance. Follow this guide to get the most out of the platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h2 className="ml-3 text-lg font-medium text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-blue-900 mb-4">💡 Pro Tips</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h3 className="font-medium text-blue-900 mb-2">Daily Routine</h3>
            <p className="text-gray-600">
              Start each day by reviewing your tasks, updating priorities, and scheduling key activities.
              End your day by reflecting on achievements and planning for tomorrow.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h3 className="font-medium text-blue-900 mb-2">Knowledge Management</h3>
            <p className="text-gray-600">
              Regularly update your knowledge base with new insights, market changes, and business developments
              to keep the AI's recommendations relevant and accurate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}