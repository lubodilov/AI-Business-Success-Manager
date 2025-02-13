import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import KnowledgeBase from './pages/KnowledgeBase';
import Tasks from './pages/Tasks';
import Chat from './pages/Chat';
import AIGuide from './pages/AIGuide';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/knowledge" element={<KnowledgeBase />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/guide" element={<AIGuide />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;