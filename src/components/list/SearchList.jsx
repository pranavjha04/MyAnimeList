import SearchAnime from "../anime/SearchAnime";

export default function SearchList({ list, show, onSetActive, onViewInfo }) {
  const sortedList = Array.from(
    new Map(list.map((anime) => [anime.mal_id, anime])).values()
  ).sort((a, b) => a.popularity - b.popularity);

  return (
    <ul className={`list list-anime ${!show && "hidden"}`}>
      {sortedList.map((anime) => (
        <SearchAnime
          anime={anime}
          onSetActive={onSetActive}
          onViewInfo={onViewInfo}
          key={anime.mal_id}
        />
      ))}
    </ul>
  );
}
