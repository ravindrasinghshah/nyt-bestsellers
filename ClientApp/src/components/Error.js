import { FaRegSadCry } from 'react-icons/fa';

export default function Error() {
    return (
        <div className={style.wrapper}>
            <FaRegSadCry className='mr-2' /> Oops! Something went wrong. Please try again later.
        </div>
    )
}

const style = {
    wrapper: `flex flex-row justify-center items-center text-2xl p-10`
}
