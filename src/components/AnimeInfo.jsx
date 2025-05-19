import { useState } from "react";
import StarRating from "./other/StarRating";
import AdditionalInformation from "./anime/AdditionalInformation";
import Synopsis from "./other/Synopsis";
import ImageTitle from "./ImageTitle";
import CharactersList from "./list/CharacterList";
import AssentialInformation from "./anime/AssentialInformation";

export default function AnimeInfo({
  animeInfo,

  myList,
  onMyList,
  listEl,
  onClick,
}) {
  const userListRating = myList.find(
    (anime) => anime.mal_id === animeInfo.mal_id
  )?.userRating;
  const isWatched = myList.find((anime) => anime.mal_id === animeInfo.mal_id);
  const [rating, setRating] = useState(0);

  function handleAdd() {
    onMyList((myList) => [...myList, { ...animeInfo, userRating: rating }]);
  }
  function handleViewMyList() {
    onClick();
    listEl.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="list">
      {Object.keys(animeInfo).length === 0 ? null : (
        <>
          <ImageTitle animeInfo={animeInfo} />
          <AdditionalInformation animeInfo={animeInfo} />
          <Synopsis animeInfo={animeInfo} />
          <div className="rating">
            {userListRating ? (
              <p>You gave a score of {userListRating.toFixed(1)}</p>
            ) : (
              <StarRating size={25} onSetRating={setRating} />
            )}
          </div>
          {!isWatched ? (
            rating > 0 && (
              <div className="buttons">
                <button className="add-to-button" onClick={handleAdd}>
                  Add to My List
                </button>
              </div>
            )
          ) : (
            <div className="buttons">
              <button className="add-to-button" onClick={handleViewMyList}>
                View My List
              </button>
            </div>
          )}

          <CharactersList activeId={animeInfo.mal_id} />
          <AssentialInformation animeInfo={animeInfo} />
        </>
      )}
    </div>
  );
}
