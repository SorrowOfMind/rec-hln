import BooksList from './components/books/BooksList';
import Navbar from './components/layout/Navbar';
import SearchBook from './components/actions/SearchBook';
import SortBooks from './components/actions/SortBooks';
import BooksContextProvider from './contexts/BooksContext';
import SelectPages from './components/actions/SelectPages';
import PagesContextProvider from './contexts/PagesContext';
import ErrorBoundry from './components/errors/ErrorBoundry';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <ErrorBoundry>
          <BooksContextProvider>
            <PagesContextProvider>
              <div className="actions-wrapper my-4 py-4">
                <SearchBook />
                  <div className="actions-small pt-4">
                    <SortBooks />
                    <SelectPages />
                  </div>
              </div>
              <BooksList />
            </PagesContextProvider>
          </BooksContextProvider>
        </ErrorBoundry>
      </div>
    </>
  );
}

export default App;
