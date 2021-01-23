import {useState, useEffect} from 'react';
import {useBooks} from '../../contexts/BooksContext';
import BookEntry from './singleBook/BookEntry';
import Pagination from '../pagination/Pagination';
import {splitRecords} from '../../utils/fns';
import {usePages} from '../../contexts/PagesContext';
import Loader from '../loader/Loader';
import Error from '../errors/Error';

const BooksList = () => {
    const {books, filteredBooks, apiError} = useBooks();
    const {currentPage, recordsPerPage} = usePages();
    const [pageRecords, setPageRecords] = useState();

    //jeśli nastąpią zmiany w dependencies array (zmiana strony, zmiana ilości wyświetlanych stron etc) podziel tablicę books i filteredBooks (jeśli nie jest pusta), a rezultat zapisz w stanie lokalnym dla tego komponentu (pageRecords);
    //fn splitRecords -> /utils
    useEffect(() => {
        const records = filteredBooks ? splitRecords(filteredBooks, currentPage, recordsPerPage) : splitRecords(books, currentPage, recordsPerPage);
        setPageRecords(records);
    }, [books, filteredBooks, currentPage, recordsPerPage]);
  
    return (
        <>
        {apiError ? <Error error={apiError}/> :
        <div className="books-list">
            {!books.length && <Loader />}
            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered">
                    <thead className="table-head">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Id</th>
                            <th scope="col">Tytuł</th>
                            <th scope="col">Autor</th>
                            <th scope="col">Cena</th>
                            <th scope="col">Typ</th>
                            <th scope="col">Status</th>
                            <th scope="col">Okładka</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //renderowanie warunkowe w zależności od tablic books i filteredBooks => jeśli filteredBooks nie jest pusta, to chcemy ją wyświetlić
                            //w obu przypadkach mapujemy po pageRecords z lokalnego stanu tego komponentu, gdzie znajduje się kawałek rekordów do wyświetlenia w zależności od strony i ustawionej ilości stron do wyświetlenia
                            (books.length > 0 && !filteredBooks && pageRecords) ? 
                            pageRecords.map((book, idx) => <BookEntry key={book.ident} book={book} idx={idx}/>) :
                            filteredBooks && pageRecords.map((book, idx) => <BookEntry key={book.ident} book={book} idx={idx}/>)
                        }
                    </tbody>
                </table>
            </div>
            {books.length > 0 && <Pagination numOfRecords={filteredBooks ? filteredBooks.length : books.length} />}
        </div>
        }
        </>
    )
}

export default BooksList;
