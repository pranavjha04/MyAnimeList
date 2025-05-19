export default function Character({ animeInfo }) {
  return (
    <li>
      <img
        src={animeInfo.character.images.jpg.image_url}
        alt={animeInfo.character.name}
      />
      <div>
        <h4>{animeInfo.character.name}</h4>
        <p>{animeInfo.role}</p>
      </div>
    </li>
  );
}
