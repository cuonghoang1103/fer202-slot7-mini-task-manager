import { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useTheme } from "./context/ThemeContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { initialTasks } from "./data/tasks";

function App() {
  const { theme } = useTheme();
  const [tasks, setTasks] = useLocalStorage("tasks", initialTasks);
  const [filter, setFilter] = useState("all"); // all | todo | done
  const [search, setSearch] = useState("");

  // ----- them / doi trang thai / xoa: luon tao mang MOI, khong sua mang cu -----
  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // ----- thong ke (tinh tren TAT CA task) -----
  const total = tasks.length;
  const doneCount = tasks.filter((t) => t.completed).length;
  const todoCount = total - doneCount;

  // ----- loc theo trang thai + tim kiem theo ten -----
  const visibleTasks = tasks
    .filter((t) => {
      if (filter === "todo") return !t.completed;
      if (filter === "done") return t.completed;
      return true;
    })
    .filter((t) => t.title.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div className={"app " + theme}>
      <div className="card">
        <Header />

        <TaskForm onAdd={addTask} />

        <div className="row">
          <select
            className="input select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="todo">Chưa làm</option>
            <option value="done">Hoàn thành</option>
          </select>
          <input
            className="input"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <p className="stats">
          Tổng: {total} | Chưa làm: {todoCount} | Hoàn thành: {doneCount}
        </p>

        <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
      </div>
    </div>
  );
}

export default App;
