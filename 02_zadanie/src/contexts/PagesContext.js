import {createContext, useContext, useState} from 'react';

const PagesContext = createContext();

//customowa nazwa do wywołania context
export const usePages = () => useContext(PagesContext);

//context odpowiadający za stronnicowanie
const PagesContextProvider = props => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    return (
        <PagesContext.Provider value={{currentPage, setCurrentPage, recordsPerPage, setRecordsPerPage}}>
            {props.children}
        </PagesContext.Provider>
            
    )
}

export default PagesContextProvider;
