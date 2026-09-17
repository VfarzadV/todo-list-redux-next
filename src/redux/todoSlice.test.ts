import todoReducer, {
  addTodo,
  toggleTodo,
  deleteTodo,
  fetchTodos,
} from "./todoSlice";
import { configureStore } from "@reduxjs/toolkit";

global.fetch = jest.fn();

describe("Todo Redux Slice", () => {
  it("should return the initial state on first run", () => {
    const result = todoReducer(undefined, { type: "unknown" });
    expect(result).toEqual({
      items: [],
      filter: "all",
      status: "idle",
      error: null,
    });
  });

  it("should handle adding a new todo", () => {
    const initialState = {
      items: [],
      filter: "all" as const,
      status: "idle" as const,
      error: null,
    };
    const result = todoReducer(initialState, addTodo("یادگیری تست‌نویسی"));
    expect(result.items.length).toBe(1);
    expect(result.items[0].text).toBe("یادگیری تست‌نویسی");
  });

  it("should handle toggling a todo status", () => {
    const initialState = {
      items: [{ id: "1", text: "خرید نان", completed: false }],
      filter: "all" as const,
      status: "idle" as const,
      error: null,
    };
    const result = todoReducer(initialState, toggleTodo("1"));
    expect(result.items[0].completed).toBe(true);
  });

  it("should handle deleting a todo", () => {
    const initialState = {
      items: [
        { id: "1", text: "خرید نان", completed: false },
        { id: "2", text: "ورزش", completed: true },
      ],
      filter: "all" as const,
      status: "idle" as const,
      error: null,
    };
    const result = todoReducer(initialState, deleteTodo("1"));
    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBe("2");
  });

  it("should fetch todos from API and update state", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 99, title: "تسک تستی از اینترنت تقلبی", completed: false },
        ]),
    });
    const store = configureStore({
      reducer: { todos: todoReducer },
    });
    await store.dispatch(fetchTodos());
    const state = store.getState().todos;
    expect(state.status).toBe("succeeded");
    expect(state.items.length).toBe(1);
    expect(state.items[0].text).toBe("تسک تستی از اینترنت تقلبی");
  });
});
