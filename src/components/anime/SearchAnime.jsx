export default function SearchAnime({ anime, onSetActive, onViewInfo }) {
  const title = anime.title_english || anime.title || anime.title_japanese;

  function handleClick() {
    onViewInfo();
    onSetActive(anime.mal_id);
  }

  return (
    <li>
      <img src={anime.images.jpg.image_url} alt={anime.score} />
      <div className="information">
        <h3 onClick={handleClick}>{title}</h3>
        <p>
          Score :{" "}
          <span style={{ color: "yellow" }}>{anime.score || "N/A"}</span>
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
    </li>
  );
}
