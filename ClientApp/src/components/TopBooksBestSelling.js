import { useBooks } from "../context/BooksContext";
import Card from "./Card";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function TopBooksBestSelling() {
  const { data, isLoading, error } = useBooks();
  return (
    <div className={style.wrapper}>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-500">
            Error loading books data. Please try again later.
          </p>
        </div>
      ) : (
        <div className="w-full h-full overflow-y-auto">
          {data &&
            data.data &&
            data.data.results &&
            data.data.results.lists && (
              <>
                {data.data.results.lists.map((item, index) => {
                  return (
                    <div
                      className="reveal"
                      key={index}
                      id={"item_" + item.list_id}
                    >
                      <div className={style.categoryHeader}>
                        <div className={style.categoryTitle}>
                          Best sellers of {item.display_name}
                        </div>
                        <div className="underline text-sm">
                          <Link
                            to={`/best-sellers/${item.list_name_encoded}`}
                            target="_blank"
                          >
                            Show all
                          </Link>
                        </div>
                      </div>
                      <div className={style.cardRow}>
                        {item.books?.length > 0
                          ? item.books.slice(0, 8).map((book, index) => {
                              return (
                                <Card
                                  key={index}
                                  book={book}
                                  nameEncoded={item.list_name_encoded}
                                  name={item.list_name}
                                  publishedDate={
                                    data.data.results.published_date
                                  }
                                />
                              );
                            })
                          : null}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
        </div>
      )}
    </div>
  );
}

const style = {
  wrapper: `px-5 md:px-10 w-full`,
  title: `text-3xl py-10 text-center`,
  categoryHeader: `flex flex-col md:flex-row justify-between items-center border-t`,
  categoryTitle: `font-bold text-3xl pb-2 pt-10`,
  cardRow: `flex flex-col md:flex-row flex-wrap justify-between mt-10 w-full`,
};
