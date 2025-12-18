import React from 'react';
import { useNavigate } from 'react-router-dom';
// авторизация без пароля, как "гостевой вход" 
const LoginPage = ({ setIsAuth }) => {
    const navigate = useNavigate();

    const login = () => {
        setIsAuth(true); // устанавливаем флаг авторизации
        navigate('/books'); // переходим в каталог
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Страница входа</h1>
            <p>Нажмите кнопку, чтобы авторизироваться и войти в магазин</p>
            <button 
                onClick={login}
                style={{ padding: '10px 20px', background: 'green', color: 'white', border: 'none' }}
            >
                Войти как Студент
            </button>
        </div>
    );
};

export default LoginPage;