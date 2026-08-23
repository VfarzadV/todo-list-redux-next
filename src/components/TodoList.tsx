'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { toggleTodo, deleteTodo, loadSavedTodos, setFilter } from '@/redux/todoSlice';

export default function TodoList() {
    const todos = useSelector((state: RootState) => state.todos.items);
    const currentFilter = useSelector((state: RootState) => state.todos.filter);
    const dispatch = useDispatch<AppDispatch>();
    const isInitialMount = useRef(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => setIsClient(true), 0);
        if (isInitialMount.current) {
            const savedData = localStorage.getItem('my-todo-list');
            if (savedData) dispatch(loadSavedTodos(JSON.parse(savedData)));
            isInitialMount.current = false;
        }
        return () => clearTimeout(timeoutId);
    }, [dispatch]);

    useEffect(() => {
        if (!isInitialMount.current && isClient) {
            localStorage.setItem('my-todo-list', JSON.stringify(todos));
        }
    }, [todos, isClient]);

    if (!isClient) {
        return <div className="text-center py-10 text-slate-500 font-medium animate-pulse">در حال خواندن اطلاعات...</div>;
    }

    const filteredTodos = todos.filter((todo) => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex gap-2 p-1.5 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <button
                    onClick={() => dispatch(setFilter('all'))}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${currentFilter === 'all'
                        ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                >
                    همه
                </button>
                <button
                    onClick={() => dispatch(setFilter('active'))}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${currentFilter === 'active'
                        ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                >
                    در حال انجام
                </button>
                <button
                    onClick={() => dispatch(setFilter('completed'))}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${currentFilter === 'completed'
                        ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                >
                    انجام شده
                </button>
            </div>
            {filteredTodos.length === 0 ? (
                <div className="text-center py-10 bg-slate-900/30 rounded-2xl border border-dashed border-slate-700">
                    <p className="text-slate-500 font-medium">موردی برای نمایش وجود ندارد! 🔍</p>
                </div>
            ) : (
                <ul className="space-y-3">
                    {filteredTodos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${todo.completed
                                ? 'bg-slate-950/40 border-slate-800 opacity-50'
                                : 'bg-slate-800/40 border-slate-700/50 shadow-sm hover:shadow-md hover:border-indigo-500/50 hover:bg-slate-800/60'
                                }`}
                        >
                            <label className="flex items-center gap-4 cursor-pointer flex-1">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => dispatch(toggleTodo(todo.id))}
                                        className="peer appearance-none w-6 h-6 border-2 border-slate-600 rounded-lg checked:border-emerald-500 checked:bg-emerald-500 transition-all cursor-pointer bg-slate-900/50"
                                    />
                                    <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className={`text-[15px] transition-all duration-300 ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200 font-medium'
                                    }`}>
                                    {todo.text}
                                </span>
                            </label>
                            <button
                                onClick={() => dispatch(deleteTodo(todo.id))}
                                className="text-slate-500 hover:text-rose-400 bg-slate-900/50 hover:bg-rose-500/10 p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                                title="حذف کردن"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}