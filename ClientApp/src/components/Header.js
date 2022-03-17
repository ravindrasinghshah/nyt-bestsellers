import logo from '../svg/logo.svg';

export default function Header() {
  return (
    <div className={style.wrapper}>
      <img src={logo} className={style.logo} alt="logo" />  <span>Best Seller Books</span>
    </div>
  )
}
const style = {
  wrapper: `h-20 w-full bg-black text-white flex justify-center items-center px-60 text-4xl font-thin`,
  logo : `text-white h-16 mr-2`
};