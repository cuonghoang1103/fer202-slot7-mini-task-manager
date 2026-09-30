import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // khong cho form tai lai trang
    const text = title.trim();
    if (text === "") return; // bo qua neu chi go khoang trang
    onAdd(text);
    setTitle("");
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="Nhập tên công việc..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn" type="submit">
        Thêm
      </button>
    </form>
  );
}

export default TaskForm;
