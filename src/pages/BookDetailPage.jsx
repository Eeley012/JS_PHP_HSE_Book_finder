import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookDetailPage = () => {

    const { id } = useParams(); // id книги которую будем искать
    const [book, setBook] = useState(null); // данные о книги
    const [loading, setLoading] = useState(true); // флаг загрузки

    useEffect(() => {
        const loadSingleBook = async () => {
            try {
                // запрашиваем данные о книге
                const response = await fetch(`https://openlibrary.org/works/${id}.json`);
                const data = await response.json();
                // достаем нужные данные
                setBook({
                    title: data.title,
                    description: data.description ? (typeof data.description === 'string' ? data.description : data.description.value) : 'Описание отсутствует',
                    year: data.first_publish_date || 'Неизвестно',
                    price: Math.floor(Math.random() * 2000) + 500,
                    cover: data.covers ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : null
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadSingleBook();
    }, [id]);

    if (loading) return <div style={{ padding: 20 }}>Загрузка описания...</div>;
    if (!book) return <div style={{ padding: 20 }}>Книга не найдена</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/books" style={{ textDecoration: 'none', color: '#007bff' }}>← Назад в каталог</Link>
            
            <h1 style={{ marginTop: '10px' }}>{book.title}</h1>
            
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                {book.cover && (
                    <img 
                        src={book.cover} 
                        alt={book.title} 
                        style={{ maxWidth: '300px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
                    />
                )}
                
                <div style={{ flex: 1 }}>
                    <p><strong>Год выпуска:</strong> {book.year}</p>
                    <p><strong>Цена:</strong> <span style={{ fontSize: '24px', color: 'green' }}>{book.price} ₽</span></p>
                    <div style={{ marginTop: '20px', lineHeight: '1.6' }}>
                        <strong>Описание:</strong>
                        <p>{book.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;