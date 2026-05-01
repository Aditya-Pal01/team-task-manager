import { useState, useEffect } from "react";
import API from "../api";

export default function KanbanBoard({ tasks, setTasks }) {
  const [columns, setColumns] = useState({
    todo: [],
    doing: [],
    done: [],
  });

  useEffect(() => {
    setColumns({
      todo: tasks.filter((t) => t.status === "todo"),
      doing: tasks.filter((t) => t.status === "doing"),
      done: tasks.filter((t) => t.status === "done"),
    });
  }, [tasks]);

  const onDragStart = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const onDrop = async (e, status) => {
    const task = JSON.parse(e.dataTransfer.getData("task"));

    try {
      const res = await API.put(`/tasks/${task._id}`, {
        ...task,
        status,
      });

      const updatedTasks = tasks.map((t) =>
        t._id === task._id ? res.data : t
      );

      setTasks(updatedTasks);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.board}>
      {["todo", "doing", "done"].map((col) => (
        <div
          key={col}
          style={styles.column}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, col)}
        >
          <h3>{col.toUpperCase()}</h3>

          {columns[col].map((task) => (
            <div
              key={task._id}
              draggable
              onDragStart={(e) => onDragStart(e, task)}
              style={{
                ...styles.card,
                background:
                  new Date(task.dueDate) < new Date()
                    ? "#ef4444"
                    : "#334155",
              }}
            >
              {task.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const styles = {
  board: {
    display: "flex",
    gap: "20px",
  },

  column: {
    flex: 1,
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    minHeight: "300px",
  },

  card: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    cursor: "grab",
    color: "white",
  },
};