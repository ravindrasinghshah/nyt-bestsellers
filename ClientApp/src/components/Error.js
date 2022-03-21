import { FaRegSadCry } from 'react-icons/fa';
import { Link } from "react-router-dom";

export default function Error() {
    return (
        <div className={style.wrapper}>
            <FaRegSadCry className='mr-2' /> Oops! Something went wrong. Try searching from <Link to="/" className='underline pl-1'> home page</Link>.
        </div>
    )
}

const style = {
    wrapper: `flex flex-row justify-center items-center text-2xl p-10 h-52`
}
