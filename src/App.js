import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import './App.css';

function App() {
  // флга авторизаации
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
            <nav style={{ display: 'flex', gap: '20px' }}>
                <Link to="/" style={{ color: 'white' }}>Главная</Link>
                {!isAuth ? (
                    <Link to="/login" style={{ color: 'white' }}>Войти</Link>
                ) : (
                    <>
                        <Link to="/books" style={{ color: 'white' }}>Каталог</Link>
                        <button onClick={() => setIsAuth(false)}>Выйти</button>
                    </>
                )}
            </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<MainPage />} />
            
            <Route 
                path="/login" 
                element={<LoginPage setIsAuth={setIsAuth} />} 
            />
            
            <Route 
                path="/books" 
                element={isAuth ? <BooksPage /> : <Navigate to="/login" />} 
            />
            
            <Route path="/books/works/:id" element={<BookDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;