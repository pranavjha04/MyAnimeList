export default function AssentialInformation({ animeInfo }) {
  const genre = animeInfo.genres.map((genre) => genre.name).join(", ");
  const studio = animeInfo.studios.map((studio) => studio.name).join(", ");

  return (
    <>
      <h3 className="sub-heading">Other Information</h3>
      <div className="add-info">
        <p>
          Genre : <span>{genre || "N/A"}</span>
        </p>
        <p>
          Studios : <span>{studio || "N/A"}</span>
        </p>
        <p>
          Aired : <span>{animeInfo.aired.string || "N/A"}</span>
        </p>
        <p>
          Duration : <span>{animeInfo.duration || "N/A"}</span>
        </p>
      </div>
    </>
  );
}
