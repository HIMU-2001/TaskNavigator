import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

const QuickStats = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500 text-sm">No tasks to display.</p>;
  }

  const total = tasks.length;
  const open = tasks.filter((t) => t.status.toLowerCase() === "open").length;
  const inProgress = tasks.filter((t) => t.status.toLowerCase() === "in_progress").length;
  const pending = tasks.filter((t) => t.status.toLowerCase() === "pending approval").length;
  const closed = tasks.filter((t) => t.status.toLowerCase() === "closed").length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
      <StatCard title="Total" value={total} />
      <StatCard title="Open" value={open} />
      <StatCard title="In Progress" value={inProgress} />
      <StatCard title="Pending" value={pending} />
      <StatCard title="Closed" value={closed} />
    </div>
  );
};

export default QuickStats;
