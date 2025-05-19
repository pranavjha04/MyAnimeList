export default function WatchedAnime({
  anime,
  onRemove,
  onSetActive,
  onViewInfo,
}) {
  const title = anime.title_english || anime.title || anime.title_japanese;
  function handleClick() {
    onRemove(anime.mal_id);
  }
  function handleViewInfo() {
    onSetActive(anime.mal_id);
    onViewInfo();
  }
  return (
    <li>
      <div>
        <img src={anime.images.jpg.image_url} alt={anime.score} />
        <div className="information">
          <h3 onClick={handleViewInfo}>{title}</h3>
          <p>
            Your Score :{" "}
            <span style={{ color: "yellow" }}>
              {anime.userRating.toFixed(1) || "N/A"}
            </span>
          </p>
          <p>
            Popularity :{" "}
            <span style={{ color: "orange" }}>{anime.popularity || "N/A"}</span>
          </p>
          <p>
            Episodes :{" "}
            <span style={{ color: "violet" }}>{anime.episodes || "N/A"}</span>
          </p>
        </div>
      </div>
      <button onClick={handleClick}>Remove</button>
    </li>
  );
}
