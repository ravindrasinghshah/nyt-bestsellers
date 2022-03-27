import { service } from '../http/service';
import { useEffect, useState } from 'react';
import Autocomplete from './Autocomplete';

export default function Search() {
    const [isLoading, setIsLoading] = useState(true);
    const [history, setHistory] = useState([]);
    const handleSearchClick = (event) => {
        service.getBestSellingHistory().then(response => {
            console.log('getBestSellingHistory', response);
        });
    };

    async function fetchHistory() {
        await service.getBestSellingHistory().then(function (response) {
            let history = [];
            console.log(response.results)
            response.results.forEach(book => {
                history.push(book);
            });
            setHistory({ history });
            setIsLoading(false); console.log(history)
        });
    }

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div className={style.wrapper}>
            <p className={style.searchTitle}> Search Best Seller Books </p>
            <p className={style.searchSubTitle}>Discover best selling books and enjoy reading.</p>
            {!isLoading && history && <Autocomplete
                suggestions={history}
            />
            }
            <button className={style.searchButton}
                onClick={handleSearchClick}>
                Search
            </button>

            {/* Search 
- All (history)
- By date
- By name
*/}
        </div>
    )
};
const style = {
    wrapper: `p-5 w-[420px] border absolute shadow-[0_6px_20px_rgba(0,0,0,0.2)] rounded-lg h-96`,
    searchTitle: `font-bold text-2xl`,
    searchSubTitle: `mt-1 font-thin text-gray-600`,
    searchButton: `bg-primaryBlack text-white py-2 px-4 rounded-md mt-10`
};