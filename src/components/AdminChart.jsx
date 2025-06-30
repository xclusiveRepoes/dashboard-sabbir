import React, { useState, useEffect } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { useSelector } from "react-redux";

// Soft dashboard-friendly colors
const COLORS = ["#0D9488", "#EF4444", "#22C55E", "#3B82F6"];

// 🔧 Helper function for responsive sizing
const getChartSize = () => {
  const width = window.innerWidth;
  if (width < 640) return { width: 250, height: 250, radius: 80 };   // sm
  if (width < 768) return { width: 300, height: 300, radius: 100 };  // md
  if (width < 1024) return { width: 400, height: 400, radius: 120 }; // lg
  return { width: 500, height: 500, radius: 150 };                   // xl
};

const AdminChart = () => {
  const { employees } = useSelector((state) => state.userSlice);

  const [chartSize, setChartSize] = useState(getChartSize());

  // ⏳ Handle screen resize
  useEffect(() => {
    const handleResize = () => setChartSize(getChartSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 📊 Count task statuses
  let pending = 0;
  let completed = 0;
  let failed = 0;
  let newTask = 0;

  let tasks = employees.map((employee) => employee.tasks);
  for (let i = 0; i < tasks.length; i++) {
    tasks[i]?.forEach((task) => {
      if (task.completed) return (completed += 1);
      if (task.failed) return (failed += 1);
      if (!task.active && !task.completed && !task.failed)
        return (pending += 1);
      if (task.active) return (newTask += 1);
    });
  }

  const data = [
    { name: "Completed Task", value: completed },
    { name: "Failed Task", value: failed },
    { name: "Active Task", value: pending },
    { name: "New Task", value: newTask },
  ];

  return (
    <div className="w-full px-4 md:px-[60px] py-[20px]">
      <div className="w-full bg-[#9ca3af8e] dark:bg-[#1c1c1c] py-[20px] rounded-md flex flex-col items-center justify-center overflow-x-auto">
        <PieChart width={chartSize.width} height={chartSize.height}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={chartSize.radius}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* 🧾 Custom responsive legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 px-2 text-sm text-gray-800 dark:text-gray-200">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminChart;
