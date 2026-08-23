'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addTodo } from '@/redux/todoSlice';

export default function AddTodo() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        dispatch(addTodo(input));
        setInput('');
    };
    return (
        <form onSubmit={handleSubmit} className="flex gap-3 mb-8 relative">
            <input
                type="text"
                className="flex-1 bg-slate-950/50 border border-slate-700 text-white text-sm rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-500 shadow-inner"
                placeholder="تسک جدید رو وارد کن..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-4 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 transition-all duration-300"
            >
                ثبت
            </button>
        </form>
    );
}