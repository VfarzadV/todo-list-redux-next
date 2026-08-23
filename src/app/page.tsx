import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import Header from '@/components/Header'; // ایمپورت هدر

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center py-12 px-4 sm:px-6 font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-xl w-full mx-auto z-10 flex flex-col gap-2">
        <Header />
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
          <div className="px-8 py-10 text-center relative border-b border-slate-800/80">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">لیست کارهای من</h1>
            <p className="text-slate-400 text-sm font-medium">مدیریت کارهای روزانه با استایل تاریک</p>
          </div>
          <div className="px-8 py-8">
            <AddTodo />
            <TodoList />
          </div>
        </div>
      </div>
    </main>
  );
}