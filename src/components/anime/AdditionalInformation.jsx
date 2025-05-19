export default function AdditionalInformation({ animeInfo }) {
  return (
    <div className="add-info">
      <p>
        Type : <span>{animeInfo.type || "N/A"}</span>
      </p>
      <p>
        Popularity : <span>{animeInfo.popularity || "N/A"}</span>
      </p>
      <p>
        Rank : <span>{animeInfo.rank || "N/A"}</span>
      </p>
      <p>
        Episodes : <span>{animeInfo.episodes || "N/A"}</span>
      </p>
      <p>
        Status : <span>{animeInfo.status}</span>
      </p>
    </div>
  );
}
