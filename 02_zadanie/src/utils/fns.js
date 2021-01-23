//fn pomocnicza do dzielenia rekordów na podstawie obecnej strony i wybranej ilości wyświetlanych stron
export function splitRecords (records, currentPage, recordsPerPage) {
    const lastIdx = currentPage * recordsPerPage;
    const firstIdx = lastIdx - recordsPerPage;
    return records.slice(firstIdx, lastIdx);
}

export function findQuery (query, obj){
    return obj.toLowerCase().indexOf(query.trim().toLowerCase()) !== -1;
}

//fn pomocnicza do sortowania tytułów i autorów rosnąco lub malejąco => case-insensitive!
export function sortByString (arr, prop, type){
    //w niektórych tytułach pojawiły się spacje jako pierwszy znak=> nieprawidłowo się sortowały
    //usuń spacje z początku i końca tytułu:
    let trimmed = arr.map(obj => ({...obj, tytul: obj.tytul.trim()}));
    
    if (type === 'asc') return trimmed.sort((a, b) => a[prop].localeCompare(b[prop], undefined, {sensitivity: 'base'}));
    return trimmed.sort((a, b) => b[prop].localeCompare(a[prop], undefined, {sensitivity: 'base'}));
}

export function sortByNumber (arr, prop, type){
    if (type === 'asc') return arr.sort((a, b) => parseFloat(a[prop]) - parseFloat(b[prop]));
    return arr.sort((a, b) => parseFloat(b[prop]) - parseFloat(a[prop]));
}

//dodaj pole 'img' do obiektu z linkiem do obrazka
export function addImgUrl(obj, ident){
    const url = `http://helion.pl/okladki/65x85/${ident}.jpg`;
    obj.img = url;
    return obj;
}
