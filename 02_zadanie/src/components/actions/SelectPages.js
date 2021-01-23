import { usePages } from '../../contexts/PagesContext';

const SelectPages = () => {
    const {recordsPerPage, setRecordsPerPage, setCurrentPage} = usePages();

    const handleChange = e => {
        setRecordsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    }

    return (
        <select className="form-select action-select" value={recordsPerPage} onChange={handleChange}>
            <option disabled>Ilość wyników na stronie</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
    )
}

export default SelectPages;
