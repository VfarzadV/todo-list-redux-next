import todoReducer, { addTodo, toggleTodo, deleteTodo } from "./todoSlice";

describe("Todo Redux Slice", () => {
  it("should return the initial state on first run", () => {
    const result = todoReducer(undefined, { type: "unknown" });
    expect(result).toEqual({ items: [], filter: "all" });
  });

  it("should handle adding a new todo", () => {
    const initialState = { items: [], filter: "all" as const };
    const result = todoReducer(initialState, addTodo("یادگیری تست‌نویسی"));
    expect(result.items.length).toBe(1);
    expect(result.items[0].text).toBe("یادگیری تست‌نویسی");
    expect(result.items[0].completed).toBe(false);
  });

  it("should handle toggling a todo status", () => {
    const initialState = {
      items: [{ id: "1", text: "خرید نان", completed: false }],
      filter: "all" as const,
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
    };
    const result = todoReducer(initialState, deleteTodo("1"));
    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBe("2");
    expect(result.items[0].text).toBe("ورزش");
  });
});
