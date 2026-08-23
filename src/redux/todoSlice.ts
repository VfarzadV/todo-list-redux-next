import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
interface TodoState {
  items: Todo[];
  filter: FilterType;
}
const initialState: TodoState = {
  items: [],
  filter: "all",
};
export type FilterType = "all" | "active" | "completed";

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
      };
      state.items.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    loadSavedTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
  },
});
export const { addTodo, toggleTodo, deleteTodo, loadSavedTodos, setFilter } =
  todoSlice.actions;
export default todoSlice.reducer;
