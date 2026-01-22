import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../services/api';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: ''
  });
  const [filter, setFilter] = useState({ status: '', priority: '' });
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter.status) params.status = filter.status;
      if (filter.priority) params.priority = filter.priority;
      
      const response = await taskAPI.getTasks(params);
      if (response.data.success) {
        setTasks(response.data.tasks);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    fetchTasks();
  }, [fetchTasks, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await taskAPI.updateTask(editingTask.id, formData);
        setMessage({ text: 'Task updated successfully!', type: 'success' });
      } else {
        await taskAPI.createTask(formData);
        setMessage({ text: 'Task created successfully!', type: 'success' });
      }
      resetForm();
      fetchTasks();
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || 'Failed to save task', 
        type: 'error' 
      });
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await taskAPI.deleteTask(id);
      setMessage({ text: 'Task deleted successfully!', type: 'success' });
      fetchTasks();
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || 'Failed to delete task', 
        type: 'error' 
      });
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      await taskAPI.updateTask(task.id, { ...task, status: newStatus });
      fetchTasks();
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || 'Failed to update status', 
        type: 'error' 
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: ''
    });
    setEditingTask(null);
    setShowForm(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'in-progress': return '#3b82f6';
      case 'pending': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return <div className="tasks-container"><div className="loading">Loading tasks...</div></div>;
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>My Tasks</h1>
        <div className="header-actions">
          <button onClick={() => navigate('/profile')} className="btn-secondary">Profile</button>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
          <button onClick={() => setMessage({ text: '', type: '' })}>×</button>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {/* Filters */}
      <div className="filters">
        <select 
          value={filter.status} 
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select 
          value={filter.priority} 
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={() => setShowForm(true)} className="btn-add">+ Add Task</button>
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Task title"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Task description"
                  rows="3"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select name="priority" value={formData.priority} onChange={handleInputChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={resetForm} className="btn-cancel">Cancel</button>
                <button type="submit" className="btn-submit">
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="tasks-list">
        {tasks.length === 0 ? (
          <div className="no-tasks">No tasks found. Create your first task!</div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={`task-card ${task.status}`}>
              <div className="task-header">
                <h3>{task.title}</h3>
                <div className="task-badges">
                  <span 
                    className="badge priority" 
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </span>
                  <span 
                    className="badge status" 
                    style={{ backgroundColor: getStatusColor(task.status) }}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
              {task.description && <p className="task-desc">{task.description}</p>}
              <div className="task-meta">
                {task.dueDate && (
                  <span className="due-date">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
                <span className="created-date">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="task-actions">
                <select 
                  value={task.status}
                  onChange={(e) => handleStatusChange(task, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button onClick={() => handleEdit(task)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(task.id)} className="btn-delete">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;
