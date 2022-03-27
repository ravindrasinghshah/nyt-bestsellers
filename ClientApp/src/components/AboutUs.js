
export default function AboutUs() {
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>About this website</h1>
      <div className="flex flex-col justify-center leading-9">
        <p>o This project is built for non-commercial usage. Purpose of this project is academic and educational for individual or groups.</p>
        <p>o This project also targets to implement latest technology for evaluation and practices purpose.</p>
        <p>o This project is using <a href="https://developer.nytimes.com" target={"_blank"}><b>"Data provided by The New York Times"</b></a>.</p>
        <p>o The New York Times <b>does not</b> promotes or endorses this project or any third party or the causes, ideas, Web sites, products or services of project or any third party. </p>
        <p>o If you have any concern or questions regarding usage of "The New York Times APIs" usage in project then reach out and notify by clicking on 'Created by' link in footer. </p>
      </div>
    </div >
  )
}

const style = {
  wrapper: `px-20 pb-20 `,
  title: `text-3xl py-10 text-center`,
}