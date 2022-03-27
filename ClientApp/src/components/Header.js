import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className={style.wrapper}>
      <span>
        <Link to="/">NYT Best Sellers</Link>
      </span>
    </div>
  )
}

const style = {
  wrapper: `h-20 w-full text-primaryBlack flex justify-center md:justify-start items-center px-5 md:px-10 text-2xl py-3 border-b`,
  logo: `text-white h-16 mr-2`
};