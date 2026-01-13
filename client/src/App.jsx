import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const API_BASE = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error('Failed to create task');
      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateTask = async (taskData) => {
    if (!editingTask) return;
    try {
      const res = await fetch(`${API_BASE}/${editingTask._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error('Failed to update task');
      const updatedTask = await res.json();
      setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleTask = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !task.isCompleted }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updatedTask = await res.json();
      setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
    } catch (err) {
      alert(err.message);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tight">
              Task Master
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Manage your day with elegance.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingTask(null);
              setShowForm(!showForm);
            }}
            className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all active:scale-95 flex items-center gap-2 ${showForm
                ? 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
              }`}
          >
            {showForm ? 'Cancel' : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Task
              </>
            )}
          </button>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Form Section */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showForm ? 'max-h-[500px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-indigo-100 border border-indigo-50">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <TaskForm
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                initialData={editingTask}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>

          {/* Task List Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                {tasks.filter(t => !t.isCompleted).length} pending
              </span>
            </div>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onEdit={startEditing}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
