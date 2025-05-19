import WatchedAnime from "../anime/WatchedAnime";

export default function WatchedList({
  myList,
  show,
  onRemove,

  onSetActive,
  onViewInfo,
}) {
  return (
    <ul className={`list watch-anime ${!show && "hidden"}`}>
      {myList.map((anime) => (
        <WatchedAnime
          anime={anime}
          onRemove={onRemove}
          onSetActive={onSetActive}
          onViewInfo={onViewInfo}
          key={anime.mal_id}
        />
      ))}
    </ul>
  );
}
