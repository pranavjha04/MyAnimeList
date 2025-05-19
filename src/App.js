import { useState, useEffect, useRef } from "react";
import NavBar from "./components/navbar/NavBar";
import ListContainer from "./components/container/ListContainer";
import InfoContainer from "./components/container/InfoContainer";
import Error from "./components/other/Error";
import { useLocalStroageState } from "./hooks/useLocalStorage";
import { useKey } from "./hooks/useKey";

export default function App() {
  const [myList, setMyList] = useLocalStroageState([], "myList");
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWatched, setIsWatched] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const listEl = useRef(null);
  const infoEl = useRef(null);

  function handleClick() {
    setIsWatched(true);
    setQuery("");
    if (window.innerWidth > 880) return;
    listEl.current.scrollIntoView({ behavior: "smooth" });
  }
  function handleSeeWatch() {
    setIsWatched(true);
  }

  function handleRemove(id) {
    if (activeId === id) {
      handleMovieClose();
    }
    setMyList((watchList) => watchList.filter((anime) => anime.mal_id !== id));
  }
  function handleMovieClose() {
    setActiveId(null);
  }

  function handleActive(id) {
    if (activeId === id) return;
    setActiveId(id);
  }
  useKey("Escape", handleMovieClose);
  useEffect(() => {
    if (query.length < 3) return;
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Unable to fetch Data :(");
        const data = await res.json();
        setIsLoading(false);
        setError(data.data.length === 0 ? "Couldn't Find Any Result ;(" : "");
        setList(data.data);
        setIsWatched(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query, setList]);

  return (
    <>
      <NavBar
        query={query}
        setQuery={setQuery}
        isLoading={isLoading}
        onClick={handleClick}
      />
      <main>
        <ListContainer
          list={list}
          myList={myList}
          isWatched={isWatched}
          onRemove={handleRemove}
          isLoading={isLoading}
          error={error}
          onSetActive={handleActive}
          listEl={listEl}
          infoEl={infoEl}
        />
        <InfoContainer
          activeId={activeId}
          myList={myList}
          onMyList={setMyList}
          onClick={handleSeeWatch}
          listEl={listEl}
          infoEl={infoEl}
        />
      </main>
    </>
  );
}
