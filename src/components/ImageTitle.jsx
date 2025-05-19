export default function ImageTitle({ animeInfo }) {
  const title =
    animeInfo.title_english || animeInfo.title || animeInfo.title_japanese;
  return (
    <div className="img-title">
      <img src={animeInfo.images.jpg.image_url} alt={title} />
      <h2>{title}</h2>
    </div>
  );
}
