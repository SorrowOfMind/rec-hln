import { usePages } from '../../contexts/PagesContext';

const Pagination = ({numOfRecords}) => {
    const {recordsPerPage, setCurrentPage, currentPage} = usePages();
    const totalPages = Math.ceil(numOfRecords/recordsPerPage);

    //pomocniczy array do iterowania po liczbie potrzebnych stron
    const pages = Array.from({length: totalPages}, (_, idx) => idx + 1);

    //obsługa strzałek
    const pageForward = () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    const pageBackward = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

    return (
        <ul className="pagination mt-4">
            {currentPage > 1 && <span className="material-icons arrow" onClick={pageBackward}>keyboard_arrow_left</span>}
            {numOfRecords > recordsPerPage &&
                pages.map(page => <li key={page} onClick={() => setCurrentPage(page)} className={currentPage === page ? "active page m-1" : "page m-1"}>{page}</li>)}
            {currentPage < totalPages && <span className="material-icons arrow" onClick={pageForward}>keyboard_arrow_right</span>}
        </ul>
    )
}

export default Pagination;
