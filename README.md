# 🎯 Next.js & Redux Toolkit Task Manager

A modern, fully responsive Todo application built with Next.js, Redux Toolkit, and Tailwind CSS. Featuring a dark glassmorphism UI and persistent state management.


## ✨ Features

- **Advanced State Management:** Utilizes Redux Toolkit for clean, scalable, and centralized state management.
- **Persistent Storage:** Custom integration with `localStorage` to save tasks and user sessions across browser reloads.
- **Authentication Simulation:** A sleek login flow with SweetAlert2 modals, saving user identity.
- **Dynamic Filtering:** View tasks by status (All, Active, Completed) using Redux selectors.
- **Modern UI/UX:** Crafted with Tailwind CSS featuring dark mode, glassmorphism effects, and smooth transitions.
- **Type Safety:** 100% written in TypeScript for robust and error-free code.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **State Management:** Redux Toolkit (`react-redux`)
- **Styling:** Tailwind CSS
- **Popups & Alerts:** SweetAlert2

## 🚀 Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites
- Node.js installed on your machine

### Installation
1. Clone the repo

sh
git clone https://github.com/VfarzadV/YOUR-REPO-NAME.git

2. Install NPM packages

sh
npm install

3. Run the development server

sh
npm run dev

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 Architecture Notes
This project demonstrates the separation of concerns by keeping the Redux logic (Slices & Store) completely decoupled from the UI components. It also implements safe hydration strategies for Next.js when interacting with browser APIs like `localStorage`.

---
Created with ☕ by VfarzadV