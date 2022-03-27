import { FiExternalLink } from 'react-icons/fi';

export default function BuyBook({book}) {
    return (
        <div className={style.wrapper}>
            <p className="pb-2">Buy Book</p>
            <div className={style.buyBox}>
                {book.buy_links.map((buy, index) => {
                    return (<a href={buy.url} name={buy.name}
                        key={index}
                        target="_blank"
                        className={style.action}>
                        <span><FiExternalLink /></span>
                        <span className='ml-2'>{buy.name}</span>
                    </a>)
                })}
            </div>
        </div>
    )
}
const style = {
    wrapper: `flex flex-col border-t mt-12 pt-8 text-xl font-semibold`,
    buyBox: `flex items-center flex-wrap pt-2`,
    action: `flex flex-row items-center border p-2 mr-2 mt-1 rounded bg-white hover:bg-gray-100 font-thin text-sm`
}