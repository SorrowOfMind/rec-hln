import {useState, createContext, useEffect, useContext} from 'react';
import {fetchBooks} from '../api/index';
import {findQuery, sortByString, sortByNumber, addImgUrl} from '../utils/fns';

const BooksContext = createContext();

//customowa nazwa do wywołania context
export const useBooks = () => useContext(BooksContext);

//context odpowiadający za wszystkie akcje związane z książkami (sciągnięcie danych, sortowanie, filtrowanie)
const BooksContextProvider = props => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState(null);
    const [apiError, setApiError] = useState('');

    //1. ściągnij dane przy pierwszym renderze (useEffect), posortuj tytułem A-Z
    //fn fetchBooks -> /api
    //2. zmapuj posortowane dane i dodaj prop 'img' z linkiem do obrazka
    //3. zapisz dane w stanie aplikacji
    const getBooks = async () => {
        try {
            const {data} = await fetchBooks();
            let sortedData = sortByString(data, 'tytul', 'asc');
            let imgData = sortedData.map(book => addImgUrl(book, book.ident));
            setBooks(imgData);
        } catch (error) {
            setApiError(error.message);
            console.log(error);
        }
    }
    
    useEffect(() => getBooks(), []);

    //filtruj po każdym wpisanym znaku i zapisuj w stanie aplikacji w osobej tablicy (filteredBooks)
    //fn findQuery -> /utils
    const filterBooks = query => {
        if (query === '') setFilteredBooks(null);
        else {
            let filteredList = books.filter(book => {
                const {tytul, autor, ident} = book;
                return findQuery(query, tytul) || findQuery(query, autor) || findQuery(query, ident);
            });
            setFilteredBooks(filteredList);
        }
    }

    //sortuj po podanym typie sortowania - sortuj tablicę books i filteredBook jeśli nie jest pusta
    //fn sortByString, sortByNumber -> /utils
    const sortBooks = type => {
        let sortedArr = [], sortedFilteredArr = [];
        let tempBooks = [...books];
        let tempFilteredBooks = filteredBooks ? [...filteredBooks] : null;
        switch (type) {
            case 'title_asc':
                if (filteredBooks) sortedFilteredArr = sortByString(tempFilteredBooks, 'tytul', 'asc');
                sortedArr = sortByString(tempBooks, 'tytul', 'asc');
                break;
            case 'title_desc':
                if (filteredBooks) sortedFilteredArr = sortByString(tempFilteredBooks, 'tytul', 'desc');
                sortedArr = sortByString(tempBooks, 'tytul', 'desc');
                break;
            case 'author_asc':
                if (filteredBooks) sortedFilteredArr = sortByString(tempFilteredBooks, 'autor', 'asc');
                sortedArr = sortByString(tempBooks, 'autor', 'asc');
                break;
            case 'author_desc':
                if (filteredBooks) sortedFilteredArr = sortByString(tempFilteredBooks, 'autor', 'desc');
                sortedArr = sortByString(tempBooks, 'autor', 'desc');
                break;
            case 'price_asc':
                if (filteredBooks) sortedFilteredArr = sortByNumber(tempFilteredBooks, 'cena', 'asc');
                sortedArr = sortByNumber(tempBooks, 'cena', 'asc');
                break;
            case 'price_desc':
                if (filteredBooks) sortedFilteredArr = sortByNumber(tempFilteredBooks, 'cena', 'desc');
                sortedArr = sortByNumber(tempBooks, 'cena', 'desc');
                break;
            default:
                return;
        }
        if (filteredBooks) setFilteredBooks(sortedFilteredArr);
        setBooks(sortedArr);
    }

    return (
        <BooksContext.Provider value={{books, filteredBooks, filterBooks, sortBooks, apiError}}>
            {props.children}
        </BooksContext.Provider>
    )
}

export default BooksContextProvider;
