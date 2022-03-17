import { Link } from 'react-router-dom'
import { GiArchiveResearch } from 'react-icons/gi';

export default function NotFound() {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <GiArchiveResearch className='mr-5' />
        <span> Oops! Page not found. Try searching from <Link to="/" className='underline'>home page</Link>.</span>
      </div>
    </div>
  )
}

const style = {
  wrapper: `h-screen w-screen font-light`,
  content: `flex flex-row justify-center items-center text-3xl p-20`
}