import { useState, useEffect } from "react";
import Character from "../Character";
import Loader from "../other/Loader";
import Error from "../other/Error";

export default function CharactersList({ activeId }) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!activeId) return;
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.jikan.moe/v4/anime/${activeId}/characters`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) throw new Error("Unable to fetch Data :(");
        const data = await res.json();
        setIsLoading(false);
        setError(data.data.length === 0 ? "N/A" : "");
        setList(data.data);
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
  }, [activeId]);

  return (
    <>
      <h3 className="sub-heading">Characters</h3>
      <ul className="list-char">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <li>
            <Error error={error} />
          </li>
        ) : (
          list.map((anime) => (
            <Character animeInfo={anime} key={anime.character.mal_id} />
          ))
        )}
      </ul>
    </>
  );
}
