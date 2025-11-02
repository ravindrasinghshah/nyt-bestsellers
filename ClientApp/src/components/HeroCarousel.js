/**
 * HeroCarousel component that displays the top 5 books by current date
 * Books are moving from left to right, onhover the book card should stop.
 * On click of the book card, the user should be redirected to the book page.
 */
import Loading from "./Loading";
import { useBooks } from "../context/BooksContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function HeroCarousel() {
  const [selected, setSelected] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  const { data, isLoading, error } = useBooks();
  console.log("data", data);

  // Get published date from the results
  const publishedDate = data?.data?.results?.published_date;

  //== parse the data to get the top 5 books for each list
  const topBooksByList = data?.data?.results?.lists?.flatMap((list) => {
    //== list has books array, we need to get the top 2 book from every list and return it as an array
    return list?.books?.slice(0, 2).map((book) => {
      return {
        title: book.title,
        author: book.author,
        image: book.book_image,
        link: book.book_uri,
        book: book, // Store full book object
        listName: list.list_name,
        listNameEncoded: list.list_name_encoded,
        publishedDate: publishedDate,
      };
    });
  });
  console.log("topBooksByList", topBooksByList);
  // Autoplay: advance every 3 seconds, pause on hover
  useEffect(() => {
    if (!topBooksByList?.length || isPaused) return;
    const interval = setInterval(() => {
      setSelected((prev) =>
        prev === topBooksByList.length - 1 ? 0 : prev + 1
      );
    }, 3000); // 3 seconds

    return () => clearInterval(interval); // cleanup
  }, [topBooksByList?.length, isPaused]); // re-run on data change or pause state

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">
          Error loading books data. Please try again later.
        </p>
      </div>
    );
  }
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>
        The New York Times Current Week's Best Sellers Top Books
      </h1>
      <div className={style.carousel}>
        <div
          className="relative h-[400px] flex items-center justify-center overflow-hidden w-full max-w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-center justify-center w-full h-full relative">
            {topBooksByList.map((book, idx) => {
              // Calculate relative position to selected (circular array)
              const total = topBooksByList.length;
              let relativePos = idx - selected;

              // Normalize to -total/2 to total/2 range
              if (relativePos > total / 2) relativePos -= total;
              if (relativePos < -total / 2) relativePos += total;

              let classes =
                "transition-all duration-500 absolute rounded-lg shadow-lg -translate-y-1/2";
              let widthClass = "";
              let heightClass = "";

              if (relativePos === 0) {
                // Active book - center
                classes +=
                  " left-1/2 -translate-x-1/2 z-30 opacity-100 hover:scale-110";
                widthClass = "w-[260px] md:w-[300px]";
                heightClass = "h-[340px] md:h-[360px]";
              } else if (Math.abs(relativePos) === 1) {
                // Adjacent books
                if (relativePos < 0) {
                  classes +=
                    " left-[38%] md:left-[40%] -translate-x-1/2 z-25 opacity-85";
                } else {
                  classes +=
                    " left-[62%] md:left-[60%] -translate-x-1/2 z-25 opacity-85";
                }
                widthClass = "w-[160px] md:w-[200px]";
                heightClass = "h-[210px] md:h-[260px]";
              } else if (Math.abs(relativePos) === 2) {
                // Second tier books
                if (relativePos < 0) {
                  classes +=
                    " left-[30%] md:left-[32%] -translate-x-1/2 z-20 opacity-70";
                } else {
                  classes +=
                    " left-[70%] md:left-[68%] -translate-x-1/2 z-20 opacity-70";
                }
                widthClass = "w-[130px] md:w-[160px]";
                heightClass = "h-[170px] md:h-[210px]";
              } else if (Math.abs(relativePos) === 3) {
                // Third tier books
                if (relativePos < 0) {
                  classes +=
                    " left-[22%] md:left-[24%] -translate-x-1/2 z-15 opacity-55";
                } else {
                  classes +=
                    " left-[78%] md:left-[76%] -translate-x-1/2 z-15 opacity-55";
                }
                widthClass = "w-[110px] md:w-[130px]";
                heightClass = "h-[145px] md:h-[175px]";
              } else if (Math.abs(relativePos) === 4) {
                // Fourth tier books
                if (relativePos < 0) {
                  classes +=
                    " left-[14%] md:left-[16%] -translate-x-1/2 z-10 opacity-40";
                } else {
                  classes +=
                    " left-[86%] md:left-[84%] -translate-x-1/2 z-10 opacity-40";
                }
                widthClass = "w-[90px] md:w-[110px]";
                heightClass = "h-[120px] md:h-[150px]";
              } else if (Math.abs(relativePos) === 5) {
                // Fifth tier books
                if (relativePos < 0) {
                  classes +=
                    " left-[6%] md:left-[8%] -translate-x-1/2 z-5 opacity-25";
                } else {
                  classes +=
                    " left-[94%] md:left-[92%] -translate-x-1/2 z-5 opacity-25";
                }
                widthClass = "w-[75px] md:w-[90px]";
                heightClass = "h-[100px] md:h-[125px]";
              } else if (Math.abs(relativePos) === 6) {
                // Sixth tier books
                if (relativePos < 0) {
                  classes +=
                    " left-[2%] md:left-[3%] -translate-x-1/2 z-0 opacity-15";
                } else {
                  classes +=
                    " left-[98%] md:left-[97%] -translate-x-1/2 z-0 opacity-15";
                }
                widthClass = "w-[60px] md:w-[75px]";
                heightClass = "h-[80px] md:h-[100px]";
              } else {
                // Too far - hide
                classes += " opacity-0";
                widthClass = "w-[50px] md:w-[60px]";
                heightClass = "h-[65px] md:h-[80px]";
              }

              const searchQuery = `?d=${book.publishedDate}&n=${
                book.listNameEncoded
              }&t=${encodeURIComponent(book.title)}`;

              return (
                <Link
                  key={idx}
                  to={`/book${searchQuery}`}
                  state={{ book: book.book, name: book.listName }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className={`${classes} ${widthClass} ${heightClass} object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                      relativePos === 0 ? "" : "hover:opacity-90"
                    }`}
                    style={{ top: "50%" }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
        {/* Dot indicators - positioned below carousel */}
        <div className="flex justify-center items-center mt-6 relative z-40">
          <div className="flex gap-2 items-center">
            {topBooksByList &&
              topBooksByList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelected(idx)}
                  type="button"
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === selected
                      ? "w-3 h-3 bg-blue-600"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to book ${idx + 1}`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const style = {
  wrapper: `w-full max-w-full font-light pb-5 px-5 md:px-10`,
  title: `text-3xl pb-5 text-center`,
  carousel: `flex flex-col w-full`,
  carouselItem: `flex flex-col items-center justify-center w-full`,
  carouselContainer: `flex flex-row overflow-x-auto animate-slide-left duration-1000`,
};
