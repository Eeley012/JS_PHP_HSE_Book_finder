import React, { useState, useEffect } from 'react';
import { useServerGoods } from '../hooks/useServerGoods';
import { Link } from 'react-router-dom';

const BooksPage = () => {
    // используем наш кастомный хук, получаем данные с сервера и 
    const { goods, loading, error, hasMore, loadGoods } = useServerGoods();
    
    // Локальное состояние для строки поиска и номера страницы
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadGoods(search, 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //коммент выше просто глушит warning

    // нажатие кнопки поиска
    const handleSearch = () => {
        setPage(1); // Сбрасываем на 1 страницу
        loadGoods(search, 1);
    };
    // нажатие кнопки "показать больше"
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadGoods(search, nextPage);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Каталог книг</h1>

            <div className="search-box">
                <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                    placeholder="Введите название книги..."
                />
                <button onClick={handleSearch} className="search-button">Искать</button>
            </div>

            {/* При ошибке соединения отображать «Ошибка соединения» */}
            {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}

            <div className="results">
                {goods.map((book, index) => (
                    <div key={`${book.id}-${index}`} className="book-card">
                        <h3>{book.title}</h3>
                        <p>Автор: {book.author}</p>
                        <p>Год: {book.year}</p>
                        <p>Цена: <b>{book.price} ₽</b></p>
                        <Link to={`/books${book.id}`}>Подробнее</Link>
                    </div>
                ))}
            </div>

            {/* При загрузке выводить сообщение «Загрузка…» */}
            {loading && <p>Загрузка...</p>}

            {/* показываем толлько при определенных условиях, спользуя индикаторы полученные из хука */}
            {!loading && goods.length > 0 && hasMore && (
                <button 
                    onClick={handleLoadMore} 
                    className="search-button"
                    style={{ marginTop: '20px', width: '100%' }}
                >
                    Загрузить больше
                </button>
            )}
        </div>
    );
};

export default BooksPage;