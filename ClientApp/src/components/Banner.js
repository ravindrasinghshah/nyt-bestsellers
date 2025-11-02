import HeroCarousel from './HeroCarousel';

export default function Banner() {
  return (
    <div className={style.wrapper}>
      <HeroCarousel />
    </div>
  )
}

const style = {
  // increase height for small screens only
  wrapper: `h-100 w-full max-w-full mt-5 flex flex-row justify-around`, 
  searchWrapper: `h-full flex-1 flex justify-center`,
  contentWrapper: `h-full flex-1 flex justify-center`,
  contentImage: `h-full float-right`
};