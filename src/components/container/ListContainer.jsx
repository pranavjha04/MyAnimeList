import { useState } from "react";
import SearchList from "../list/SearchList";
import WatchedList from "../list/WatchedList";
import Error from "../other/Error";
import Loader from "../other/Loader";
export default function ListContainer({
  list,
  isWatched,
  onRemove,
  isLoading,
  error,
  onSetActive,
  myList,
  listEl,
  infoEl,
}) {
  const [show, setShow] = useState(true);

  function handleViewInfo() {
    if (window.innerWidth > 880) return;
    infoEl.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className="box" ref={listEl}>
      <div className="box-headers">
        <p>
          {isWatched
            ? `${
                myList.length === 0
                  ? "Your list is empty"
                  : `You have ${myList.length} on your list`
              }`
            : `Found ${list.length} Results`}
        </p>
        <button
          disabled={isLoading || (myList.length === 0 && list.length === 0)}
          onClick={() => setShow(!show)}
        >
          {show ? "Hide Results" : "Show Results"}
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : !isWatched ? (
        <SearchList
          list={list}
          show={show}
          onSetActive={onSetActive}
          onViewInfo={handleViewInfo}
        />
      ) : (
        <WatchedList
          myList={myList}
          show={show}
          onRemove={onRemove}
          onSetActive={onSetActive}
          onViewInfo={handleViewInfo}
        />
      )}
    </div>
  );
}
