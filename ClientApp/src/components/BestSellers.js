import { useParams, Link } from "react-router-dom";
import moment from 'moment';
import { service } from '../http/service';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import Error from "./Error";
import Card from "./Card";
import Share from "./Share";
import { IoBookmarksOutline } from "react-icons/io5";

export default function BestSellers() {
    const [isLoading, setIsLoading] = useState(true);
    const param = useParams();
    const category = param?.category;
    const [books, setData] = useState([]);

    useEffect(() => {
        async function fetchNames() {
            await service.getBestSellingByName(category).then(function (response) {
                setData(response);
                console.log(response)
                setIsLoading(false);
            });
        }
        fetchNames();
    }, []);
    return (
        <div className={style.wrapper}>
            <Link to="/" className={style.back}>Go back to home</Link>
            {category ?
                <>
                    {isLoading ? <Loading /> :
                        (<>
                            {!isLoading && books && (
                                <div>
                                    <div className={style.nyt}>
                                        <img width="22" className="mr-2"
                                            src="https://developer.nytimes.com/files/poweredby_nytimes_30a.png?v=1583354208339" alt="nyt_icon" />
                                        The New York Times Best Sellers for {books.results.display_name}
                                    </div>
                                    <div className="flex flex-row">
                                        <div className={style.subtitle}>
                                            <div>
                                                <span className="font-thin">Found</span> <span>{books.num_results}</span>
                                            </div>
                                            <div className="mx-2 leading-3">
                                                <span>.</span>
                                            </div>
                                            <div>
                                                <span className="font-thin">Last updated on</span> <span>
                                                    {moment(books.results?.bestsellers_date?.split(' ')[0]).format('LL')}</span>
                                            </div>
                                            <div className="mx-2 leading-3">
                                                <span>.</span>
                                            </div>
                                            <div>
                                                <span className="font-thin">Updates </span>
                                                <span>{books.results.updated}</span>
                                            </div>
                                        </div>
                                        <div className={style.subtitle + " " + style.share}>
                                            <Share />
                                        </div>
                                    </div>
                                    <div className={style.cardRow}>
                                        {books.results.books.map((book, index) => {
                                            return (
                                                <Card key={index} book={book}
                                                    nameEncoded={books.results.list_name_encoded}
                                                    name={books.results.display_name}
                                                    publishedDate={books.results.published_date} />
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </>)
                    }
                </>
                : <Error />}
        </div >
    )
}

const style = {
    wrapper: `w-screen font-light pt-10 pb-5 px-5 lg:px-20`,
    back: `underline text-sm`,
    nyt: `font-semibold text-3xl flex flex-row items-center pt-7 pb-2`,
    subtitle: `flex flex-col md:flex-row text-sm`,
    share: `ml-auto items-center`,
    detailsWrapper: `flex flex-col md:flex-row pt-10 flex-wrap justify-start`,
    cardRow: `flex flex-col md:flex-row flex-wrap justify-between mt-10 w-full`
}