import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  items: Todo[];
  filter: FilterType;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TodoState = {
  items: [],
  filter: "all",
  status: "idle",
  error: null,
};

interface ApiTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type FilterType = "all" | "active" | "completed";
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=3",
  );
  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات از سرور");
  }
  const data = await response.json();

  return data.map((item: ApiTodo) => ({
    id: item.id.toString(),
    text: item.title,
    completed: item.completed,
  }));
});

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded"; 
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "خطای نامشخص";
      });
  },
});

export const { addTodo, toggleTodo, deleteTodo, loadSavedTodos, setFilter } =
  todoSlice.actions;
export default todoSlice.reducer;
