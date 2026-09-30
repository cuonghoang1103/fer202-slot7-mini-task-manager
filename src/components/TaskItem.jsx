function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? "item done" : "item"}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.title}</span>
      </label>
      <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
        Xóa
      </button>
    </li>
  );
}

export default TaskItem;
