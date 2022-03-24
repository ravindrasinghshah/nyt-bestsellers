
import { service } from '../http/service';
import { useEffect, useState } from 'react';
import Card from './Card';
import Loading from './Loading';
import { Link } from 'react-router-dom';

export default function Top5BestSelling() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchNames() {
            await service.getTop5BestSellingByDate().then(function (response) {
                setData({ data: response });
                console.log(response)
                setIsLoading(false);
            });
        }
        fetchNames();
    }, []);
    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>
                The New York Times Best Sellers Top 5 books By Category
            </h1>
            {isLoading ? <Loading /> :
                (<div className='h-full overflow-y-auto'>
                    {!isLoading && data && (
                        <>
                            {data.data.results.lists.map((item, index) => {
                                return (
                                    <div className='reveal' key={index} id={"item_" + item.list_id} >
                                        <div className={style.categoryHeader}>
                                            <div className={style.categoryTitle}>
                                                Best sellers of {item.display_name}
                                            </div>
                                            <div className='underline'>
                                                <Link to={`/best-sellers/${item.list_name_encoded}`}
                                                    target="_blank">Show all</Link>
                                            </div>
                                        </div>
                                        <div className={style.cardRow}>
                                            {
                                                item.books.map((book, index) => {
                                                    return (<Card key={index} book={book}
                                                        nameEncoded={item.list_name_encoded}
                                                        name={item.list_name}
                                                        publishedDate={data.data.results.published_date} />)
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    )}
                </div>)
            }
        </div >
    )
}

const style = {
    wrapper: `p-5 m-5 mt-16 border-t`,
    title: `text-3xl py-10 text-center`,
    categoryHeader: `flex flex-col md:flex-row justify-between items-center`,
    categoryTitle: `font-normal text-2xl pb-2 pt-5`,
    cardRow: `flex flex-col md:flex-row flex-wrap justify-between mt-10 w-full`
};