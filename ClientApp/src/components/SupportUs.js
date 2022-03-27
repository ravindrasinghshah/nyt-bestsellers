import { BsInfoSquare } from 'react-icons/bs';

export default function SupportUs() {
  return (
    <div className={style.wrapper}>
      <BsInfoSquare className="mr-2" />
      <span>
        When you purchase book through buy link in site, we <b>"do not"</b> earn an affiliate commission. Support us by buying a coffee.
      </span>
    </div>
  )
}

const style = {
  wrapper: `flex flex-row items-center font-thin text-sm pt-10`
}