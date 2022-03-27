import banner from '../svg/banner-2.svg';

export default function Banner() {
  return (
    <div className={style.wrapper}>
      <div className={style.searchWrapper}>
        {/* <Search /> */}
        <div>
          <p>Todo: Maybe show books  by datepicker</p>
          <p>Todo: Maybe search book by title in history. do not show book with empty ranks_history object.
          </p>
        </div>

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