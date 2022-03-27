import react from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import moment from 'moment';
import { BsFillTrophyFill } from 'react-icons/bs';
import { service } from '../http/service';
import Error from "./Error";
import Share from "./Share";
import Loading from './Loading';
import SupportUs from './SupportUs';
import BuyBook from './BuyBook';

export default function Book() {
    const location = useLocation();
    const name = location.state?.name;
    const [book, setData] = useState(location.state?.book);
    const [isLoading, setIsLoading] = useState(location.state == null);

    const useQuery = () => {
        const { search } = useLocation();
        return react.useMemo(() => new URLSearchParams(search), [search]);
    }

    const searchQuery = useQuery();

    useEffect(() => {
        async function fetchBook() {
            let published_date = searchQuery.get("d");
            let category = searchQuery.get("n");
            let title = searchQuery.get("t");
            var response = await service.getBookByDate_Category_Title(published_date, category, title);
            setData(response);
            setIsLoading(false);
        }
        if (isLoading)
            fetchBook();
    }, []);
    return (
        <div className={style.wrapper}>
            <>
                {isLoading ? <Loading /> :
                    (
                        book ? (<>
                            <Link to="/" className={style.back}>Go back to home</Link>
                            <div>
                                <div className={style.nyt}>
                                    <img width="18" className="mr-1"
                                        src="https://developer.nytimes.com/files/poweredby_nytimes_30a.png?v=1583354208339" alt="nyt_icon" />
                                    The New York Times Best Seller
                                </div>
                                <div className={style.title}>{book.title}</div>
                                <div className="flex flex-row">
                                    <div className={style.subtitle}>
                                        <div>
                                            <span className="font-thin">Author</span> <span>{book.author}</span>
                                        </div>
                                        <div className="mx-2 leading-3">
                                            <span>.</span>
                                        </div>
                                        <div>
                                            <span className="font-thin">ISBN</span> <span>{book.primary_isbn13}</span>
                                        </div>
                                        <div className="mx-2 leading-3">
                                            <span>.</span>
                                        </div>
                                        <div>
                                            <span className="font-thin">Published by</span> <span>{book.publisher}</span>
                                        </div>
                                        <div className="mx-2 leading-3">
                                            <span>.</span>
                                        </div>
                                        <div>
                                            <span className="font-thin">Category</span> <span>{name}</span>
                                        </div>
                                    </div>
                                    <div className={style.subtitle + " " + style.share}>
                                        <Share />
                                    </div>
                                </div>
                                <div className={style.detailsWrapper}>
                                    <div className="rounded">
                                        <img src={book.book_image} className="rounded w-full" alt="book_cover" />
                                    </div>
                                    <div className={style.detailsSection}>
                                        <div>
                                            <p className="font-semibold text-xl pb-2"> About Book </p>
                                            {book.description}
                                        </div>
                                        <div className="flex flex-row items-center pt-5">
                                            <BsFillTrophyFill className="mr-3 text-[#FDCC0D] text-xl" />
                                            <span>Book ranked <strong>{book.rank}</strong> on {moment(book?.updated_date?.split(' ')[0]).format('LL')}.</span>
                                        </div>
                                        <BuyBook book={book} />
                                        <SupportUs />
                                    </div>
                                </div>
                            </div>
                        </>) : (<Error />)
                    )}
            </>
        </div>
    )
}

const style = {
    wrapper: `w-screen font-light pt-10 pb-5 px-5 md:px-10`,
    back: `underline text-sm`,
    nyt: `font-semibold text-sm flex flex-row items-center pt-7`,
    title: `text-3xl font-semibold pt-3 pb-2`,
    subtitle: `flex flex-col md:flex-row text-sm`,
    share: `ml-auto items-center`,
    detailsWrapper: `flex flex-col md:flex-row pt-10`,
    detailsSection: `pt-10 md:pt-0 md:ml-10 md:pl-10 md:border-l`,
}