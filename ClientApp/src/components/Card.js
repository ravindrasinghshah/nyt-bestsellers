import { Link } from 'react-router-dom';

export default function Card(prop) {
    // console.log(prop.book)
    var searchQuery = `?d=${prop.publishedDate}&n=${prop.nameEncoded}&t=${prop.book.title}`
    return (
        <div className={style.wrapper}>
            <Link
                to={`/book${searchQuery}`}
                state={{ book: prop.book, name: prop.name }}>
                <div className="relative overflow-hidden">
                    <img src={prop.book.book_image} alt="book_image" className={style.image + " object-fill"} />
                </div>
                {/* <div className={style.buy}>
                    <p>view more</p>
                </div> */}
            </Link>
        </div>
    )
}
const style = {
    wrapper: `card border`,
    image: `rounded-lg w-full transition transform hover:scale-110 duration-700 ease-in-out`,
    content: ``,
    title: `my-1 font-semibold`,
    description: ``,
    author: `text-sm mb-2 text-gray-700 font-semibold`,
    buy: `flex justify-end border-t pb-2 pr-2`,
    action: `flex items-center border p-2 m-1 rounded bg-white hover:bg-gray-100 font-thin text-sm`
};