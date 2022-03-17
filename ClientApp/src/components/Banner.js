import banner from '../svg/banner-2.svg';
import Search from './Search';

export default function Banner() {
  return (
    <div className={style.wrapper}>
      <div className={style.searchWrapper}>
      <Search />
      </div>
      <div className={style.contentWrapper}>
        <img src={banner} alt="banner" className={style.contentImage} />
      </div>
    </div>
  )
}

const style = {
  wrapper: `h-96 w-screen mt-10 flex flex-row justify-around`,
  searchWrapper: `h-full flex-1 flex justify-center`,
  contentWrapper: `h-full flex-1 flex justify-center`,
  contentImage: `h-full float-right`
};