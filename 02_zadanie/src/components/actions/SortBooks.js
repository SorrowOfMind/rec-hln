import {useState, useEffect} from 'react';
import {useBooks} from '../../contexts/BooksContext';

const SortBooks = () => {
    const [sortOption, setSortOption] = useState('title_asc');
    const {sortBooks} = useBooks();

    const handleChange = e => setSortOption(e.target.value);

    useEffect(() => sortBooks(sortOption), [sortOption]);

    return (
        <select className="form-select action-sort" value={sortOption} onChange={handleChange}>
            <option disabled>Sortuj</option>
            <option value="title_asc">Tytuł A-Z</option>
            <option value="title_desc">Tytuł Z-A</option>
            <option value="author_asc">Autor A-Z</option>
            <option value="author_desc">Autor Z-A</option>
            <option value="price_asc">Cena rosnąco</option>
            <option value="price_desc">Cena malejąco</option>
        </select>
    )
}

export default SortBooks;
