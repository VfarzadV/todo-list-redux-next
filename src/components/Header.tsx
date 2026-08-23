'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { login, logout, loadSavedUser } from '@/redux/authSlice';

import Swal from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css';

export default function Header() {
    const { isLoggedIn, username } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const isInitialMount = useRef(true);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => setIsClient(true), 0);
        if (isInitialMount.current) {
            const savedUsername = localStorage.getItem('my-todo-username');
            if (savedUsername) {
                dispatch(loadSavedUser(savedUsername));
            }
            isInitialMount.current = false;
        }
        return () => clearTimeout(timeoutId);
    }, [dispatch]);

    useEffect(() => {
        if (!isInitialMount.current && isClient) {
            if (isLoggedIn && username) {
                localStorage.setItem('my-todo-username', username);
            } else {
                localStorage.removeItem('my-todo-username');
            }
        }
    }, [isLoggedIn, username, isClient]);

    const handleLoginClick = async () => {
        const result = await Swal.fire({
            title: 'ورود به حساب',
            text: 'لطفاً نام خود را وارد کنید:',
            input: 'text',
            inputPlaceholder: 'مثلاً: فرزاد...',
            background: '#0f172a',
            color: '#ffffff',
            confirmButtonText: 'تایید و ورود',
            confirmButtonColor: '#4f46e5',
            showCancelButton: true,
            cancelButtonText: 'انصراف',
            cancelButtonColor: '#475569',
            customClass: {
                popup: 'rounded-3xl border border-slate-700 shadow-2xl',
                input: 'border-slate-700 focus:ring-2 focus:ring-indigo-500 rounded-xl',
            },
            preConfirm: (inputValue) => {
                if (!inputValue) {
                    Swal.showValidationMessage('لطفاً نام خود را وارد کنید!');
                }
                return inputValue;
            },
        });

        if (result.isConfirmed && result.value) {
            dispatch(login(result.value));
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: `خوش اومدی ${result.value}!`,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#0f172a',
                color: '#34d399',
            });
        }
    };

    if (!isClient) {
        return (
            <div className="flex items-center justify-between bg-slate-900/50 backdrop-blur-md border border-slate-700/50 px-6 py-4 rounded-2xl mb-8">
                <h2 className="text-xl font-bold text-white">تودولیست حرفه‌ای</h2>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between bg-slate-900/50 backdrop-blur-md border border-slate-700/50 px-6 py-4 rounded-2xl mb-8">
            <div>
                <h2 className="text-xl font-bold text-white">تودولیست حرفه‌ای</h2>
            </div>
            <div>
                {isLoggedIn ? (
                    <div className="flex items-center gap-4">
                        <span className="text-emerald-400 font-medium">خوش اومدی، {username}! ✌️</span>
                        <button
                            onClick={() => {
                                dispatch(logout());
                                Swal.fire({
                                    toast: true,
                                    position: 'top-end',
                                    icon: 'info',
                                    title: 'با موفقیت خارج شدی!',
                                    showConfirmButton: false,
                                    timer: 2000,
                                    background: '#0f172a',
                                    color: '#60a5fa',
                                });
                            }}
                            className="bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 px-4 py-2 rounded-lg text-sm transition-all border border-slate-700 hover:border-rose-500/50"
                        >
                            خروج
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleLoginClick}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all"
                    >
                        ورود به حساب
                    </button>
                )}
            </div>
        </div>
    );
}