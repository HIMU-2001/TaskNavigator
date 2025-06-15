import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateEditModal from '../Modal/TaskModal/TaskModal';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';
import Button from '../Button/Button';
import {
  FaExclamationTriangle,
  FaPencilAlt,
  FaTrashAlt,
  FaHourglassHalf,
  FaTasks,
  FaCheckCircle,
} from 'react-icons/fa';

const TaskCard = ({ task }) => {
  const role = useSelector((state) => state.auth.user?.role);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState('');
  const [taskToView, setTaskToView] = useState('');
  const [taskToDelete, setTaskToDelete] = useState('');
  const [taskToApprove, setTaskToApprove] = useState('');

  const openModal = (setter, taskID) => {
    setter(taskID);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setTaskToEdit('');
    setTaskToView('');
    setTaskToDelete('');
    setTaskToApprove('');
    setIsModalOpen(false);
  };

  const handleAction = (e, actionSetter) => {
    const taskId = e.target.closest('.TaskCard')?.id;
    if (taskId) openModal(actionSetter, taskId);
  };

  const renderPriority = () => {
    const priorityStyles = {
      High: { color: 'bg-red-100 text-red-600', icon: <FaExclamationTriangle className="text-red-600" /> },
      Moderate: { color: 'bg-yellow-100 text-yellow-700', icon: <FaExclamationTriangle className="text-yellow-600" /> },
      Low: { color: 'bg-green-100 text-green-600', icon: <FaExclamationTriangle className="text-green-600" /> },
    };

    const { color, icon } = priorityStyles[task.priority] || {};
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        {icon}
        {task.priority}
      </div>
    );
  };

  const renderStatus = () => {
  const statusMap = {
    Open: { label: 'Open', color: 'bg-blue-100 text-blue-700', icon: <FaTasks /> },
    Closed: { label: 'Closed', color: 'bg-green-100 text-green-700', icon: <FaCheckCircle /> },
    'Pending Approval': { label: 'In Approval', color: 'bg-yellow-100 text-yellow-700', icon: <FaHourglassHalf /> },
  };

  const { label, color, icon } = statusMap[task.status] || {};
  return (
    <div className={`inline-flex items-center gap-2 m-1 px-3 py-1 rounded-full text-sm font-medium ${color}`}>
      {icon}
      {label}
    </div>
  );
  };

  const renderStatusIcon = () => {
    const iconStyle = { color: 'white', width: '16px', height: '16px' };
    switch (task.status) {
      case 'Open':
        return <Button id="status-open" className="statusOpen" icon={<FaTasks />} iconStyle={iconStyle} />;
      case 'Closed':
        return <Button id="status-closed" className="statusClosed" icon={<FaCheckCircle />} iconStyle={iconStyle} />;
      case 'Pending Approval':
        return <Button id="status-pending" className="statusPending" icon={<FaHourglassHalf />} iconStyle={iconStyle} />;
      default:
        return null;
    }
  };

  const getTimeSpent = () => {
    const start = new Date(task.startDate);
    const end = task.closedDate ? new Date(task.closedDate) : new Date();

    // If start is in the future
    if (start > end) {
      return "Not started";
    }

    const diffInMs = end - start;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    const hoursRemainder = diffInHours % 24;

    return diffInDays > 0
      ? `${diffInDays}d ${hoursRemainder}h`
      : `${diffInHours}h`;
  };



  return (
    <>
      <div
        id={task.id}
        onClick={(e) => handleAction(e, setTaskToView)}
        className="TaskCard cursor-pointer bg-white shadow-md rounded-2xl p-4 w-full max-w-md min-h-[280px] flex flex-col justify-between border border-gray-100 hover:shadow-lg transition-shadow duration-200"
      >

        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg leading-snug break-words">{task.title}</h3>
          {role === 'Developer' && (
            <div className="flex gap-3 text-xl">
              <button
                onClick={task.status !== 'Closed' ? (e) => {
                  e.stopPropagation();
                  handleAction(e, setTaskToEdit);
                } : undefined}
                disabled={task.status === 'Closed'}
                className={`p-1 rounded-md ${task.status === 'Closed' ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Edit"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(e, setTaskToDelete);
                }}
                className="p-1 text-red-500 rounded-md hover:bg-red-100"
                title="Delete"
              >
                <FaTrashAlt />
              </button>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="cursor-pointer space-y-2">
          {renderPriority()}
          {renderStatus()}
          <div className="grid grid-cols-2 gap-2 text-sm pt-1">
            <div>
              <p className="text-gray-500 font-medium">Assigned To</p>
              <p className="text-gray-800">{task.assignedTo}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Assigned By</p>
              <p className="text-gray-800">{task.assignedBy}</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-500 font-medium">Time Spent</p>
              <p className="text-gray-800">{getTimeSpent()}</p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div
          className={`mt-4 pt-4 border-t flex items-center ${
            role === 'Manager' && task.status === 'Pending Approval'
              ? 'justify-between'
              : 'justify-end'
          }`}
        >
          {role === 'Manager' && task.status === 'Pending Approval' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(e, setTaskToApprove);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              Approve / Reject
            </button>
          )}
          {renderStatusIcon()}
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <>
          {taskToEdit && (
            <CreateEditModal onClose={handleCloseModal} text="Update Task" taskID={taskToEdit} />
          )}
          {taskToView && (
            <CreateEditModal onClose={handleCloseModal} text="Task Details" taskID={taskToView} />
          )}
          {taskToApprove && (
            <CreateEditModal onClose={handleCloseModal} text="Approve Task" taskID={taskToApprove} />
          )}
          {taskToDelete && (
            <DeleteModal onClose={handleCloseModal} taskID={taskToDelete} />
          )}
        </>
      )}
    </>
  );
};

export default TaskCard;
