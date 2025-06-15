import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../../../redux/slices/taskSlice";
import { FaTimes } from "react-icons/fa";

const CreateEditModal = (props) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const role = useSelector((state) => state.auth.user?.role);
  const task = tasks.find((task) => task.id === props.taskID);

  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [priority, setPriority] = useState(task ? task.priority : "");
  const [assignedTo, setAssignedTo] = useState(task ? task.assignedTo : "");
  const [assignedBy, setAssignedBy] = useState(task ? task.assignedBy : "");
  const [startDate, setStartDate] = useState(
    task ? new Date(task.startDate).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10)
  );
  const [comments, setComments] = useState(task ? task.comments : "");
  const [status, setStatus] = useState(task ? task.status : "Open");
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(task ? task.timeSpent : 0);

  const isFormValid = title && description && priority && assignedTo && assignedBy;

  const handleCreateTask = () => {
    const newTask = {
      title,
      description,
      priority,
      status,
      assignedTo,
      assignedBy,
      startDate,
      closedDate: null,
      approvedDate: null,
      comments,
      timeSpent: totalTime,
    };

    if (props.text === "Create Task") {
      dispatch(addTask(newTask));
      } else if (props.text === "Update Task") {
    const updatedTask = {
      ...task,
      title,
      description,
      priority,
      assignedTo,
      assignedBy,
      startDate,
      comments,
      timeSpent: totalTime + time,
      status: status === "Closed" ? "Pending Approval" : status,
      closedDate: status === "Closed" ? new Date() : null,
    };
      dispatch(updateTask({ id: task.id, updatedTask }));
    }
    props.onClose();
  };

  const handleApproveTask = () => {
    const updatedTask = {
      ...task,
      status: "Closed",
      approvedDate: new Date(),
    };
    dispatch(updateTask({ id: task.id, updatedTask }));
    props.onClose();
  };

  const handleRejectTask = () => {
    const updatedTask = {
      ...task,
      status: "Open",
      approvedDate: null,
      closedDate: null,
    };
    dispatch(updateTask({ id: task.id, updatedTask }));
    props.onClose();
  };

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
        {/* Modal Content */}
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6 relative">
          {/* Close Icon */}
          <button
            onClick={props.onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>

          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {props.text}
          </h2>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                <input
                  type="text"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Assigned By</label>
                <input
                  type="text"
                  value={assignedBy}
                  onChange={(e) => setAssignedBy(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Comments</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 mt-6">
            {props.text === "Approve Task" && (
              <>
                <button
                  onClick={handleApproveTask}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={handleRejectTask}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </>
            )}

            {(props.text === "Create Task" || props.text === "Update Task") && (
              <button
                onClick={handleCreateTask}
                disabled={!isFormValid}
                className={`${
                  isFormValid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-300 cursor-not-allowed"
                } text-white px-4 py-2 rounded-md transition`}
              >
                {props.text}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEditModal;
