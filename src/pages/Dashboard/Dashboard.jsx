import React, { useState, useEffect } from 'react';
import TaskCard from '../../components/TaskCard/TaskCard';
import CreateEditModal from '../../components/Modal/TaskModal/TaskModal';
import { useSelector } from 'react-redux';
import TaskTrend from '../../components/TaskTrend/TaskTrend';
import Stats from '../../components/Stats/Stats'
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { tasks } = useSelector((state) => state.tasks);
  const role = useSelector((state) => state.auth.user?.role);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('None');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const statuses = ['All', 'Open', 'Closed', 'Pending Approval'];

  console.log("Tasks: ", tasks);

  const handleLogout = () => {
    navigate('/');
  };
  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let tempTasks = [...tasks];

    if (filterStatus !== 'All') {
      tempTasks = tempTasks.filter(task => task.status === filterStatus);
    }

    if (sortBy === 'Priority') {
      const priorityOrder = { High: 1, Moderate: 2, Low: 3 };
      tempTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'StartDate') {
      tempTasks.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }
    else if (sortBy === 'ClosedDate') {
      tempTasks.sort((a, b) => new Date(b.closedDate) - new Date(a.closedDate));
    }

    setFilteredTasks(tempTasks);

  }, [filterStatus, sortBy, tasks]);

  const handleFilterClick = (status) => {
    setFilterStatus(status);
  };

  const handleSortTask = (sortOption) => {
    setSortBy(sortOption);
  };


  return (
<div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {role === "Developer" ? "My Tasks" : "All Tasks"}
            </h1>
            <p className="text-gray-500 mt-1">
              {role === "Developer" ? "Developer View" : "Manager View"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {role === "Developer" && (
              <button
                onClick={handleAddTask}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition w-full sm:w-auto"
              >
                <FaPlus className="mr-2 h-4 w-4" />
                Add Task
              </button>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition w-full sm:w-auto"
            >
              <FaSignOutAlt className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Filters & Sorting */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Filter By:</label>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    className={`px-3 py-1 text-sm rounded-md border transition ${
                      selectedStatus === status
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setSelectedStatus(status);
                      handleFilterClick(status);
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label htmlFor="sortTask-dropdown" className="text-sm font-medium text-gray-700">
                Sort By:
              </label>
              <select
                id="sortTask-dropdown"
                className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleSortTask(e.target.value)}
              >
                <option value="None">None</option>
                <option value="Priority">Priority</option>
                <option value="StartDate">Start Date</option>
                <option value="ClosedDate">Closed Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trend Chart & Stats*/}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Task Trends (Chart) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm h-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Task Trends</h2>
            <TaskTrend />
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Stats</h2>
            <Stats tasks={filteredTasks} />
          </div>
        </div>

        
        {/* Task List */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          {filteredTasks.length > 0 ? (
            <div
              className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {filteredTasks.map((eachTask) => (
                  <TaskCard key={eachTask.id} task={eachTask} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No tasks available</p>
          )}
        </div>


        {/* Create/Edit Modal */}
        {isModalOpen && (
          <CreateEditModal onClose={handleCloseModal} text="Create Task" />
        )}
      </div>
    </div>

  );
};

export default Dashboard;