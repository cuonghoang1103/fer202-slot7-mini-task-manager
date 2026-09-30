import { afterEach, beforeEach, expect, test } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

function renderApp() {
  return render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

beforeEach(() => localStorage.clear());
afterEach(cleanup);

test("hien 10 task ban dau va thong ke dung", () => {
  renderApp();
  expect(screen.getAllByRole("listitem")).toHaveLength(10);
  expect(screen.getByText("Tổng: 10 | Chưa làm: 6 | Hoàn thành: 4")).toBeInTheDocument();
});

test("them task moi, bo qua khi chi go khoang trang", () => {
  renderApp();
  const input = screen.getByPlaceholderText("Nhập tên công việc...");
  fireEvent.change(input, { target: { value: "   " } });
  fireEvent.click(screen.getByRole("button", { name: "Thêm" }));
  expect(screen.getAllByRole("listitem")).toHaveLength(10);

  fireEvent.change(input, { target: { value: "Nộp bài Slot 7" } });
  fireEvent.click(screen.getByRole("button", { name: "Thêm" }));
  expect(screen.getByText("Nộp bài Slot 7")).toBeInTheDocument();
  expect(input).toHaveValue("");
  expect(screen.getByText(/Tổng: 11/)).toBeInTheDocument();
});

test("tick checkbox va xoa task", () => {
  renderApp();
  const item = screen.getByText("Học React Hooks").closest("li");
  fireEvent.click(within(item).getByRole("checkbox"));
  expect(screen.getByText(/Hoàn thành: 5/)).toBeInTheDocument();

  fireEvent.click(within(item).getByRole("button", { name: "Xóa" }));
  expect(screen.queryByText("Học React Hooks")).not.toBeInTheDocument();
  expect(screen.getByText(/Tổng: 9/)).toBeInTheDocument();
});

test("loc theo trang thai va tim kiem", () => {
  renderApp();
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "done" } });
  expect(screen.getAllByRole("listitem")).toHaveLength(4);

  fireEvent.change(screen.getByRole("combobox"), { target: { value: "all" } });
  fireEvent.change(screen.getByPlaceholderText("Tìm kiếm..."), { target: { value: "ôn tập" } });
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
});

test("doi theme va luu vao localStorage", () => {
  const { container } = renderApp();
  expect(container.querySelector(".app")).toHaveClass("light");
  fireEvent.click(screen.getByRole("button", { name: /Dark/ }));
  expect(container.querySelector(".app")).toHaveClass("dark");
  expect(localStorage.getItem("theme")).toBe('"dark"');
});

test("F5 van con du lieu (useLocalStorage)", () => {
  renderApp();
  fireEvent.click(within(screen.getByText("Ôn tập ES6").closest("li")).getByRole("button", { name: "Xóa" }));
  cleanup();
  renderApp(); // gia lap tai lai trang
  expect(screen.queryByText("Ôn tập ES6")).not.toBeInTheDocument();
  expect(screen.getByText(/Tổng: 9/)).toBeInTheDocument();
});
