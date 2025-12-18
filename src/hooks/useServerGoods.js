import { useState, useCallback } from 'react';

// кастомный хук
export const useServerGoods = () => {
    
    const [goods, setGoods] = useState([]);      // загруженные книги
    const [loading, setLoading] = useState(false); // флаг текущей загрузки (да/нет)
    const [error, setError] = useState(null);      // error messages
    const [hasMore, setHasMore] = useState(true);  // флаг того, что книги в источнике кончились

    const loadGoods = useCallback(async (query, page = 1) => {

        if (!query) return;

        // флаг загрузки и сброс ошибок
        setLoading(true);
        setError(null);

        try {
            console.log(`Загрузка: ${query}, страница ${page}`);

            // вставляем в url название и страницу
            const response = await fetch(`https://openlibrary.org/search.json?title=${query}&page=${page}`);
            
            if (!response.ok) {
                throw new Error('Ошибка соединения');
            }

            // получаем объект с данными ответа
            const data = await response.json();
            
            // книг нет, ставим флаг
            if (data.docs.length === 0) {
                setHasMore(false);
            }

            // формируем из полученых данных объект для визуализации
            const newBooks = data.docs.slice(0, 10).map(book => ({
                id: book.key,
                title: book.title,
                author: book.author_name ? book.author_name.join(', ') : 'Неизвестный автор',
                year: book.first_publish_year,
                price: Math.floor(Math.random() * 2000) + 500 
            }));

            // prev — это ранее показанные книги
            setGoods(prev => {
                // первичный поиск
                if (page === 1) {
                    return newBooks;
                }
                // загрузить больше
                return [...prev, ...newBooks];
            });

        } catch (err) {
            setError('Ошибка соединения');
            console.error(err);
        } finally {
            // выключить индикатор загрузки
            setLoading(false);
        }
    }, []);

    // возвращаем загруженные книни, индикаторы загрузки и кнокпи "загрухить еще"
    // потенциальное сообщегние об ошибке и сам метод получения данных с сервера
    return { goods, loading, error, hasMore, loadGoods };
};