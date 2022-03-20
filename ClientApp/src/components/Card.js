import { FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Card(prop) {
    // console.log(prop.book)
    var searchQuery = `?d=${prop.publishedDate}&n=${prop.nameEncoded}&t=${prop.book.title}`
    return (
        <div className={style.wrapper}>
            <div className="relative overflow-hidden">
                <img src={prop.book.book_image} alt="book_image"
                    className={style.image}
                />
            </div>
            <div className="p-2">
                <p className={style.title}>{prop.book.title}</p>
                <p className={style.author}>- {prop.book.author}</p>
                {/* <p className='text-sm font-thin text-gray-800'>{prop.book.description}</p> */}
                {/* <p>ISBN: {prop.book.primary_isbn10}</p> */}
                {/* 
                <p>Create date: {prop.publishedDate}</p>
                <p>Category: {prop.category}</p> */}
                <p>
                    <Link
                        to={`/book${searchQuery}`}
                        state={{ book: prop.book, name: prop.name }}>
                        Go to Book
                    </Link>
                </p>
            </div>
            <div className={style.buy}>
                {prop.book.buy_links.map((buy, index) => {
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
        </div >
    )
}
const style = {
    wrapper: `card border`,
    image: `rounded-t-lg w-full transition transform hover:scale-110 duration-700 ease-in-out`,
    content: ``,
    title: `my-1 font-semibold`,
    description: ``,
    author: `text-sm mb-2 text-gray-700 font-semibold`,
    buy: `flex items-center flex-wrap border-t pt-2`,
    action: `flex items-center border p-2 m-1 rounded bg-white hover:bg-gray-100 font-thin text-sm`
};