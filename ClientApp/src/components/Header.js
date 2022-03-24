import logo from '../svg/logo.svg';

function OldHeader() {
  return (
    <div className={style.wrapper}>
      <img src={logo} className={style.logo} alt="logo" />  <span>Best Seller Books</span>
    </div>
  )
}

export default function Header() {
  return (
    <div className={style.wrapper}>
      <span>NYT Best Sellers</span>
    </div>
  )
}

const style = {
  wrapper: `h-20 w-full text-primaryBlack flex justify-center md:justify-start items-center px-5 md:px-10 text-2xl py-3 border-b`,
  logo: `text-white h-16 mr-2`
};