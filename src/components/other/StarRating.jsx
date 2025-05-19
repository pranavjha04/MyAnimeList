import { useState } from "react";

function StarRating({
  maxStars = 10,
  defaultValue = 0,
  size = 30,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultValue);
  const [hoveredRating, setHoveredRating] = useState(0);

  const starColor = "#fcc419";
  const starBorderColor = "#e9e9e9";

  const handleSetRating = (value) => {
    setRating(value);
    if (onSetRating) {
      onSetRating(value);
    }
  };

  return (
    <div className="star-rating-wrapper">
      <div
        className="star-container"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          justifyContent: "center",
          flexWrap: "nowrap",
        }}
        onMouseLeave={() => setHoveredRating(0)}
      >
        {[...Array(maxStars)].map((_, index) => {
          const starValue = index + 1;
          const isFilled =
            hoveredRating >= starValue ||
            (!hoveredRating && rating >= starValue);

          return (
            <div
              key={index}
              className="star"
              style={{
                cursor: "pointer",
                transition: "transform 0.2s",
                transform:
                  hoveredRating === starValue ? "scale(1.2)" : "scale(1)",
              }}
              onClick={() => handleSetRating(starValue)}
              onMouseEnter={() => setHoveredRating(starValue)}
            >
              {isFilled ? (
                <svg
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  fill={starColor}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke={starColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke={starBorderColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {(rating >= 0 || hoveredRating >= 0) && (
        <div
          className="rating-display"
          style={{
            marginTop: "8px",
            fontWeight: "600",
            textAlign: "center",
            color: starColor,
            fontSize: "2.2rem",
          }}
        >
          {hoveredRating || rating || "Not rated yet"}
        </div>
      )}
    </div>
  );
}

export default StarRating;
