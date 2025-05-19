import { useEffect, useState } from "react";
import AnimeInfo from "../AnimeInfo";
import Loader from "../other/Loader";
import Error from "../other/Error";

export default function InfoContainer({
  activeId,
  myList,
  onMyList,
  listEl,
  infoEl,
  onClick,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [animeInfo, setAnimeInfo] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!activeId) return;
    document.title = "Loading";
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://api.jikan.moe/v4/anime/${activeId}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Unable to fetch Data :(");
        const data = await res.json();
        setAnimeInfo(data.data);
        const title =
          data.data.title_english ||
          data.data.title ||
          data.data.title_japanese;

        document.title = title;
        setError("");
        setIsLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      document.title = "My Anime List";
      controller.abort();
    };
  }, [activeId]);

  return (
    <div className="box" ref={infoEl}>
      <div className="box-headers">
        <p>{activeId ? "Found" : "No"} Result</p>
      </div>
      {activeId ? (
        isLoading ? (
          <Loader />
        ) : error ? (
          <Error error={error} />
        ) : (
          <AnimeInfo
            animeInfo={animeInfo}
            key={animeInfo.mal_id}
            isLoading={isLoading}
            myList={myList}
            onMyList={onMyList}
            listEl={listEl}
            onClick={onClick}
          />
        )
      ) : null}
    </div>
  );
}
