import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.flex}>
        <div className='text-center flex justify-items-end w-full'>
          <Link className={style.h_underline + " mr-5"} to="/">Home</Link>
          <Link className={style.h_underline + " mr-5"} to="/about">About Us</Link>
          {/* <Link className={style.h_underline + " mr-5"} to="/terms-of-use" >Terms of Use</Link> */}
          <a href="https://developer.nytimes.com/apis" target={"_blank"} rel="noreferrer" className={style.h_underline}>
            <img src='https://developer.nytimes.com/files/poweredby_nytimes_150c.png?v=1583354208341'
              alt="NYT APIs" />
          </a>
        </div>
        <div className='w-96 text-right'>
          <a className={style.h_underline} href="https://ravindrasinghshah.com" target={"_blank"} rel="noreferrer">Created by Ravindra Singh Shah</a>
        </div>
      </div>
    </div>
  )
}

export default Footer

const style = {
  wrapper: ` px-20 py-5 border-t bg-black text-white`,
  flex: `flex flex-row justify-evenly`,
  h_underline: `hover:underline`
}