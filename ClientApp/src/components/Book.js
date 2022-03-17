import { useLocation, Link } from "react-router-dom";
import moment from 'moment';
import { FiExternalLink } from 'react-icons/fi';
import Error from "./Error";
import Share from "./Share";

export default function Book() {
    const location = useLocation();
    const book = location.state.book;
    console.log(book)
    return (
        <div className={style.wrapper}>
            {book ? (<>
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
                                <span className="font-thin">Category</span> <span>TBD..</span>
                            </div>
                            <div className="mx-2 leading-3">
                                <span>.</span>
                            </div>
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
                        </div>
                        <div className={style.subtitle + " " + style.share}>
                            <Share />
                        </div>
                    </div>
                    <div className="flex flex-row pt-10">
                        <div className="rounded">
                            <img src={book.book_image} className="rounded" alt="book_cover" />
                        </div>
                        <div className="ml-10 pl-10 border-l">
                            <div>
                                <p className="font-semibold text-xl pb-2"> About Book </p>
                                {book.description}
                            </div>
                            <div>
                                This book ranked {book.rank} on {moment(book.updated_date.split(' ')[0]).format('LL')}
                            </div>
                            <div className={style.buyWrapper}>
                                <p className="pb-2">Buy Book</p>
                                <div className={style.buyBox}>
                                    {book.buy_links.map((buy, index) => {
                                        return (
                                            <a href={buy.url} name={buy.name}
                                                key={index}
                                                target="_blank"
                                                className={style.action}>
                                                <span><FiExternalLink /></span>
                                                <span className='ml-2'>{buy.name}</span>
                                            </a>
                                        )
                                    })}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </>) : (
                <div className="h-52"><Error /></div>)}
        </div>
    )
}

const style = {
    wrapper: `w-screen font-light px-20 pt-10 pb-5`,
    back: `underline text-sm`,
    nyt: `font-semibold text-sm flex flex-row items-center pt-7`,
    title: `text-3xl font-semibold pt-3 pb-2`,
    subtitle: `flex text-sm`,
    share: `ml-auto items-center`,
    buyWrapper: `flex flex-col border-t mt-12 pt-8 text-xl font-semibold`,
    buyBox: `flex items-center flex-wrap pt-2`,
    action: `flex flex-row items-center border p-2 mr-2 rounded bg-white hover:bg-gray-100 font-thin text-sm`
}