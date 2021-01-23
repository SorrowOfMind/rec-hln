import {useRef, useState, useEffect} from 'react';
import {useBooks} from '../../contexts/BooksContext';
import { usePages } from '../../contexts/PagesContext';

const SearchBook = () => {
    const {filterBooks} = useBooks();
    const {setCurrentPage} = usePages();
    const [query, setQuery] = useState('');
    const searchRef = useRef();

    //ustaw fokus na inpucie do filtrowania
    useEffect(() => searchRef.current.focus(), []);

    //filtruj na każdy input użytkownika
    useEffect(() => {
        filterBooks(query);
        setCurrentPage(1);
    }, [query, setCurrentPage]);

    const handleChange = e => setQuery(e.target.value);

    return (
        <div className="input-group">
            <span className="input-group-text action-search-text">Szukaj</span>
            <input type="text" className="form-control action-search" ref={searchRef} onChange={handleChange} placeholder="Wyszukaj tytuł, autora lub id"/>
        </div>
    )
}

export default SearchBook;
