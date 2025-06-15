import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../../redux/slices/taskSlice";

const DeleteModal = (props) => {

    const dispatch = useDispatch();

    const handleDeleteTask = () => {
        dispatch(deleteTask(props.taskID));
        props.onClose();
    };

    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            
            {/* Header */}
            <div className="mb-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                Are you sure you want to delete this task?
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone.
                </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
                <button
                onClick={props.onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                Cancel
                </button>
                <button
                onClick={handleDeleteTask}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                Delete
                </button>
            </div>
            </div>
        </div>
        </>

    );
};

export default DeleteModal;