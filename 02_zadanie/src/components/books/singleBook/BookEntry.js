import {usePages} from '../../../contexts/PagesContext';

const BookEntry = ({book, idx}) => {
    const {currentPage, recordsPerPage} = usePages();
    return (
        <tr>
            <td>{(recordsPerPage * (currentPage - 1)) + idx + 1}</td>
            <td>{book.ident}</td>
            <td>{book.tytul}</td>
            <td>{book.autor}</td>
            <td>{book.cena}</td>
            <td className="text-center">{book.typ}</td>
            <td className="text-center">{book.status}</td>
            <td className="text-center">
                <img src={book.img} alt="cover img"/>
            </td>
        </tr>
    )
}

export default BookEntry;
