import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";

const TaskTrend = () => {
  const { tasks } = useSelector((state) => state.tasks);

  const allStartDates = tasks.map((task) => new Date(task.startDate));
  const earliestDate = new Date(Math.min(...allStartDates));
  const today = new Date();

  earliestDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const trendData = [];
  for (let d = new Date(earliestDate); d <= today; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d);
    currentDate.setHours(0, 0, 0, 0);

    const activeTasks = tasks.filter((task) => {
      const taskStart = new Date(task.startDate);
      const taskClose = task.closedDate ? new Date(task.closedDate) : null;

      taskStart.setHours(0, 0, 0, 0);
      if (taskClose) taskClose.setHours(0, 0, 0, 0);

      return taskStart <= currentDate && (!taskClose || taskClose >= currentDate);
    });

    trendData.push({
      date: format(currentDate, "MMM dd"),
      activeTasks: activeTasks.length,
    });
  }

  return (
    <div className="w-full h-[300px] bg-white shadow-sm rounded-lg p-4">
      <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
        Daily Active Tasks Trend
      </h3>

      {trendData.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
          No tasks available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
            <XAxis
              dataKey="date"
              angle={-35}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12, fill: "#555" }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#555" }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="activeTasks"
              stroke="hsl(var(--primary, 240, 100%, 70%))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TaskTrend;
